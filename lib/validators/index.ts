import { z } from "zod";

export const BrandSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  website: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  tiktok: z.string().optional(),
  verified: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export const PlaceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  address: z.string().optional(),
  images: z.array(z.string()).optional(),
  coordinates: z.any().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  openingHours: z.any().optional(),
  priceLevel: z.number().min(1).max(4).optional(),
  rating: z.number().optional(),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  brandId: z.string().optional(),
  categoryId: z.string().optional(),
  areaId: z.string().optional(),
});

export const EventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  startDate: z.string().min(1, "Invalid start date"),
  endDate: z.string().optional(),
  venue: z.string().optional(),
  ticketUrl: z.string().optional(),
  organizer: z.string().optional(),
  price: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  isFeatured: z.boolean().optional(),
  categoryId: z.string().optional(),
  brandId: z.string().optional(),
  placeId: z.string().optional(),
});

export const PersonSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  bio: z.string().optional(),
  images: z.array(z.string()).optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  verified: z.boolean().optional(),
  brandId: z.string().optional(),
});

export const NewsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  images: z.array(z.string()).optional(),
  category: z.string().optional(),
  isBreaking: z.boolean().optional(),
  publishedAt: z.string().optional(),
  brandId: z.string().optional(),
});

export const BlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  images: z.array(z.string()).optional(),
  brandId: z.string().optional(),
});
