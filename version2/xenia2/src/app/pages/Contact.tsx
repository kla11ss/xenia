import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Input, Textarea } from "../components/ui/Input";
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get("service") || "";
  
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-primary/5 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
           <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Контакты</h1>
           <p className="text-gray-600 max-w-xl mx-auto">
             Запишитесь на прием через форму ниже или свяжитесь со мной любым удобным способом.
           </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Contact Info */}
          <div className="lg:w-5/12 space-y-12">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">Клиника Skin</h2>
              <div className="space-y-6 text-gray-600">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Адрес</p>
                    <p>г. Нижний Новгород,<br/>ул. Ульянова, 10А</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Телефон</p>
                    <a href="tel:+79991234567" className="hover:text-primary transition-colors">+7 (999) 123-45-67</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">График работы</p>
                    <p>Пн - Пт: 09:00 - 20:00</p>
                    <p>Сб: 10:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">Социальные сети</h2>
              <div className="flex gap-4">
                <a href="#" className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                   <Instagram size={20} />
                   <span className="font-medium">Instagram</span>
                </a>
                <a href="#" className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                   <Mail size={20} />
                   <span className="font-medium">Email</span>
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-gray-100 rounded-2xl overflow-hidden relative">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2220.573167107147!2d44.0042!3d56.3269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTbCsDE5JzM2LjgiTiA0NMKwMDAnMTUuMSJF!5e0!3m2!1sen!2sru!4v1620000000000!5m2!1sen!2sru" 
                 width="100%" 
                 height="100%" 
                 style={{border:0}} 
                 allowFullScreen 
                 loading="lazy"
                 title="Map"
               ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-6/12">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
               {/* Decorative bg */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

               <h2 className="text-2xl font-serif font-bold mb-2 relative z-10">Онлайн запись</h2>
               <p className="text-gray-600 mb-8 relative z-10">
                 Оставьте заявку, и администратор клиники свяжется с вами для подтверждения времени.
               </p>

               {/* We will replace this with the real form later */}
               <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Имя</label>
                      <Input placeholder="Ваше имя" required />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-medium text-gray-700">Телефон</label>
                       <Input placeholder="+7 (___) ___-__-__" required type="tel" />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-medium text-gray-700">Желаемая процедура</label>
                     <Input defaultValue={serviceParam} placeholder="Например, консультация" />
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-medium text-gray-700">Комментарий</label>
                     <Textarea placeholder="Удобное время, вопросы..." rows={4} />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Отправить заявку
                  </Button>
                  
                  <p className="text-xs text-center text-gray-500 mt-4">
                    Нажимая кнопку, вы даете согласие на обработку персональных данных.
                  </p>
               </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
