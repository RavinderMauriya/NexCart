import React from "react";

const Section = () => {
  const products = [
    { id: 1, title: "True Wireless", discount: "Min. 50% Off", image: "https://images.unsplash.com/photo-1585386959984-a41552231658" },
    { id: 2, title: "Trimmers", discount: "Min. 50% Off", image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30" },
    { id: 3, title: "Neckband", discount: "Min. 50% Off", image: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b" },
    { id: 4, title: "Smart Watches", discount: "Min. 40% Off", image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c" },
    { id: 5, title: "Speakers", discount: "Min. 30% Off", image: "https://images.unsplash.com/photo-1589003077984-894e133dabab" },
    { id: 6, title: "Power Banks", discount: "Min. 20% Off", image: "https://images.unsplash.com/photo-1609592806787-3d9f6fba6a3f" },
    { id: 7, title: "Headphones", discount: "Min. 50% Off", image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd" },
    { id: 8, title: "Gaming Mouse", discount: "Min. 40% Off", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7" }
  ];

  return (
    <div className="p-4 md:p-6">
      
      {/* Section */}
      <div className="bg-purple-200 rounded-2xl p-4">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-semibold">
            Best Gadgets & Appliances
          </h2>

          <button className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center">
            →
          </button>
        </div>

        {/* Grid */}
        <div className="
          grid grid-cols-2 gap-4
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        ">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[120px] md:h-[140px] object-contain mb-2"
              />

              <h3 className="text-sm md:text-base font-medium">
                {item.title}
              </h3>

              <p className="text-sm font-semibold">
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