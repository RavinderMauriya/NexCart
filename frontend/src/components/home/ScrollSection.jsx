import React from "react";

const ScrollSection = () => {
  const products = [
    {
      id: 1,
      title: "True Wireless",
      discount: "Min. 50% Off",
      image: "https://images.unsplash.com/photo-1585386959984-a41552231658"
    },
    {
      id: 2,
      title: "Trimmers",
      discount: "Min. 50% Off",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30"
    },
    {
      id: 3,
      title: "Neckband",
      discount: "Min. 50% Off",
      image: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b"
    },
    {
      id: 4,
      title: "Smart Watches",
      discount: "Min. 40% Off",
      image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c"
    }
  ];

  return (
    <div className="p-6">
      
      {/* Section Box */}
      <div className="bg-primary-light rounded-2xl p-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Best Gadgets & Appliances
          </h2>

          <button className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center">
            →
          </button>
        </div>

        {/* Cards */}
        <div className="flex gap-4 md:justify-center overflow-x-auto scrollbar-hide">

          {products.map((item) => (
            <div
              key={item.id}
              className="min-w-[200px] md:min-w-[300px] bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[150px] object-contain mb-2"
              />

              <h3 className="text-sm font-medium">
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

export default ScrollSection;