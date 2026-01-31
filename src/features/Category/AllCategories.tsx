import React from "react";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  slug: string;          // ← Ajouté : identifiant texte
  image: string;
  title: string;
  description: string;
}

const categories: Category[] = [
  {
    id: 1,
    slug: "travel",
    image: "/images/IMG7.jpg",
    title: "Travel & Adventure",
    description: "Explore breathtaking destinations and new cultures.",
  },
  {
    id: 2,
    slug: "politics",
    image: "/images/IMG8.jpg",
    title: "Politics & Society",
    description: "Understand the forces shaping our world today.",
  },
  {
    id: 3,
    slug: "selfcare",
    image: "/images/IMG9.jpg",
    title: "Self Care & Wellness",
    description: "Focus on mental and physical well-being for a balanced life.",
  },
  {
    id: 4,
    slug: "education",
    image: "/images/IMG10.jpg",
    title: "Kids & Education",
    description: "Inspire young minds through fun, learning, and creativity.",
  },
  {
    id: 5,
    slug: "art",
    image: "/images/IMG11.jpg",
    title: "Art & Expression",
    description: "Express yourself through various art forms and creativity.",
  },
  {
    id: 6,
    slug: "fashion",
    image: "/images/IMG12.jpg",
    title: "Fashion & Style",
    description: "Express your unique style and stay trendy.",
  },
  {
    id: 7,
    slug: "sports",
    image: "/images/IMG13.jpg",
    title: "Sports & Energy",
    description: "Discover the passion, power, and teamwork behind every game.",
  },
  {
    id: 8,
    slug: "relationships",
    image: "/images/IMG14.jpg",
    title: "Relationships & Friendship",
    description:
      "Explore the beauty of human connection, love, and true friendship.",
  },
  {
    id: 9,
    slug: "agriculture",
    image: "/images/IMG15.jpg",
    title: "Agriculture & Nature",
    description: "Discover the beauty of farming and sustainability.",
  },
  {
    id: 10,
    slug: "ocean",
    image: "/images/IMG16.jpg",
    title: "Sea & Ocean",
    description:
      "Feel the calm waves, endless horizons, and deep mysteries of the ocean.",
  },
  {
    id: 11,
    slug: "cosmos",
    image: "/images/IMG17.jpg",
    title: "Cosmos & Universe",
    description:
      "Journey through stars, galaxies, and the wonders of outer space.",
  },
  {
    id: 12,
    slug: "books",
    image: "/images/IMG18.jpg",
    title: "Books & Literature",
    description:
      "Enter the magical worlds created by words and imagination.",
  },
  {
    id: 13,
    slug: "movies",
    image: "/images/IMG19.jpg",
    title: "Movies & Entertainment",
    description: "Explore the art of storytelling through cinema.",
  },
  {
    id: 14,
    slug: "gaming",
    image: "/images/IMG20.jpg",
    title: "Gaming & Esports",
    description: "Dive into virtual worlds full of strategy and fun.",
  },
  {
    id: 15,
    slug: "music",
    image: "/images/IMG21.jpg",
    title: "Music & Sound",
    description:
      "Experience the rhythm and harmony that move the soul.",
  },
  {
    id: 16,
    slug: "chess",
    image: "/images/IMG22.jpg",
    title: "Chess & Strategy",
    description:
      "Dive into chess, puzzles, and other strategy challenges to train your mind.",
  },
  {
    id: 17,
    slug: "career",
    image: "/images/IMG23.jpg",
    title: "Career & Motivation",
    description: "Build confidence, find purpose, and grow professionally.",
  },
];

const AllCategories: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 font-primary">
          All Categories
        </h2>
        <p className="text-gray-600 font-secondary">
          Explore all blog categories available on our platform
        </p>
      </div>

      {/* Categories grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            id={cat.slug}      // ← essentiel pour le scroll + recherche
            key={cat.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-primary">
                {cat.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 font-secondary">
                {cat.description}
              </p>

              <Link
                to={`/category/${cat.slug}`}
                className="bg-[#004aad] text-white text-sm px-4 py-2 rounded-md hover:bg-[#003d82] font-secondary inline-block"
              >
                Browse
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
