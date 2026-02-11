import React from "react";
import { Link } from "react-router-dom";
import { Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl font-bold mb-2">Dr. Xenia Barinova</h3>
            <p className="text-white/80 text-sm mb-6">
              Врачебный подход к эстетике и здоровью вашей кожи. Естественный результат и безопасность.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Phone size={18} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Навигация</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li><Link to="/" className="hover:text-white transition-colors">Главная</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Услуги</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">О враче</Link></li>
              <li><Link to="/results" className="hover:text-white transition-colors">До / После</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Контакты</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex gap-3 items-start">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <span>г. Нижний Новгород,<br />ул. Ульянова, 10А (Клиника Skin)</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="shrink-0" />
                <a href="tel:+79991234567" className="hover:text-white transition-colors">+7 (999) 123-45-67</a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="shrink-0" />
                <a href="mailto:info@drbarinova.ru" className="hover:text-white transition-colors">info@drbarinova.ru</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">График работы</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex gap-3 items-start">
                <Clock size={18} className="shrink-0 mt-0.5" />
                <div>
                  <p>Пн - Пт: 09:00 - 20:00</p>
                  <p>Сб: 10:00 - 18:00</p>
                  <p>Вс: Выходной</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Dr. Xenia Barinova. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Договор оферты</a>
          </div>
        </div>
        
        <div className="mt-4 text-[10px] text-white/40 text-center md:text-left">
          ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ. НЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА.
        </div>
      </div>
    </footer>
  );
}
