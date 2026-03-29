const SortBar = () => {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
            <h1 className="font-bold text-lg">Products</h1>

            <select className="border px-2 py-1 rounded">
                <option>Relevance</option>
                <option>Price Low to High</option>
                <option>Price High to Low</option>
            </select>
        </div>
    );
};

export default SortBar;