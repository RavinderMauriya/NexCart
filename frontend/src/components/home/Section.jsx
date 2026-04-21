import React, { useState } from "react";
import { ArrowRight, ImageOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Section = () => {
  const [imageErrors, setImageErrors] = useState({});
  const navigate = useNavigate();

  const products = [
    { id: 1, title: "True Wireless", discount: "Min. 50% Off", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80" },
    { id: 2, title: "Trimmers", discount: "Min. 50% Off", image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&q=80" },
    { id: 3, title: "Neckband", discount: "Min. 50% Off", image: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=400&q=80" },
    { id: 4, title: "Smart Watches", discount: "Min. 40% Off", image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&q=80" },
    { id: 5, title: "Speakers", discount: "Min. 30% Off", image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&q=80" },
    { id: 6, title: "Power Banks", discount: "Min. 20% Off", image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&q=80" },
    { id: 7, title: "Headphones", discount: "Min. 50% Off", image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=400&q=80" },
    { id: 8, title: "Gaming Mouse", discount: "Min. 40% Off", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80" }
  ];

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="p-4 md:p-6">
      
      {/* Section */}
      <div className="bg-purple-200 rounded-2xl p-4">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg md:text-xl font-semibold text-text-dark">
            Best Gadgets & Appliances
          </h2>
          <button
          onClick={()=>{navigate("/products?category=69d3d8972b68b4929dc94849")}}
            className="bg-black text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="View all products"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-3 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="w-full h-[120px] md:h-[140px] bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                {imageErrors[item.id] ? (
                  <div className="flex flex-col items-center text-text-muted">
                    <ImageOff size={28} />
                    <span className="text-xs mt-1">{item.title}</span>
                  </div>
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={() => handleImageError(item.id)}
                  />
                )}
              </div>

              {/* Content */}
              <h3 className="text-sm md:text-base font-medium text-text-dark truncate">
                {item.title}
              </h3>
              <p className="text-sm font-semibold text-success mt-0.5">
                {item.discount}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Section;