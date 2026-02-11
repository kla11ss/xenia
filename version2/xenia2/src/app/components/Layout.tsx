import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "./ui/button"
import { Menu, X, Instagram, Phone, MapPin, Mail } from "lucide-react"
import { Link, useLocation } from "react-router"

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const location = useLocation()

  React.useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navLinks = [
    { name: "Услуги", href: "/services" },
    { name: "О враче", href: "/about" },
    { name: "Результаты", href: "/results" },
    { name: "Контакты", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-start z-50">
          <span className="text-xl font-medium tracking-tight text-slate-900">
            DR. XENIA BARINOVA
          </span>
          <span className="text-xs tracking-wider text-slate-500 uppercase">
            Косметология • Дерматология
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#BFA16F]",
                location.pathname === link.href
                  ? "text-[#BFA16F]"
                  : "text-slate-600"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild variant="premium" size="default" className="ml-4">
            <Link to="/contact">Записаться</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 p-2 text-slate-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Nav Overlay */}
        <div
          className={cn(
            "fixed inset-0 z-40 flex flex-col bg-white pt-24 px-6 transition-transform duration-300 ease-in-out md:hidden",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col gap-6 text-lg font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="border-b border-slate-100 pb-4 text-slate-900"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-4 flex items-center justify-center rounded-full bg-[#BFA16F] py-4 text-white shadow-md active:scale-95 transition-transform"
            >
              Записаться на прием
            </Link>
          </div>
          
          <div className="mt-auto mb-10 flex flex-col gap-4 text-sm text-slate-500">
             <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>г. Нижний Новгород, ул. Семашко, 17</span>
             </div>
             <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+7 (999) 000-00-00</span>
             </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
             <Link to="/" className="block mb-4">
              <span className="text-lg font-medium tracking-tight text-slate-900">
                DR. XENIA BARINOVA
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Современная косметология с медицинским подходом. Естественность, безопасность и индивидуальный план лечения для каждого пациента.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white rounded-full border border-slate-200 text-slate-600 hover:text-[#BFA16F] transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-slate-200 text-slate-600 hover:text-[#BFA16F] transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-slate-900 mb-6">Навигация</h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-600">
              <li><Link to="/" className="hover:text-[#BFA16F] transition-colors">Главная</Link></li>
              <li><Link to="/services" className="hover:text-[#BFA16F] transition-colors">Услуги</Link></li>
              <li><Link to="/about" className="hover:text-[#BFA16F] transition-colors">О враче</Link></li>
              <li><Link to="/results" className="hover:text-[#BFA16F] transition-colors">Результаты</Link></li>
              <li><Link to="/contact" className="hover:text-[#BFA16F] transition-colors">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-slate-900 mb-6">Услуги</h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-600">
              <li><Link to="/services" className="hover:text-[#BFA16F] transition-colors">Инъекционная косметология</Link></li>
              <li><Link to="/services" className="hover:text-[#BFA16F] transition-colors">Аппаратные методики</Link></li>
              <li><Link to="/services" className="hover:text-[#BFA16F] transition-colors">Лечение акне</Link></li>
              <li><Link to="/services" className="hover:text-[#BFA16F] transition-colors">Уходовые процедуры</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-slate-900 mb-6">Контакты</h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-[#BFA16F]" />
                <span>г. Нижний Новгород, ул. Семашко, 17<br/>Клиника Skin</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-[#BFA16F]" />
                <span>+7 (999) 000-00-00</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-[#BFA16F] animate-pulse" />
                <span>Пн-Сб: 09:00 - 20:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Dr. Xenia Barinova. Все права защищены.</p>
          <div className="text-center md:text-right max-w-md">
            <p className="mb-2">ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ. НЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА.</p>
            <p>Информация на сайте не является публичной офертой.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
