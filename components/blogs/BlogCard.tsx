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

const BlogCard: React.FC<BlogCardProps> = ({ blogs }) => {
  if (blogs.length === 0) return null;

  // Sort blogs by date (assuming ISO format YYYY-MM-DD)
  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latestBlog = sortedBlogs[0];
  const otherBlogs = sortedBlogs.slice(1, 3);

  return (
    <div className="rounded-2xl shadow-md bg-[#F8E1DB]   p-4 max-w-md font-raleway text-[#7A7A7A] flex flex-col justify-between ">
      <p className="text-sm text-gray-700 uppercase font-semibold">{latestBlog.category}</p>
      <h2 className="text-4xl font-bold mt-2 text-gray-700 hover:text-[#C06350] font-oswald">{latestBlog.title}</h2>
      <p className="text-sm text-gray-600">{latestBlog.author} • {latestBlog.date}</p>
      <div className="relative w-full h-48 mt-4">
        <Image src={latestBlog.image} alt={latestBlog.title} layout="fill" className="rounded-lg object-cover" />
      </div>
      <div className="mt-3">
        {otherBlogs.map((blog) => (
          <div key={blog.id} className="mt-2 border-b border-[#7A7A7A] p-4">
            <h3 className="text-md font-semibold text-gray-700 hover:text-[#C06350]  ">{blog.title}</h3>
            <p className="text-sm text-gray-600">{blog.date}</p>
          </div>
        ))}
      </div>
      <a
        href={`/category/${latestBlog.category}`}
        className="underline font-semibold mt-3 inline-block hover:text-[#C06350]"
      >
        See More →
      </a>
    </div>
  );
};

export default BlogCard;
