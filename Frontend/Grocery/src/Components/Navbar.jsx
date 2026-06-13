import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { logoutUser as logoutAction } from "../Redux/authSlice";
import { Success, Error } from "../Utils/toastUtils.js";
import { useTheme } from "../context/ThemeContext";
import {
  ShoppingCart,
  Home,
  ListOrdered,
  Phone,
  Search,
  Menu,
  X,
  Store,
  Sun,
  Moon,
  LogOut,
  User,
  LayoutDashboard,
  ShoppingBag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";
import { cn } from "../Utils/cn";

export default function Navbar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Shop", path: "/products", icon: <ListOrdered size={18} /> },
    { name: "Contact", path: "/contact", icon: <Phone size={18} /> },
    { name: "Sell", path: "/seller", icon: <Store size={18} /> },
  ];

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      const trimmed = searchTerm.trim();
      if (trimmed) {
        navigate(`/search?q=${encodeURIComponent(trimmed)}`);
        setSearchTerm("");
        setMobileOpen(false);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    setUserMenuOpen(false);
    Error("Logged out successfully");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* Glass floating bar */}
        <div className="mx-auto max-w-7xl px-4 pt-3">
          <div className="flex items-center justify-between h-16 px-6 rounded-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-glass">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center shadow-warm group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="text-white" size={20} />
              </div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent hidden sm:block">
                EcoBazzar
              </span>
            </Link>

            {/* Center Nav Links */}
            <nav className="hidden md:flex items-center bg-gray-100/80 dark:bg-gray-800/60 rounded-full p-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300",
                    isActive(link.path)
                      ? "bg-white dark:bg-gray-700 text-brand-600 dark:text-brand-400 shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              {/* Search */}
              <div className="hidden lg:flex items-center relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-40 xl:w-52 h-9 pl-9 pr-3 rounded-full bg-gray-100 dark:bg-gray-800 border-none text-sm focus:ring-2 ring-brand-400 transition-all placeholder:text-gray-400"
                />
                <Search className="absolute left-3 text-gray-400" size={16} />
              </div>

              {/* Dark Mode */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-sm hover:shadow-warm transition-shadow"
                  >
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="absolute right-0 mt-3 w-56 rounded-2xl bg-white dark:bg-surface-dark-gray shadow-glass-lg ring-1 ring-black/5 z-50 overflow-hidden"
                        >
                          <div className="p-4 bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-950/30 dark:to-accent-900/20 border-b border-gray-100 dark:border-gray-800">
                            <p className="text-sm font-bold truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                          <div className="p-2">
                            <Link to="/profile">
                              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <User size={18} className="text-gray-400" />
                                My Profile
                              </button>
                            </Link>
                            {user?.is_admin && (
                              <Link to="/admin-dashboard">
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-accent-600">
                                  <LayoutDashboard size={18} />
                                  Admin Dashboard
                                </button>
                              </Link>
                            )}
                            {user?.role === "seller" && (
                              <Link to="/seller-dashboard">
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-brand-600">
                                  <Store size={18} />
                                  Seller Dashboard
                                </button>
                              </Link>
                            )}
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                            >
                              <LogOut size={18} />
                              Log Out
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Button variant="primary" size="sm" onClick={() => navigate("/auth")} className="hidden sm:flex">
                  Sign In
                </Button>
              )}

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-80 bg-white dark:bg-surface-dark shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-extrabold bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                  EcoBazzar
                </span>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                  <X size={22} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full h-12 pl-12 pr-4 rounded-2xl bg-gray-100 dark:bg-gray-800 border-none font-medium text-sm focus:ring-2 ring-brand-400"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>

              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 font-semibold",
                      isActive(link.path)
                        ? "bg-brand-50 dark:bg-brand-950/30 text-brand-600"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </div>

              {!user && (
                <div className="mt-8">
                  <Button
                    variant="primary"
                    className="w-full h-14 rounded-2xl"
                    onClick={() => { navigate("/auth"); setMobileOpen(false); }}
                  >
                    Sign In to Account
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
