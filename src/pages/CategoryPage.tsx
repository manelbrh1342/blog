import AuthNav from "../components/AuthNavigation";
import Slider from "../features/Category/Slider";
import AllCategories from "../features/Category/AllCategories";
import Footer from "../components/landing/Footer";


import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function CategoryPage() {
  const location = useLocation();

  // Scroll automatique vers #all-categories
  useEffect(() => {
    if (location.hash === "#all-categories") {
      setTimeout(() => {
        const section = document.getElementById("all-categories");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
  }, [location]);

  const sliderItems = [
    {
      img: "/images/IMG1.jpg",
      title: "The Domain of Artificial Intelligence",
      description:
        "A universe where technology mimics human intelligence, machine learning and algorithms shaping our daily lives and the future ahead.",
      category: "ai",
      smallImages: [
        "/images/IMG2.jpg",
        "/images/IMG3.jpg",
        "/images/IMG4.jpg",
        "/images/IMG5.jpg",
        "/images/IMG6.jpg",
      ],
    },
    {
      img: "/images/IMG2.jpg",
      title: "The Art of Food and Flavor",
      description:
        "A world of flavors and creativity where each recipe tells a story of culture, memory, and passion for sharing.",
      category: "food",
      smallImages: [
        "/images/IMG3.jpg",
        "/images/IMG4.jpg",
        "/images/IMG5.jpg",
        "/images/IMG6.jpg",
        "/images/IMG1.jpg",
      ],
    },
    {
      img: "/images/IMG3.jpg",
      title: "The World of Ancient Civilizations",
      description:
        "A world full of stories and ancient civilizations where the past reveals the roots of our present and lessons for the future.",
      category: "history",
      smallImages: [
        "/images/IMG4.jpg",
        "/images/IMG5.jpg",
        "/images/IMG6.jpg",
        "/images/IMG1.jpg",
        "/images/IMG2.jpg",
      ],
    },
    {
      img: "/images/IMG4.jpg",
      title: "The Universe of Developers",
      description:
        "A world of logic and creativity where every line of code builds apps, websites, and solutions that connect and simplify life.",
      category: "development",
      smallImages: [
        "/images/IMG5.jpg",
        "/images/IMG6.jpg",
        "/images/IMG1.jpg",
        "/images/IMG2.jpg",
        "/images/IMG3.jpg",
      ],
    },
    {
      img: "/images/IMG5.jpg",
      title: "The Realm of Medicine and Humanity",
      description:
        "A universe devoted to health and research where science and compassion meet to save lives and improve human well-being.",
      category: "medicine",
      smallImages: [
        "/images/IMG6.jpg",
        "/images/IMG1.jpg",
        "/images/IMG2.jpg",
        "/images/IMG3.jpg",
        "/images/IMG4.jpg",
      ],
    },
    {
      img: "/images/IMG6.jpg",
      title: "The Sphere of Knowledge",
      description:
        "A universe of knowledge and discovery where every idea, book, and teacher opens the door to a brighter future.",
      category: "education",
      smallImages: [
        "/images/IMG1.jpg",
        "/images/IMG2.jpg",
        "/images/IMG3.jpg",
        "/images/IMG4.jpg",
        "/images/IMG5.jpg",
      ],
    },
  ];

  return (
    <>
      <AuthNav />

      {/* SLIDER */}
      <Slider items={sliderItems} />

      {/* SEARCHBAR
      <div className="w-full flex justify-center mt-6 mb-4">
        <SearchBar />
      </div> */}

      {/* ALL CATEGORIES */}
      <div id="all-categories">
        <AllCategories />
      </div>

      <Footer />
    </>
  );
}
