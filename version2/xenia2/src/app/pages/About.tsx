import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-24 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            
            <div className="w-full md:w-1/2 lg:w-5/12">
               <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4]">
                 <img 
                    src="https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=1080&auto=format&fit=crop&q=80" 
                    alt="Ксения Баринова" 
                    className="w-full h-full object-cover"
                 />
               </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-6/12 pt-8">
               <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                 Др. Ксения Баринова
               </h1>
               <div className="inline-block bg-secondary/30 px-4 py-2 rounded-full text-secondary-foreground font-medium mb-8">
                 Врач-дерматовенеролог, косметолог
               </div>
               
               <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                 <p>
                   Я верю, что современная косметология — это не про изменение внешности, а про раскрытие вашего природного потенциала. Моя цель как врача — сохранить вашу индивидуальность, сделав лицо более свежим, отдохнувшим и гармоничным.
                 </p>
                 <p>
                   В своей практике я руководствуюсь принципом "не навреди". Я никогда не назначу процедуру, которая вам не нужна или может дать неестественный результат. Мы работаем с качеством кожи, восполняем дефициты и занимаемся профилактикой старения.
                 </p>
                 <p>
                   Постоянное обучение — часть моей работы. Я регулярно посещаю международные конгрессы и стажировки, чтобы приносить в Нижний Новгород лучшие мировые методики.
                 </p>
               </div>

               <div className="mt-12 flex gap-4">
                 <Link to="/contact">
                    <Button size="lg">Записаться на прием</Button>
                 </Link>
                 <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    <Button variant="outline" size="lg">Instagram</Button>
                 </a>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certificates */}
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-4 md:px-6">
           <h2 className="text-3xl font-serif font-bold mb-12 text-center">Образование и квалификация</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-primary">Базовое образование</h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></span>
                    <span>ПИМУ (Приволжский исследовательский медицинский университет) — Лечебное дело</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></span>
                    <span>Ординатура по специальности "Дерматовенерология"</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></span>
                    <span>Профессиональная переподготовка "Косметология" (576 часов)</span>
                  </li>
                </ul>
             </div>

             <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-primary">Повышение квалификации</h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></span>
                    <span>Анатомический диссекционный курс (Cadaver-курс)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></span>
                    <span>Применение ботулотоксина типа А (Disport, Xeomin, Miotox)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></span>
                    <span>Контурная пластика губ (техники: веерная, парижская, плоский бант)</span>
                  </li>
                </ul>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
