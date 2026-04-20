import { Home, ShoppingBag, Package, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal, user } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const requireAuth = (path) => {
    if (user) {
      navigate(path);
    } else {
      openModal("login");
    }
  };

  const navItems = [
    { path: "/", icon: Home, label: "Home", auth: false },
    { path: "/products", icon: ShoppingBag, label: "Shop", auth: false },
    { path: "/profile/orders", icon: Package, label: "Orders", auth: true },
    { path: "/profile", icon: User, label: "Account", auth: true },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-card border-t border-border safe-area-pb">
      <div className="flex justify-around items-center px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          const handleClick = (e) => {
            if (item.auth && !user) {
              e.preventDefault();
              openModal("login");
            }
          };

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleClick}
              className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[48px] rounded-xl transition-all duration-200 ${active
                  ? "text-primary bg-primary/10"
                  : "text-text-light hover:text-text-dark hover:bg-gray-100"
                }`}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                {item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-1 ${active ? "font-semibold" : "font-medium"}`}>
                {item.label}
              </span>
              {active && (
                <span className="absolute -bottom-2 w-1 h-1 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;