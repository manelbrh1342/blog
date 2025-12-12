import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCategories, type Category } from "./CategoryApi";

// Default images mapping (fallback if backend doesn't provide images)
const defaultImages: Record<string, string> = {
  travel: "/images/IMG7.jpg",
  politics: "/images/IMG8.jpg",
  selfcare: "/images/IMG9.jpg",
  education: "/images/IMG10.jpg",
  art: "/images/IMG11.jpg",
  fashion: "/images/IMG12.jpg",
  sports: "/images/IMG13.jpg",
  relationships: "/images/IMG14.jpg",
  agriculture: "/images/IMG15.jpg",
  ocean: "/images/IMG16.jpg",
  cosmos: "/images/IMG17.jpg",
  books: "/images/IMG18.jpg",
  movies: "/images/IMG19.jpg",
  gaming: "/images/IMG20.jpg",
  music: "/images/IMG21.jpg",
  chess: "/images/IMG22.jpg",
  career: "/images/IMG23.jpg",
};

const AllCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        console.error("Error loading categories:", err);
        setError(err instanceof Error ? err.message : "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);
  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-red-600">{error}</p>
        </div>
      </div>
    );
  }

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
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const imageUrl = defaultImages[cat.slug] || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop";
            return (
              <div
                id={cat.slug}
                key={cat.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-primary">
                    {cat.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 font-secondary">
                    {cat.description || "Explore articles in this category"}
                  </p>

                  <Link
                    to={`/articles/${cat.slug}`}
                    className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 font-secondary inline-block"
                  >
                    Browse
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No categories available</p>
        </div>
      )}
    </div>
  );
};

export default AllCategories;
