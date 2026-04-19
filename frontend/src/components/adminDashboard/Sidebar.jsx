import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-bg-card border-r p-4 space-y-4 h-screen sticky top-0">
        <h1 className="text-xl font-bold">Admin</h1>

        <nav className="flex flex-col gap-2">
          <Link className='hover:bg-gray-200 p-2 rounded' to="/admin/dashboard">Dashboard</Link>
          <Link className='hover:bg-gray-200 p-2 rounded' to="/admin/categories">Categories</Link>
          <Link className='hover:bg-gray-200 p-2 rounded' to="/admin/products">Products</Link>
          <Link className='hover:bg-gray-200 p-2 rounded' to="/admin/orders">Orders</Link>
          <Link className='hover:bg-gray-200 p-2 rounded' to="/admin/users">Users</Link>
        </nav>
      </div>

      {/* Mobile/Tablet Horizontal Nav */}
      <div className="lg:hidden bg-bg-card border-b p-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-bold">Admin</h1>
        </div>
        <nav className="flex flex-wrap gap-2 text-sm">
          <Link className='hover:bg-gray-200 px-3 py-1.5 rounded bg-gray-100' to="/admin/dashboard">Dashboard</Link>
          <Link className='hover:bg-gray-200 px-3 py-1.5 rounded bg-gray-100' to="/admin/categories">Categories</Link>
          <Link className='hover:bg-gray-200 px-3 py-1.5 rounded bg-gray-100' to="/admin/products">Products</Link>
          <Link className='hover:bg-gray-200 px-3 py-1.5 rounded bg-gray-100' to="/admin/orders">Orders</Link>
          <Link className='hover:bg-gray-200 px-3 py-1.5 rounded bg-gray-100' to="/admin/users">Users</Link>
        </nav>
      </div>
    </>
  );
}