import React from "react";
import Image from "next/image";

interface Blog {
  id: string;
  category: string;
  title: string;
  author: string;
  date: string;
  image: string;
  link: string;
}

interface BlogCardProps {
  blogs: Blog[];
}

import Link from "next/link";

const BlogCard: React.FC<BlogCardProps> = ({ blogs }) => {
  if (blogs.length === 0) return null;

  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latestBlog = sortedBlogs[0];
  const otherBlogs = sortedBlogs.slice(1, 3);

  return (
    <div className="space-y-6 font-raleway">
      <Link href={latestBlog.link} className="group block space-y-4">
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm">
          <Image src={latestBlog.image} alt={latestBlog.title} fill className="object-cover transition-transform group-hover:scale-105" />
          <div className="absolute top-4 right-4 bg-[#C06350] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            {latestBlog.category}
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[#2D241E] group-hover:text-[#C06350] transition-colors line-clamp-2">{latestBlog.title}</h2>
          <p className="text-xs font-bold uppercase tracking-widest text-[#2D241E]/40">{latestBlog.author} • {latestBlog.date}</p>
        </div>
      </Link>

      <div className="space-y-4">
        {otherBlogs.map((blog) => (
          <Link key={blog.id} href={blog.link} className="group block border-t border-[#C06350]/10 pt-4">
            <h3 className="text-base font-bold text-[#2D241E] group-hover:text-[#C06350] transition-colors">{blog.title}</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2D241E]/40 mt-1">{blog.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
