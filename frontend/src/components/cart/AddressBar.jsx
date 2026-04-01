const AddressBar = () => {
  return (
    <div className="bg-bg-card rounded-lg p-4 flex justify-between items-start sm:items-center shadow-sm border">
      
      <div className="flex gap-3">
        <span className="text-primary">📍</span>
        <div>
          <p className="text-sm font-semibold">
            Deliver to: <span className="font-bold">Alex Johnson, 10001</span>
          </p>
          <p className="text-xs text-text-light">
            452 Fifth Avenue, Manhattan, New York City
          </p>
        </div>
      </div>

      <button className="text-primary text-sm font-semibold">
        Change
      </button>
    </div>
  );
};

export default AddressBar;