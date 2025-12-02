import React from "react";
import { Link } from "react-router-dom";


interface SlideItemProps {
  title: string;
  description: string;
  image: string;
  miniImages: string[];
}

const SlideItem: React.FC<SlideItemProps> = ({
  title,
  description,
  image,
  miniImages,
}) => {
  return (
    <div
      className="w-full h-[90vh] bg-cover bg-center flex flex-col justify-center px-10 text-white"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="backdrop-brightness-75 p-6 rounded-lg max-w-xl">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="mb-6">{description}</p>

        <div className="flex gap-4">
          <button className="px-6 py-2 border rounded-full hover:bg-white hover:text-black transition">
            SEE MORE
          </button>
          <button className="px-6 py-2 border rounded-full hover:bg-white hover:text-black transition">
            DISCOVER
          </button>
        </div>
      </div>

      {/* mini images */}
      <div className="flex gap-4 absolute bottom-10 left-10">
        {miniImages.map((img, i) => (
          <img
            key={i}
            src={img}
            className="w-28 h-20 object-cover rounded-lg shadow-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default SlideItem;
