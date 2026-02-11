import React from "react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-accent/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32 flex flex-col md:flex-row items-center gap-12">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-8 z-10"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Врач-дерматовенеролог, косметолог
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-[1.1]">
              Естественная красота <br/>
              <span className="text-primary italic">под контролем врача</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
              Персональная стратегия ухода и омоложения. Без лишних процедур, с акцентом на здоровье и безопасность.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 rounded-full">
                Записаться на прием
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-8 rounded-full bg-transparent border-primary/20 hover:bg-primary/5">
                Выбрать услугу
              </Button>
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap gap-6 text-sm text-gray-500">
             <div className="flex items-center gap-2">
               <CheckCircle2 size={16} className="text-primary" />
               <span>Медицинская лицензия</span>
             </div>
             <div className="flex items-center gap-2">
               <CheckCircle2 size={16} className="text-primary" />
               <span>Опыт более 10 лет</span>
             </div>
             <div className="flex items-center gap-2">
               <CheckCircle2 size={16} className="text-primary" />
               <span>Премиальные препараты</span>
             </div>
          </div>
        </motion.div>

        {/* Image Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 aspect-[4/5] md:aspect-square lg:aspect-[4/3] max-w-xl mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=1080&auto=format&fit=crop&q=80" 
              alt="Dr. Xenia Barinova" 
              className="w-full h-full object-cover object-center"
            />
            {/* Decorative Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent mix-blend-multiply pointer-events-none"></div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-50 z-0"></div>
          <div className="absolute -top-6 -left-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-50 z-0"></div>
        </motion.div>
      </div>
    </section>
  );
}
