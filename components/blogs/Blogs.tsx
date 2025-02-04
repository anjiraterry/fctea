import React, { useMemo } from "react";
import BlogCard from "./BlogCard";
import dummyBlogs from "./dummyBlogs";

type Blog = {
    id: string;
    category: string;
    date: string;
    title: string;
    author: string;
    image: string;
    link: string;
  };

const groupBlogsByCategory = (blogs: Blog[]) => {
  const categoryMap: Record<string, Blog[]> = {};

  blogs.forEach((blog) => {
    if (!categoryMap[blog.category]) {
      categoryMap[blog.category] = [];
    }
    categoryMap[blog.category].push(blog);
  });

  Object.values(categoryMap).forEach((blogList) => {
    blogList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  return Object.entries(categoryMap).sort(
    ([, aBlogs], [, bBlogs]) => new Date(bBlogs[0].date).getTime() - new Date(aBlogs[0].date).getTime()
  );
};

export default function BlogSection() {
  const groupedBlogs = useMemo(() => groupBlogsByCategory(dummyBlogs), [dummyBlogs]);

  return (
    <div>
          <h3 className="text-[#C06350] text-2xl font-semibold font-raleway">Latest Blogs</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 min-h-[80vh] pb-12 mt-12">
        
      {groupedBlogs.map(([category, blogs]) => (
        <BlogCard key={`${category}-${blogs[0].date}`} blogs={blogs} />
      ))}
    </div>
    </div>
  );
}
