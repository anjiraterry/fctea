"use client";
import hero from "@/public/hero.jpg"
import Image from "next/image";
import Link from "next/link";

const newsData = {
  mainArticle: {
    title: "Salim leaves DAG, says the name is too 'dark'",
    image:"/building.jpg",
    text:"'I don't know what to say anymore, man. I spoke to Semilore already, Just don't hate me. Yall still have my respect and love. Once again, I swear with my life, there's no other reason.'",
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
      title: "The Return of Abuja Nightlife",
      author: "KYLIE ROBISON",
      date: "JAN 28",
      comments: 130,
      image:  "/hero.jpg",
    },
    {
      id: 5,
      title: "Capital Block Party Highlights",
      author: "KYLIE ROBISON",
      date: "JAN 28",
      comments: 130,
      image:  "/apex.jpg",
    },
  ],
};

export default function Trending() {
  return (
    <div className="text-[#2D241E] font-raleway">
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Article */}
        <div className="lg:col-span-2 group">
          <Link href={newsData.mainArticle.link} className="block space-y-6">
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-sm">
              <Image
                src={newsData.mainArticle.image}
                alt={newsData.mainArticle.title}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                 <span className="px-3 py-1 bg-[#C06350] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">The Main Loop</span>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-michy text-[#C06350] leading-tight group-hover:underline decoration-1 underline-offset-8">
                {newsData.mainArticle.title}
              </h2>
              <p className="text-[#2D241E]/70 text-lg font-light leading-relaxed line-clamp-3">
                {newsData.mainArticle.text}
              </p>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#2D241E]/40">
                <span className="text-[#C06350]">{newsData.mainArticle.author}</span>
                <span className="w-1 h-1 bg-[#2D241E]/20 rounded-full" />
                <span>{newsData.mainArticle.date}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Top Stories */}
        <aside className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#C06350]/10 pb-3">
            <h3 className="text-[#C06350] text-lg font-bold font-montserrat uppercase tracking-wider">Top Scoops</h3>
          </div>
          <ul className="space-y-6">
            {newsData.topStories.map((story) => (
              <li key={story.id} className="group">
                <Link href="#" className="flex gap-4 items-start">
                  <div className="flex-1 space-y-2">
                    <h4 className="text-[#2D241E] group-hover:text-[#C06350] font-bold text-lg leading-snug transition-colors line-clamp-2">
                      {story.title}
                    </h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#2D241E]/40">
                      {story.author} • {story.date}
                    </p>
                  </div>
                  <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden shadow-sm border border-[#C06350]/5">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
}
