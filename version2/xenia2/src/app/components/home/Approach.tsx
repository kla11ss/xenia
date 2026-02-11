import React from "react";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Диагностика",
    description: "Первая встреча начинается с подробного сбора анамнеза и анализа состояния вашей кожи. Мы обсуждаем ваши пожелания и исключаем противопоказания."
  },
  {
    number: "02",
    title: "План лечения",
    description: "Я составляю индивидуальную стратегию ("дорожную карту") процедур, которая учитывает ваш образ жизни, бюджет и желаемые сроки достижения результата."
  },
  {
    number: "03",
    title: "Бережная процедура",
    description: "Все манипуляции проводятся в стерильных условиях клиники, с использованием сертифицированных препаратов. Максимальный комфорт и минимум боли."
  },
  {
    number: "04",
    title: "Домашний уход",
    description: "Эффект от процедур зависит от ежедневной рутины. Я подбираю средства для домашнего ухода, которые продлевают и усиливают результат."
  },
  {
    number: "05",
    title: "Сопровождение",
    description: "Я остаюсь на связи после процедуры, контролирую процесс реабилитации и приглашаю на осмотр для оценки результата."
  }
];

export function Approach() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Sticky Media Side */}
          <div className="lg:w-1/2 relative">
             <div className="sticky top-24 h-[500px] rounded-2xl overflow-hidden shadow-xl">
               <img 
                 src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80" 
                 alt="Doctor consultation" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
               <div className="absolute bottom-8 left-8 right-8 text-white p-6 bg-primary/90 backdrop-blur-sm rounded-xl">
                  <h3 className="font-serif text-2xl mb-2">Медицинский подход</h3>
                  <p className="text-white/80">
                    Не просто "сделать губы", а гармонизировать черты лица и улучшить качество жизни.
                  </p>
               </div>
             </div>
          </div>

          {/* Scrolling Text Side */}
          <div className="lg:w-1/2 flex flex-col justify-center space-y-12 py-8">
            <div className="mb-8">
               <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Как мы работаем</h2>
               <p className="text-gray-600 text-lg">
                 5 шагов к прогнозируемому результату. Моя задача — сделать ваш путь к красоте понятным и безопасным.
               </p>
            </div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={index} 
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full border border-primary/30 text-primary font-serif text-xl">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
