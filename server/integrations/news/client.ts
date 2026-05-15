export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  source: {
    name: string;
  };
}

export class NewsClient {
  private apiKey: string;
  private baseUrl = "https://newsapi.org/v2";

  constructor() {
    this.apiKey = process.env.NEWS_API_KEY || "";
  }

  async getAbujaNews(): Promise<NewsArticle[]> {
    if (!this.apiKey) {
      console.warn("NEWS_API_KEY is not set. Using mock data for demonstration.");
      return this.getMockNews();
    }

    try {
      // We search for "Abuja" specifically to keep it strictly local
      const params = new URLSearchParams({
        q: "Abuja",
        language: "en",
        sortBy: "publishedAt",
        pageSize: "10",
        apiKey: this.apiKey
      });

      const response = await fetch(`${this.baseUrl}/everything?${params.toString()}`, {
        headers: {
          'User-Agent': 'FCTEA-City-Guide/1.0'
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch news");
      }

      const data = await response.json();
      return data.articles;
    } catch (error) {
      console.error("NewsClient error:", error);
      throw error;
    }
  }

  private getMockNews(): NewsArticle[] {
    return [
      {
        title: "New Cultural Hub to Open in Central Area Abuja",
        description: "A new multi-million naira arts and culture centre is set to be commissioned next month in Abuja's Central Business District.",
        url: "https://example.com/news/1",
        urlToImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800",
        publishedAt: new Date().toISOString(),
        content: "The facility will include an art gallery, theatre, and workshops for local artists...",
        source: { name: "Abuja Digest" }
      },
      {
        title: "Abuja Metro Rail Resumes Full Operations",
        description: "The FCT Administration has announced the full resumption of the Abuja Light Rail services following infrastructure upgrades.",
        url: "https://example.com/news/2",
        urlToImage: "https://images.unsplash.com/photo-1474487056217-76feefee0f81?auto=format&fit=crop&q=80&w=800",
        publishedAt: new Date().toISOString(),
        content: "Commuters can now enjoy regular services between the Metro Station and Idu...",
        source: { name: "City News" }
      }
    ];
  }
}
