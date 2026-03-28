import { Home, Grid, User, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const MobileBottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-bg-card shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t flex justify-around items-center px-4 py-2">

      <Link to="/" className="flex flex-col items-center text-primary">
        <Home size={22} />
        <span className="text-[10px] font-semibold mt-1">Home</span>
      </Link>

      <Link to="/categories" className="flex flex-col items-center text-text-light">
        <Grid size={22} />
        <span className="text-[10px] font-semibold mt-1">Categories</span>
      </Link>

      <Link to="/address" className="flex flex-col items-center text-text-light">
        <MapPin size={22} />
        <span className="text-[10px] font-semibold mt-1">Address</span>
      </Link>

      <Link to="/profile" className="flex flex-col items-center text-text-light">
        <User size={22} />
        <span className="text-[10px] font-semibold mt-1">Account</span>
      </Link>

    </nav>
  );
};

export default MobileBottomNav;