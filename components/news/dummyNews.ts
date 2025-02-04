// dummyNews.ts

export interface NewsArticle {
    id: number;
    title: string;
    image: string;
    author: string;
    date: string;
  }
  
  const dummyNews: NewsArticle[] = [
    {
      id: 1,
      title: "Government Approves New Infrastructure Project in Abuja",
      image: "/a.JPG",
      author: "John Doe",
      date: "Feb 1, 2025",
    },
    {
      id: 2,
      title: "Tech Innovation Hub Launched in Lagos",
      image: "/b.JPG",
      author: "Jane Smith",
      date: "Jan 30, 2025",
    },
    {
      id: 3,
      title: "Nigeria Wins African Cup of Nations!",
      image: "/c.JPG",
      author: "Michael Johnson",
      date: "Jan 28, 2025",
    },
    {
      id: 4,
      title: "Petrol Prices Expected to Drop Next Month",
      image: "/og.png",
      author: "Sarah Okwu",
      date: "Jan 26, 2025",
    },
  ];
  
  export default dummyNews;
  