import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Areas
  const maitama = await prisma.area.upsert({
    where: { slug: "maitama" },
    update: {},
    create: { name: "Maitama", slug: "maitama", description: "Luxury & Diplomacy" },
  });

  const wuse2 = await prisma.area.upsert({
    where: { slug: "wuse-2" },
    update: {},
    create: { name: "Wuse 2", slug: "wuse-2", description: "Food & Nightlife" },
  });

  const gwarinpa = await prisma.area.upsert({
    where: { slug: "gwarinpa" },
    update: {},
    create: { name: "Gwarinpa", slug: "gwarinpa", description: "Community & Cafés" },
  });

  // 2. Create Categories
  const restaurant = await prisma.placeCategory.upsert({
    where: { slug: "restaurants" },
    update: {},
    create: { name: "Restaurants", slug: "restaurants" },
  });

  const lounge = await prisma.placeCategory.upsert({
    where: { slug: "lounges" },
    update: {},
    create: { name: "Lounges", slug: "lounges" },
  });

  const cafe = await prisma.placeCategory.upsert({
    where: { slug: "cafes" },
    update: {},
    create: { name: "Cafés", slug: "cafes" },
  });

  // 3. Create Places
  await prisma.place.upsert({
    where: { slug: "sky-lounge-abuja" },
    update: {},
    create: {
      name: "Sky Lounge Abuja",
      slug: "sky-lounge-abuja",
      description: "Premier rooftop lounge with panoramic views of the city.",
      address: "Maitama",
      rating: 4.9,
      hotScore: 0.95,
      isFeatured: true,
      areaId: maitama.id,
      categoryId: lounge.id,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800", isFeatured: true }
        ]
      }
    },
  });

  await prisma.place.upsert({
    where: { slug: "the-crib-restaurant" },
    update: {},
    create: {
      name: "The Crib Restaurant",
      slug: "the-crib-restaurant",
      description: "Modern fusion dining in the heart of Wuse 2.",
      address: "Wuse 2",
      rating: 4.7,
      hotScore: 0.85,
      isFeatured: true,
      areaId: wuse2.id,
      categoryId: restaurant.id,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800", isFeatured: true }
        ]
      }
    },
  });

  await prisma.place.upsert({
    where: { slug: "bantu-coffee" },
    update: {},
    create: {
      name: "Bantu Coffee",
      slug: "bantu-coffee",
      description: "Craft coffee and artisanal pastries.",
      address: "Gwarinpa",
      rating: 4.8,
      hotScore: 0.9,
      isFeatured: false,
      areaId: gwarinpa.id,
      categoryId: cafe.id,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800", isFeatured: true }
        ]
      }
    },
  });

  // 4. Create News
  await prisma.news.upsert({
    where: { slug: "bantu-coffee-expansion" },
    update: {},
    create: {
      title: "Bantu Coffee opens 5th location in Gwarinpa",
      slug: "bantu-coffee-expansion",
      excerpt: "The beloved café brand continues its rapid expansion across the FCT.",
      content: "Bantu Coffee has officially opened its doors in Gwarinpa, marking its fifth location in the city...",
      category: "Food",
      featuredImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
    },
  });

  // 5. Create Events
  const eventCat = await prisma.eventCategory.upsert({
    where: { slug: "concerts" },
    update: {},
    create: { name: "Concerts", slug: "concerts" },
  });

  await prisma.event.upsert({
    where: { slug: "capital-block-party" },
    update: {},
    create: {
      title: "Capital Block Party 2025",
      slug: "capital-block-party",
      description: "The biggest block party in Abuja returns to Jabi Lake Park.",
      startDate: new Date("2025-06-14T16:00:00Z"),
      venue: "Jabi Lake Park",
      price: "₦5,000",
      isFeatured: true,
      categoryId: eventCat.id,
      media: {
        create: [
          { url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800", type: "IMAGE" }
        ]
      }
    },
  });

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
