const FilterSidebar = () => {
  return (
    <div className="w-full md:w-64 bg-bg-main p-4 rounded-xl shadow">
      <h2 className="font-bold mb-4">Filters</h2>

      <div>
        <p className="text-sm font-semibold mb-2">Category</p>
        <label><input type="checkbox" /> Laptop</label><br />
        <label><input type="checkbox" /> Audio</label>
      </div>
    </div>
  );
};

export default FilterSidebar;