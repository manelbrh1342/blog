import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface SliderItem {
  img: string;
  title: string;
  description: string;
  category: string;
  smallImages: string[];
}

interface SliderProps {
  items: SliderItem[];
}

export default function Slider({ items }: SliderProps) {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${items[current].img})`,
          filter: "brightness(60%)",
        }}
      ></div>

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 text-white max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg">
          {items[current].title}
        </h1>

        <p className="mt-4 text-base md:text-lg opacity-90">{items[current].description}</p>

        <div className="flex gap-4 mt-8">

          {/* SEE MORE → Scroll vers All Categories */}
          <button
            onClick={() => navigate("/category#all-categories")}
            className="px-6 py-2 bg-white/30 border border-white/30 rounded-xl backdrop-blur-md hover:bg-white/50"
          >
            SEE MORE
          </button>

          {/* DISCOVER → Page articles de cette catégorie */}
          <button
            onClick={() =>
              navigate(`/articles/${items[current].category}`)
            }
            className="px-6 py-2 border border-white rounded-xl hover:bg-white/20"
          >
            DISCOVER
          </button>
        </div>
      </div>

      {/* SMALL IMAGES */}
      <div className="hidden md:flex absolute bottom-20 left-[70%] -translate-x-1/2 gap-4 z-10">
        {items[current].smallImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className="w-28 h-28 aspect-square object-cover rounded-xl shadow-lg shrink-0"
          />
        ))}
      </div>

      {/* ARROWS */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-[32%] md:-translate-x-1/2 flex gap-3 z-10">
        <button
          onClick={() => setCurrent((current - 1 + items.length) % items.length)}
          className="p-2 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/60 text-white text-xl"
        >
          ❮
        </button>

        <button
          onClick={() => setCurrent((current + 1) % items.length)}
          className="p-2 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/60 text-white text-xl"
        >
          ❯
        </button>
      </div>
    </div>
  );
}
