import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type KeyboardEvt = React.KeyboardEvent<HTMLInputElement>;

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const categories = ["ai", "food", "history", "development", "medicine", "education"];

  const doScrollToAllCategories = () => {
    // Si l'élément existe on scroll direct
    const el = document.getElementById("all-categories");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return true;
    }
    return false;
  };

  const handleSearch = () => {
    setError("");
    const normalized = query.toLowerCase().trim();
    console.log("[SearchBar] search:", normalized);

    if (!normalized) return;

    const match = categories.includes(normalized);

    if (match) {
      // Si on est déjà sur /category, change juste le hash et scroll
      if (window.location.pathname === "/category") {
        // pose le hash pour l'historique (change URL)
        history.replaceState(null, "", "/category#all-categories");
        // tente le scroll (si AllCategories déjà rendu)
        const scrolled = doScrollToAllCategories();
        if (!scrolled) {
          // sinon, un petit timeout pour attendre le rendu, puis scroller
          setTimeout(() => doScrollToAllCategories(), 200);
        }
      } else {
        // sinon on navigue vers la page category avec hash
        navigate("/category#all-categories");
      }
    } else {
      setError("Not found");
      console.log("[SearchBar] not found:", normalized);
    }
  };

  const handleKeyDown = (e: KeyboardEvt) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="flex items-center bg-white border border-blue-400 rounded-full px-4 py-2 shadow-md w-full">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 outline-none bg-transparent"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setError(""); }}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white p-2 rounded-full ml-2"
        >
          🔍
        </button>
      </div>

      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
