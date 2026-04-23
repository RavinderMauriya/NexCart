import { useState, useEffect } from "react";

const ProductGallery = ({ images }) => {
  const validImages = images?.length > 0 ? images : ["/placeholder.png"];
  const [active, setActive] = useState(validImages[0]);

  // Reset active image when images change (variant switch)
  useEffect(() => {
    const newImages = images?.length > 0 ? images : ["/placeholder.png"];
    setActive(newImages[0]);
  }, [images]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sticky top-24">

      {/* Thumbnails */}
      <div className="flex sm:flex-col gap-2 sm:gap-3">
        {validImages.map((img, i) => (
          <div
            key={i}
            onClick={() => setActive(img)}
            className={`w-16 h-20 rounded-lg overflow-hidden cursor-pointer border-2
              ${active === img ? "border-primary" : "border-border"}
            `}
          >
            <img
              src={img}
              alt={`View ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 bg-bg-card rounded-xl p-4 shadow relative group">
        <img
          src={active}
          alt="Product"
          className="w-full h-[300px] sm:h-[500px] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

    </div>
  );
};

export default ProductGallery;