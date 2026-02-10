"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BiMenu, BiX, BiSearch } from "react-icons/bi";
import {
  LuChevronDown, LuLogOut, LuLayoutDashboard, LuShoppingCart, LuMoon, LuSun, LuUser, LuSettings, LuLanguages
} from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "@/redux/categorySlice";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import CategoryNav from "./CategoryNav";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({ id: 'all', en: 'All', bn: 'সব' });
  const [searchQuery, setSearchQuery] = useState("");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { items = [] } = useSelector((state) => state.cart || {});
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const { items: categories = [] } = useSelector((state) => state.categories || {});

  useEffect(() => {
    setMounted(true);
    dispatch(fetchCategories());
    const handleScroll = () => setIsSticky(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsMobileMenuOpen(false);
    router.replace("/login");
  };

  const navLinks = [
    { href: "/", label: t("navbar.home") },
    { href: "/courses", label: t("navbar.courses") },
    { href: "/design-template", label: "Design" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: t("navbar.about") },
    { href: "/contact", label: t("navbar.contact") },
  ];

  if (!mounted) return null;

  const isDark = theme === 'dark';
  const primaryColor = "#003ECB";

  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) setIsCategoryOpen(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) setIsCategoryOpen(false);
  };

  const handleCategoryToggle = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: isSticky
            ? (isDark ? "rgba(10, 10, 10, 0.9)" : "rgba(255, 255, 255, 0.9)")
            : (isDark ? "transparent" : "transparent"),
          height: isSticky ? "70px" : "90px",
          backdropFilter: isSticky ? "blur(20px)" : "none",
          boxShadow: isSticky
            ? (isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.05)")
            : "none",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <div className="container mx-auto h-full px-6 flex items-center justify-between gap-8">

          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Logo color={isDark ? "#ffffff" : primaryColor} size={isSticky ? "small" : "normal"} align="left" />
          </div>

          {/* Center: Search Bar (Premium Style) */}
          <div className="hidden lg:flex flex-1 max-w-xl group">
            <div className={`relative w-full flex items-center transition-all duration-300 rounded-lg border focus-within:ring-2 focus-within:ring-[#003ECB]/10 ${isDark
              ? "bg-white/5 border-white/10 hover:border-white/20 focus-within:border-[#003ECB]/50 focus-within:bg-white/10"
              : "bg-gray-50 border-gray-200 hover:border-gray-300 focus-within:border-[#003ECB] focus-within:bg-white focus-within:shadow-sm"
              }`}>

              {/* Category Dropdown */}
              <div
                className="relative h-full"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={handleCategoryToggle}
                  className={`flex items-center gap-2 px-4 h-full border-r text-[13px] font-medium transition-colors whitespace-nowrap ${isDark ? "border-white/10 text-gray-400 hover:text-white" : "border-gray-200 text-gray-500 hover:text-[#003ECB]"}`}
                >
                  <LuLayoutDashboard size={16} />
                  <span>{language === 'bn' ? (selectedCategory.name_bn || selectedCategory.bn) : (selectedCategory.name_en || selectedCategory.en)}</span>
                  <LuChevronDown size={14} className={`transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isCategoryOpen && (
                    <>
                      {/* Mobile Backdrop */}
                      <div className="fixed inset-0 z-10 lg:hidden" onClick={() => setIsCategoryOpen(false)} />

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute top-full left-0 mt-2 w-72 max-h-[450px] overflow-y-auto rounded-xl border p-3 z-20 shadow-2xl scrollbar-hide ${isDark ? "bg-[#111] border-white/10" : "bg-white border-gray-100"}`}
                      >
                        {/* Static All Categories Option */}
                        <button
                          onClick={() => {
                            setSelectedCategory({ id: 'all', en: 'All Categories', bn: 'সব ক্যাটাগরি' });
                            setIsCategoryOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all mb-1 ${selectedCategory.id === 'all'
                            ? (isDark ? "bg-[#003ECB] text-white" : "bg-gray-100 text-[#003ECB]")
                            : (isDark ? "text-gray-400 hover:bg-white/5 hover:text-white" : "text-gray-600 hover:bg-gray-50 hover:text-[#003ECB]")
                            }`}
                        >
                          {language === 'bn' ? 'সব ক্যাটাগরি' : 'All Categories'}
                        </button>

                        <div className={`h-[1px] my-2 ${isDark ? "bg-white/5" : "bg-gray-100"}`} />

                        {/* Dynamic Backend Categories */}
                        {categories?.map((cat) => (
                          <div key={cat._id} className="mb-2">
                            <button
                              onClick={() => {
                                setSelectedCategory(cat);
                                setIsCategoryOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-between group ${selectedCategory._id === cat._id
                                ? (isDark ? "text-[#003ECB]" : "text-[#003ECB]")
                                : (isDark ? "text-gray-300 hover:bg-white/5" : "text-gray-700 hover:bg-gray-50")
                                }`}
                            >
                              <span>{language === 'bn' ? cat.name_bn : cat.name_en}</span>
                            </button>

                            {/* Subcategories (Child Categories) */}
                            {cat.subCategories?.length > 0 && (
                              <div className="mt-1 ml-4 pl-3 border-l-2 border-[#003ECB]/10 space-y-1">
                                {cat.subCategories.map((sub) => (
                                  <button
                                    key={sub._id}
                                    onClick={() => {
                                      setSelectedCategory(sub);
                                      setIsCategoryOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-1.5 rounded-md text-[13px] transition-all ${selectedCategory._id === sub._id
                                      ? "text-[#003ECB] bg-[#003ECB]/5 font-medium"
                                      : (isDark ? "text-gray-500 hover:text-white" : "text-gray-500 hover:text-[#003ECB]")
                                      }`}
                                  >
                                    {language === 'bn' ? sub.name_bn : sub.name_en}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-1 items-center">
                <BiSearch className={`ml-3 text-lg ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                <input
                  type="text"
                  placeholder={language === 'bn' ? "কোর্স বা টেমপ্লেট খুঁজুন..." : "Search courses & templates..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full py-2.5 px-3 bg-transparent outline-none text-sm ${isDark ? "text-white placeholder-gray-500" : "text-gray-700 placeholder-gray-400"
                    }`}
                />
              </div>

              <div className={`mr-2 px-1.5 py-0.5 rounded text-[9px] font-medium ${isDark ? "bg-white/10 text-gray-400" : "bg-gray-100 text-gray-400"}`}>
                ⌘K
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">

            {/* Nav Links - Desktop */}
            <div className="hidden xl:flex items-center gap-6 mr-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-body font-medium tracking-wide transition-all hover:text-[#003ECB] relative group ${pathname === link.href
                    ? "text-[#003ECB]"
                    : (isDark ? "text-gray-300" : "text-gray-900")
                    }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#003ECB] transition-all duration-300 ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 ${isDark ? "bg-white/5 text-yellow-400 border border-white/10" : "bg-gray-100 text-gray-600 border border-transparent"
                  }`}
              >
                {isDark ? <LuSun size={20} /> : <LuMoon size={20} />}
              </button>

              {/* Language Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => window.innerWidth >= 1024 && setIsLangDropdownOpen(true)}
                onMouseLeave={() => window.innerWidth >= 1024 && setIsLangDropdownOpen(false)}
              >
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className={`h-10 px-4 rounded-xl text-[13px] font-bold border transition-all flex items-center gap-2 hover:scale-105 hover:border-[#003ECB] hover:text-[#003ECB] ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-gray-100 border-transparent text-gray-700"
                    }`}
                >
                  <LuLanguages size={18} />
                  <span>{language === 'en' ? 'English' : 'বাংলা'}</span>
                  <LuChevronDown size={14} className={`transition-transform duration-200 ${isLangDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isLangDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10 lg:hidden" onClick={() => setIsLangDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`absolute top-full right-0 mt-2 w-32 rounded-xl border p-2 z-20 shadow-2xl ${isDark ? "bg-[#111] border-white/10" : "bg-white border-gray-100"}`}
                      >
                        <button
                          onClick={() => {
                            setLanguage('en');
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all mb-1 ${language === 'en'
                            ? (isDark ? "bg-[#003ECB] text-white" : "bg-gray-100 text-[#003ECB]")
                            : (isDark ? "text-gray-400 hover:bg-white/5 hover:text-white" : "text-gray-600 hover:bg-gray-50 hover:text-[#003ECB]")
                            }`}
                        >
                          English
                        </button>
                        <button
                          onClick={() => {
                            setLanguage('bn');
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${language === 'bn'
                            ? (isDark ? "bg-[#003ECB] text-white" : "bg-gray-100 text-[#003ECB]")
                            : (isDark ? "text-gray-400 hover:bg-white/5 hover:text-white" : "text-gray-600 hover:bg-gray-50 hover:text-[#003ECB]")
                            }`}
                        >
                          বাংলা
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <Link href="/cart" className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 ${isDark ? "bg-white/5 text-gray-300 border border-white/10" : "bg-gray-100 text-gray-600 border border-transparent"
                }`}>
                <LuShoppingCart size={20} />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#003ECB] text-white text-[10px] font-bold flex items-center justify-center shadow-lg shadow-[#003ECB]/20">
                    {items.length}
                  </span>
                )}
              </Link>

              {/* User / Login */}
              <div className="ml-2">
                {user ? (
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 p-0.5 rounded-full border-2 border-transparent hover:border-[#003ECB] transition-all"
                  >
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {user.image ? (
                        <img src={user.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <LuUser className="text-gray-500" size={20} />
                      )}
                    </div>
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="hidden sm:flex px-6 py-2.5 rounded-xl bg-[#003ECB] text-white text-sm font-bold hover:bg-[#002da3] hover:shadow-lg hover:shadow-[#003ECB]/20 transition-all active:scale-95"
                  >
                    Login
                  </Link>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-white/5"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <BiMenu className={`text-2xl ${isDark ? "text-white" : "text-gray-800"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Improved Dropdown */}
        <AnimatePresence>
          {isProfileDropdownOpen && user && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className={`absolute right-6 top-full mt-4 w-60 rounded-2xl shadow-2xl border overflow-hidden p-2 ${isDark ? "bg-[#1a1a1a] border-white/10" : "bg-white border-black/5"
                }`}
            >
              <div className="px-4 py-3 mb-2 rounded-xl bg-gray-50 dark:bg-white/5">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Authenticated</p>
                <p className={`text-sm font-bold truncate ${isDark ? "text-gray-200" : "text-gray-800"}`}>{user.name}</p>
              </div>
              <Link
                href={user.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors ${isDark ? "text-gray-300 hover:bg-white/5" : "text-gray-600 hover:bg-gray-100"
                  }`}
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <LuLayoutDashboard size={18} className="text-[#003ECB]" />
                Dashboard
              </Link>
              <Link
                href="/settings"
                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors ${isDark ? "text-gray-300 hover:bg-white/5" : "text-gray-600 hover:bg-gray-100"
                  }`}
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <LuSettings size={18} className="text-[#003ECB]" />
                Settings
              </Link>
              <div className="h-[1px] bg-black/5 dark:bg-white/10 my-2" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
              >
                <LuLogOut size={18} />
                Log Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-[60] backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className={`fixed top-0 right-0 h-full w-[320px] z-[70] shadow-2xl flex flex-col ${isDark ? "bg-[#0a0a0a]" : "bg-white"
                  }`}
              >
                <div className="p-6 flex items-center justify-between border-b border-black/5 dark:border-white/5">
                  <Logo color={isDark ? "#ffffff" : primaryColor} size="small" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/5"
                  >
                    <BiX size={28} className={isDark ? "text-white" : "text-gray-800"} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-2">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-3 mb-2">Navigation</p>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-lg font-body font-semibold p-4 rounded-2xl flex items-center justify-between group transition-all ${pathname === link.href
                        ? "bg-[#003ECB] text-white shadow-lg shadow-[#003ECB]/30"
                        : (isDark ? "text-gray-300 hover:bg-white/5" : "text-gray-700 hover:bg-gray-50")
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                      <LuChevronDown className="-rotate-90 opacity-50 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>

                <div className="p-6 border-t border-black/5 dark:border-white/5 space-y-4">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="w-full py-4 rounded-2xl bg-red-500 text-white font-bold shadow-lg shadow-red-500/20"
                    >
                      SIGN OUT
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="block w-full py-4 rounded-2xl bg-[#003ECB] text-white text-center font-bold shadow-lg shadow-[#003ECB]/30"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      GET STARTED
                    </Link>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Category Navigation Bar - Outside main nav */}
      {!isMobileMenuOpen && <CategoryNav />}

      {/* Spacer - Adjusted for Navbar + CategoryNav */}
      <div className={`${isSticky ? "h-[75px]" : "h-[80px]"} transition-all duration-300`} />
    </>
  );
};

export default Navbar;
