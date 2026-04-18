import { useSearchParams } from "react-router-dom";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";

const SortBar = ({ total = 0, onMobileFilterOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get("sort") || "";

  const sortOptions = [
    { value: "", label: "Relevance" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "rating", label: "Top Rated" },
  ];

  const handleSortChange = (e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set("sort", value);
    } else {
      newParams.delete("sort");
    }

    // Reset to page 1 when sort changes
    newParams.delete("page");
    setSearchParams(newParams);
  };

  // Count active filters (excluding search and sort)
  const activeFilters = Array.from(searchParams.entries()).filter(
    ([key]) => !["search", "sort", "page"].includes(key)
  ).length;

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-lg">Products</h1>
        {total > 0 && (
          <span className="text-sm text-text-muted">({total} items)</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Mobile Filter Button */}
        <button
          onClick={onMobileFilterOpen}
          className="md:hidden flex items-center gap-2 px-3 py-2 bg-bg-card border border-border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal size={16} />
          Filters
          {activeFilters > 0 && (
            <span className="bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
              {activeFilters}
            </span>
          )}
        </button>

        {/* Sort Dropdown */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ArrowUpDown size={16} className="text-text-muted" />
          </div>
          <select
            value={currentSort}
            onChange={handleSortChange}
            className="appearance-none bg-bg-card border border-border pl-9 pr-8 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer min-w-[160px]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortBar;