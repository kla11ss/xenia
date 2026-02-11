import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../../lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  className?: string;
  delay?: number;
}

const ServiceCard = ({ title, description, image, className, delay = 0 }: ServiceCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={cn(
      "group relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-md transition-all duration-300 aspect-square md:aspect-auto",
      className
    )}
  >
    <Link to="/services" className="block w-full h-full">
      <img 
        src={image} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />
      
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-xl font-serif font-medium text-white mb-2">{title}</h3>
            <p className="text-sm text-white/80 line-clamp-2">{description}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

export function ServicesBento() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Направления работы</h2>
          <p className="text-gray-600">
            Комплексный подход к красоте: от базового ухода до высокотехнологичных методик омоложения.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px]">
          {/* Main Large Card */}
          <ServiceCard 
            title="Инъекционная косметология"
            description="Ботулинотерапия, контурная пластика, биоревитализация. Восстановление объемов и работа с качеством кожи."
            image="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80"
            className="md:col-span-2 md:row-span-2"
          />
          
          <ServiceCard 
            title="Аппаратные методики"
            description="SMAS-лифтинг, лазерная шлифовка, фотоомоложение."
            image="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80"
            delay={0.1}
          />
          
          <ServiceCard 
            title="Лечение кожи"
            description="Терапия акне, розацеа, пигментации. Дерматологический подход."
            image="https://images.unsplash.com/photo-1596704017254-9b1b1f9e86f5?w=800&auto=format&fit=crop&q=80"
            delay={0.2}
          />

          <ServiceCard 
            title="Эстетический уход"
            description="Чистки, пилинги и профессиональные уходовые программы."
            image="https://images.unsplash.com/photo-1618331835717-801e976710b2?w=800&auto=format&fit=crop&q=80"
            className="md:col-span-3 lg:col-span-1"
            delay={0.3}
          />
        </div>
        
        <div className="mt-12 text-center">
           <Link to="/services">
             <Button variant="outline" className="rounded-full px-8">Все услуги и цены</Button>
           </Link>
        </div>
      </div>
    </section>
  );
}
