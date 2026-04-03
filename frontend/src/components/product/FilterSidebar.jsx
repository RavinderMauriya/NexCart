const FilterSidebar = () => {
  return (
    <div className="w-full md:w-64 bg-bg-card p-4 rounded-xl shadow border-border">
      <h2 className="font-bold mb-4">Filters</h2>

      <div>
        <p className="text-sm font-semibold mb-2">Category</p>
        <label><input type="checkbox" /> Laptop</label><br />
        <label><input type="checkbox" /> Audio</label>
      </div>
      <hr className="my-4 border-border" />

      <div>
        <p className="text-sm font-semibold mb-2">Category</p>
        <label><input type="checkbox" /> Laptop</label><br />
        <label><input type="checkbox" /> Audio</label>
      </div>
      <hr className="my-4 border-border" />

      <div>
        <p className="text-sm font-semibold mb-2">Category</p>
        <label><input type="checkbox" /> Laptop</label><br />
        <label><input type="checkbox" /> Audio</label>
      </div>
    </div>
  );
};

export default FilterSidebar;