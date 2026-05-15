import { prisma } from "@/lib/prisma";
import { NewsClient, NewsArticle } from "./client";
import slugify from "slugify";

export class NewsService {
  private client: NewsClient;

  constructor() {
    this.client = new NewsClient();
  }

  async syncNews() {
    console.log("Starting News sync for Abuja...");
    const articles = await this.client.getAbujaNews();
    
    let importedCount = 0;
    let skippedCount = 0;

    for (const article of articles) {
      try {
        // Create a unique slug based on title and source
        const baseSlug = slugify(article.title, { lower: true, strict: true });
        const slug = `${baseSlug}-${article.source.name.toLowerCase().replace(/\s+/g, '-')}`;

        // Check if news already exists
        const existing = await prisma.news.findUnique({
          where: { slug }
        });

        if (existing) {
          skippedCount++;
          continue;
        }

        // Map category based on title/description keywords
        const category = this.determineCategory(article);

        await prisma.news.create({
          data: {
            title: article.title,
            slug,
            excerpt: article.description,
            content: article.content || article.description,
            featuredImage: article.urlToImage,
            category,
            publishedAt: new Date(article.publishedAt),
            isBreaking: article.title.toLowerCase().includes("breaking")
          }
        });

        importedCount++;
      } catch (error) {
        console.error(`Failed to import news article: ${article.title}`, error);
        skippedCount++;
      }
    }

    return {
      total: articles.length,
      imported: importedCount,
      skipped: skippedCount
    };
  }

  private determineCategory(article: NewsArticle): string {
    const text = (article.title + " " + article.description).toLowerCase();
    
    if (text.includes("food") || text.includes("restaurant") || text.includes("dining")) return "Food";
    if (text.includes("art") || text.includes("culture") || text.includes("festival")) return "Culture";
    if (text.includes("business") || text.includes("economy") || text.includes("naira")) return "Business";
    if (text.includes("fashion") || text.includes("style") || text.includes("design")) return "Style";
    if (text.includes("music") || text.includes("concert") || text.includes("show")) return "Music";
    
    return "Culture"; // Default category
  }
}
