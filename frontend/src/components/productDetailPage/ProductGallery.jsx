import { useState } from "react";

const ProductGallery = ({ images }) => {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sticky top-24">

      {/* Thumbnails */}
      <div className="flex sm:flex-col gap-2 sm:gap-3">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setActive(img)}
            className={`w-16 h-20 rounded-lg overflow-hidden cursor-pointer border-2 
              ${active === img ? "border-blue-500" : "border-border"}
            `}
          >
            <img
              src={img}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 bg-bg-card rounded-xl p-4 shadow relative group">

        <img
          src={active}
          className="w-full h-[300px] sm:h-[500px] object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badge (optional like your UI) */}
        <span className="absolute top-4 left-4 bg-secondary-dark text-white text-xs px-2 py-1 rounded">
          NEW
        </span>

      </div>

    </div>
  );
};

export default ProductGallery;