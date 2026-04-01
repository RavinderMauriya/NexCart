const CartItem = () => {
  return (
    <div className="p-4 sm:p-6 border-b hover:bg-gray-50 transition">

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">

        {/* IMAGE */}
        <div className="w-full sm:w-28 h-40 sm:h-32 bg-gray-200 rounded-lg flex-shrink-0" />

        {/* CONTENT */}
        <div className="flex-grow">

          {/* top */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <h2 className="font-semibold text-base sm:text-lg">
              ProVision X24 - Midnight Black
            </h2>

            <div className="text-left sm:text-right">
              <p className="text-lg font-extrabold">₹899</p>
              <p className="text-xs line-through text-text-muted">₹1099</p>
              <p className="text-xs text-success font-bold">18% Off</p>
            </div>
          </div>

          <p className="text-xs text-text-light mt-1 italic">
            Seller: NexDirect Retail
          </p>

          {/* actions */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">

            {/* quantity */}
            <div className="flex items-center border rounded-full px-2 py-1 bg-gray-100 w-fit">
              <button className="px-2">-</button>
              <span className="px-3 font-bold text-sm">1</span>
              <button className="px-2">+</button>
            </div>

            {/* buttons */}
            <div className="flex gap-4 sm:gap-6 text-sm font-bold uppercase">
              <button className="hover:text-primary">Save</button>
              <button className="hover:text-danger">Remove</button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CartItem;