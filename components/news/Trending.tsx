"use client";
import hero from "@/public/hero.jpg"
import Image from "next/image";
import Link from "next/link";

const newsData = {
  mainArticle: {
    title: "Salim leaves DAG , says the name is too 'dark'",
    image:"/building.jpg",
    text:"'I don't know what to say anymore, man. I spoke to Semilore already ,Just don't hate me, Yall still have my respect and love,day.Once again, I swear with my life, there's no other reason.'",
    link: "#",
    author: "KYLIE ROBISON",
    date: "JAN 28",
  },
  topStories: [
    {
      id: 1,
      title: "Inci and Begho break up",
      author: "JAY PETERS",
      date: "JAN 30",
      comments: 12,
      image: "/a.JPG",
    },
    {
      id: 2,
      title: "Zilla Oaks drops new tape",
      author: "TOM WARREN",
      date: "JAN 29",
      comments: 49,
      image: "/b.JPG",
    },
    {
      id: 3,
      title: "Odumodu calls Yp 'WACK'",
      author: "KYLIE ROBISON",
      date: "JAN 28",
      comments: 130,
      image:  "/c.JPG",
    },
    {
      id: 4,
      title: "Odumodu calls Yp 'WACK'",
      author: "KYLIE ROBISON",
      date: "JAN 28",
      comments: 130,
      image:  "/c.JPG",
    },
    {
      id: 5,
      title: "Odumodu calls Yp 'WACK'",
      author: "KYLIE ROBISON",
      date: "JAN 28",
      comments: 130,
      image:  "/c.JPG",
    },
  ],
};

export default function Trending() {
  return (
    <div className=" min-h-[80vh] text-[#7A7A7A]  pb-12">
    
     

      {/* Main News Section */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-6">
        <div className="lg:col-span-2 ">
          <Link href={newsData.mainArticle.link} className="block relative">
            <Image
              src={newsData.mainArticle.image}
              alt={newsData.mainArticle.title}
              width={800}
              height={450}
              className="w-full h-[400px] object-cover rounded-md"
            />

            <div className="absolute -bottom-[235px] right-12 font-merriweather text-xl font-light py-2">
             <h2 className="text-7xl  text-[#C06350] bg-[#F8E1DB] font-bold  font-oswald mb-4 p-1" > {newsData.mainArticle.title}</h2>
             <p>  {newsData.mainArticle.text}</p>

             <p className="text-sm mt-4 font-raleway "> <span className="text-[#C06350]">{newsData.mainArticle.author}</span> | {newsData.mainArticle.date}</p>
            </div>
          
          </Link>
        </div>

        {/* Top Stories */}
        <aside>
          <h3 className="text-[#C06350] text-2xl font-semibold font-raleway">Top Scoops</h3>
          <ul className="space-y-4 mt-4">
            {newsData.topStories.map((story) => (
              <li key={story.id} className="flex gap-4 items-center justify-between border-b border-[#4F4F4F] pb-4">
              
                <div>
                  
                  <Link href="#" className=" text-[#4F4F4F] hover:text-[#C06350] font-bold text-xl">
                    {story.title}
                  </Link>
                  <p className="text-sm text-gray-40 mt-4 font-raleway "><span  className="text-[#C06350]">{story.author}</span> | {story.date}</p>
                </div>
                <Image
                  src={story.image}
                  alt={story.title}
                  width={80}
                  height={80}
                  className="rounded-md w-20 h-20 object-cover"
                />
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
}
