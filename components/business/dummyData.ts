export interface Business {
    id: number;
    name: string;
    image: string;
    social: { link : string, handle : string};
   desc: string;
    reviews: number;
    phone: string;
    category: string;
  }
  
  export interface Podcast {
    id: number;
    title: string;
    date: string;
    image: string;
  }
  
  export const businesses: Business[] = [
    {
      id: 1,
      name: "Afex Nigeria",
      image: "/apex.jpg",
      social: {link: "https://www.instagram.com/afexnigeria", handle:"@afexnigeria"},
      desc: "",
      reviews: 980,
      phone: "+234 803 123 4567",
      category: "Finance & Industry",
    },
    {
      id: 2,
      name: "Buns and Batter",
      image: "/bb.jpg",
      social: {link: "https://www.instagram.com/bunsandbatter", handle:"@bunsandbatter"},
     desc: "",
      reviews: 1340,
      phone: "+234 802 456 7890",
      category: "Food & Beverage",
    },
    {
      id: 3,
      name: "Pressctrl",
      image: "/ctrl.jpg",
      social: {link: "https://www.instagram.com/pr3ssctrl", handle:"@pr3ssctrl"},
     desc: "",
      reviews: 760,
      phone: "+234 901 234 5678",
      category: "Fashion & Clothing",
    },
    {
      id: 4,
      name: "G.U Ebeco Industries",
      image: "/gua.jpg",
      social: {link: "https://www.instagram.com/guebeco/", handle:"@guebeco"},
     desc: "",
      reviews: 1205,
      phone: "+234 812 345 6789",
      category: "Funiture & Decor",
    },
    {
      id: 5,
      name: "Metrowears",
      image: "/metro.jpg",
      social: {link: "https://www.instagram.com/shopmetrowearz/", handle:"@shopmetrowearz"},
     desc: "",
      reviews: 890,
      phone: "+234 903 567 8901",
      category: "Fashion & Clothing",
    },
    {
        id: 6,
        name: "Rosario XO",
        image: "/rosario.jpg",
        social: {link: "https://www.instagram.com/rosariobyxo", handle:"@rosariobyxo"},
       desc: "",
        reviews: 890,
        phone: "+234 903 567 8901",
        category: " Fashion & Clothing",
      },
      {
        id: 7,
        name: "Somma's Yummies ",
        image: "/somma.webp",
        social: {link: "https://www.instagram.com/sommasyummies/" , handle:"@sommasyummies"},
       desc: "",
        reviews: 890,
        phone: "+234 903 567 8901",
        category: "Food & Beverage",
      },
      {
        id: 8,
        name: "Preview Gadgets",
        image: "/preview.jpg",
        social: {link: "https://www.instagram.com/preview_gadgets_/", handle:"@preview_gadgets_"},
       desc: "",
        reviews: 890,
        phone: "+234 903 567 8901",
        category: "Gadgets",
      },
  ];
  
  export const podcasts = [
    { id: 1, title: "Capital Block Party", date: "March 10, 2025", image: "/images/pone.jpeg" },
    { id: 2, title: "Even in the Day", date: "April 5, 2025", image: "/images/ptwo.jpg" },
    { id: 3, title: "Meat and Greet", date: "May 20, 2025", image: "/images/pthree.jpg" },
    { id: 4, title: "Otaku Connect", date: "March 10, 2025", image: "/images/pfour.jpg" },
  ];
  
  