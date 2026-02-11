import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, Phone, MapPin } from "lucide-react";
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../../lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Главная", path: "/" },
    { name: "Услуги", path: "/services" },
    { name: "О враче", path: "/about" },
    { name: "Результаты", path: "/results" },
    { name: "Контакты", path: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex flex-col">
          <span className="font-serif text-xl md:text-2xl font-bold text-primary tracking-tight">
            Dr. Xenia Barinova
          </span>
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">
            Косметология • Дерматология
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.path ? "text-primary" : "text-gray-600"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact">
            <Button size="sm" variant="primary">Записаться</Button>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link to="/contact" className="w-full">
                  <Button className="w-full">Записаться на прием</Button>
                </Link>
              </div>
              
              <div className="flex gap-4 mt-4 text-gray-500 justify-center">
                 <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                    <Instagram size={20} />
                 </a>
                 <a href="tel:+70000000000" className="hover:text-primary transition-colors">
                    <Phone size={20} />
                 </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
