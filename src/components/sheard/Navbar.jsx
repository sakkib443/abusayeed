"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BiMenu, BiX } from "react-icons/bi";
import {
  LuSearch, LuChevronDown, LuLogOut, LuLayoutDashboard,
  LuShoppingCart, LuMoon, LuSun, LuUser, LuSettings,
} from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "@/redux/categorySlice";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { items = [] } = useSelector((state) => state.cart || {});
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    dispatch(fetchCategories());
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    return () => window.removeEventListener("scroll", onScroll);
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsMobileMenuOpen(false);
    router.replace("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setIsSearchOpen(false);
    router.push(`/courses?search=${encodeURIComponent(q)}`);
  };

  const navLinks = [
    { href: "/", label: t("navbar.home") },
    { href: "/courses", label: t("navbar.courses") },
    { href: "/design-template", label: language === "bn" ? "ডিজাইন" : "Design" },
    { href: "/portfolio", label: language === "bn" ? "পোর্টফোলিও" : "Portfolio" },
    { href: "/blog", label: language === "bn" ? "ব্লগ" : "Blog" },
    { href: "/contact", label: t("navbar.contact") },
  ];

  if (!mounted) return null;
  const isDark = theme === "dark";
  const bn = language === "bn" ? "hind-siliguri" : "";

  const iconBtn = `w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
    isDark ? "text-gray-300 hover:bg-white/10" : "text-slate-600 hover:bg-gray-100"
  }`;

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`w-full border-b transition-shadow duration-300 ${
          isDark ? "bg-[#0a0a0a] border-white/5" : "bg-white border-gray-100"
        } ${isScrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.07)]" : ""}`}
      >
        <div className="container mx-auto px-6">
          <div className="h-[68px] flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo size="normal" />
            </div>

            {/* Center — nav links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative text-[14px] font-medium tracking-wide transition-colors ${bn} ${
                      active
                        ? "text-[#0182E6]"
                        : isDark
                        ? "text-gray-300 hover:text-white"
                        : "text-slate-700 hover:text-[#0182E6]"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute left-0 -bottom-1.5 h-[2px] bg-[#0182E6] transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right — actions */}
            <div className="flex items-center gap-1.5">
              <button onClick={() => setIsSearchOpen((v) => !v)} aria-label="Search" className={iconBtn}>
                <LuSearch size={19} />
              </button>

              {/* Language segmented toggle */}
              <div className={`hidden sm:flex items-center rounded-lg p-0.5 text-[12px] font-bold ${isDark ? "bg-white/5" : "bg-gray-100"}`}>
                {[
                  { code: "en", label: "EN" },
                  { code: "bn", label: "বাং" },
                ].map((lng) => (
                  <button
                    key={lng.code}
                    onClick={() => setLanguage(lng.code)}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      language === lng.code ? "bg-[#0182E6] text-white" : isDark ? "text-gray-400" : "text-slate-500"
                    }`}
                  >
                    {lng.label}
                  </button>
                ))}
              </div>

              <button onClick={toggleTheme} aria-label="Toggle theme" className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isDark ? "text-yellow-400 hover:bg-white/10" : "text-slate-600 hover:bg-gray-100"}`}>
                {isDark ? <LuSun size={19} /> : <LuMoon size={19} />}
              </button>

              <Link href="/cart" aria-label="Cart" className={`relative ${iconBtn}`}>
                <LuShoppingCart size={19} />
                {items.length > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#F78F18] text-white text-[10px] font-bold flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative ml-1">
                  <button
                    onClick={() => setIsProfileOpen((v) => !v)}
                    className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-2 border-transparent hover:border-[#0182E6] transition-colors"
                    aria-label="Account"
                  >
                    {user.image ? (
                      <img src={user.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <LuUser className="text-gray-500" size={18} />
                    )}
                  </button>
                  <AnimatePresence>
                    {isProfileOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          className={`absolute right-0 top-full mt-3 w-56 rounded-xl border shadow-xl overflow-hidden p-2 z-20 ${isDark ? "bg-[#111] border-white/10" : "bg-white border-gray-100"}`}
                        >
                          <div className={`px-3 py-2.5 mb-1 rounded-lg ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{language === "bn" ? "লগইন করা" : "Signed in"}</p>
                            <p className={`text-sm font-semibold truncate ${isDark ? "text-gray-200" : "text-slate-800"}`}>{user.name}</p>
                          </div>
                          <Link
                            href={user.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                            onClick={() => setIsProfileOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${isDark ? "text-gray-300 hover:bg-white/5" : "text-slate-600 hover:bg-gray-50"}`}
                          >
                            <LuLayoutDashboard size={17} className="text-[#0182E6]" /> {language === "bn" ? "ড্যাশবোর্ড" : "Dashboard"}
                          </Link>
                          <Link
                            href="/settings"
                            onClick={() => setIsProfileOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${isDark ? "text-gray-300 hover:bg-white/5" : "text-slate-600 hover:bg-gray-50"}`}
                          >
                            <LuSettings size={17} className="text-[#0182E6]" /> {language === "bn" ? "সেটিংস" : "Settings"}
                          </Link>
                          <div className={`h-px my-1.5 ${isDark ? "bg-white/10" : "bg-gray-100"}`} />
                          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                            <LuLogOut size={17} /> {language === "bn" ? "লগ আউট" : "Log out"}
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`hidden sm:inline-flex ml-1.5 px-5 py-2.5 rounded-lg bg-[#0182E6] text-white text-[13px] font-semibold hover:bg-[#0065c5] transition-colors ${bn}`}
                >
                  {language === "bn" ? "লগইন" : "Login"}
                </Link>
              )}

              <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Menu" className={`lg:hidden ${iconBtn}`}>
                <BiMenu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Search reveal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`overflow-hidden border-t ${isDark ? "border-white/5 bg-[#0a0a0a]" : "border-gray-100 bg-white"}`}
            >
              <form onSubmit={handleSearch} className="container mx-auto px-6 py-3 flex items-center gap-3">
                <LuSearch size={20} className={isDark ? "text-gray-500" : "text-gray-400"} />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === "bn" ? "কোর্স বা টেমপ্লেট খুঁজুন..." : "Search courses & templates..."}
                  className={`flex-1 bg-transparent outline-none text-sm ${isDark ? "text-white placeholder-gray-500" : "text-slate-700 placeholder-gray-400"} ${bn}`}
                />
                <button type="button" onClick={() => setIsSearchOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <BiX size={22} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-[60]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={`fixed top-0 right-0 h-full w-[300px] z-[70] flex flex-col ${isDark ? "bg-[#0a0a0a]" : "bg-white"}`}
            >
              <div className={`h-[68px] px-5 flex items-center justify-between border-b ${isDark ? "border-white/5" : "border-gray-100"}`}>
                <Logo size="small" />
                <button onClick={() => setIsMobileMenuOpen(false)} className={iconBtn}>
                  <BiX size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${bn} ${
                      pathname === link.href
                        ? "bg-[#0182E6] text-white"
                        : isDark
                        ? "text-gray-300 hover:bg-white/5"
                        : "text-slate-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                    <LuChevronDown className="-rotate-90 opacity-40" size={18} />
                  </Link>
                ))}
              </div>

              <div className={`p-4 border-t space-y-3 ${isDark ? "border-white/5" : "border-gray-100"}`}>
                <div className={`flex items-center rounded-lg p-1 ${isDark ? "bg-white/5" : "bg-gray-100"}`}>
                  {[
                    { code: "en", label: "English" },
                    { code: "bn", label: "বাংলা" },
                  ].map((lng) => (
                    <button
                      key={lng.code}
                      onClick={() => setLanguage(lng.code)}
                      className={`flex-1 py-2 rounded-md text-sm font-bold transition-colors ${
                        language === lng.code ? "bg-[#0182E6] text-white" : isDark ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      {lng.label}
                    </button>
                  ))}
                </div>
                {user ? (
                  <button onClick={handleLogout} className="w-full py-3 rounded-lg bg-red-500 text-white font-semibold">
                    {language === "bn" ? "লগ আউট" : "Log out"}
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-3 rounded-lg bg-[#0182E6] text-white text-center font-semibold"
                  >
                    {language === "bn" ? "লগইন" : "Login"}
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
