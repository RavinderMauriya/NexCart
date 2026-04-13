import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-bg-card border-r p-4 space-y-4">
      <h1 className="text-xl font-bold">Admin</h1>

      <nav className="flex flex-col gap-2">
        <Link className='hover:bg-gray-200 p-2 rounded' to="/admin/dashboard">Dashboard</Link>
        <Link className='hover:bg-gray-200 p-2 rounded' to="/admin/categories">Categories</Link>
        <Link className='hover:bg-gray-200 p-2 rounded' to="/admin/products">Products</Link>
        <Link className='hover:bg-gray-200 p-2 rounded' to="/admin/orders">Orders</Link>
        <Link className='hover:bg-gray-200 p-2 rounded' to="/admin/users">Users</Link>
        <Link className='hover:bg-gray-200 p-2 rounded' to="/admin/coupons">Coupons</Link>
      </nav>
    </div>
  );
}