const SavedItem = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 opacity-80 hover:opacity-100 transition">

      <div className="w-full sm:w-24 h-32 sm:h-24 bg-gray-200 rounded-lg flex-shrink-0" />

      <div className="flex-grow">
        <h4 className="font-semibold">
          Minimalist Smartwatch - Arctic White
        </h4>

        <p className="text-lg font-bold mt-1">$210</p>

        <div className="mt-3 flex gap-4 text-xs sm:text-sm font-bold uppercase">
          <button className="text-primary">Move to Cart</button>
          <button className="text-text-light">Remove</button>
        </div>
      </div>

    </div>
  );
};

export default SavedItem;