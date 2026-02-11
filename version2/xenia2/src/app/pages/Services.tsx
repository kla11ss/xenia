import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

type Category = "all" | "injections" | "devices" | "care" | "treatment";

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "Все услуги" },
  { id: "injections", label: "Инъекции" },
  { id: "devices", label: "Аппаратные" },
  { id: "care", label: "Уход" },
  { id: "treatment", label: "Лечение" },
];

const services = [
  {
    id: 1,
    title: "Ботулинотерапия",
    price: "от 350 ₽ / ед.",
    description: "Коррекция мимических морщин препаратами Диспорт, Ксеомин, Миоток. Разглаживание лба, межбровья, 'гусиных лапок'.",
    category: "injections",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Контурная пластика губ",
    price: "от 15 000 ₽",
    description: "Аугментация губ филлерами на основ�� гиалуроновой кислоты. Естественный объем, увлажнение, исправление асимметрии.",
    category: "injections",
    image: "https://images.unsplash.com/photo-1588510906234-2b6355325881?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Биоревитализация",
    price: "от 8 000 ₽",
    description: "Глубокое увлажнение кожи инъекциями гиалуроновой кислоты. Улучшение цвета лица, тургора, сияние кожи.",
    category: "injections",
    image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    title: "SMAS-лифтинг (Ultraformer)",
    price: "от 25 000 ₽",
    description: "Безоперационная подтяжка лица сфокусированным ультразвуком. Четкий овал, уменьшение брылей и второго подбородка.",
    category: "devices",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    title: "Фотоомоложение (BBL/IPL)",
    price: "от 7 000 ₽",
    description: "Удаление пигментации, сосудистой сетки (купероза), лечение розацеа. Выравнивание тона кожи.",
    category: "devices",
    image: "https://images.unsplash.com/photo-1596704017254-9b1b1f9e86f5?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    title: "Чистка лица (Comodex)",
    price: "4 500 ₽",
    description: "Атравматичная чистка лица на косметике Christina. Глубокое очищение пор, снятие воспалений.",
    category: "care",
    image: "https://images.unsplash.com/photo-1576091160550-2187d80aeff2?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 7,
    title: "Пилинг BioRePeel",
    price: "5 000 ₽",
    description: "Двухфазный пилинг с биостимулирующим эффектом. Без сильного шелушения и реабилитации.",
    category: "care",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 8,
    title: "Лечение акне (консультация)",
    price: "3 000 ₽",
    description: "Разбор анализов, назначение наружной и системной терапии (ретиноиды). Ведение пациента до ремиссии.",
    category: "treatment",
    image: "https://images.unsplash.com/photo-1555547908-16e7884d521d?w=600&auto=format&fit=crop&q=60"
  }
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Услуги и цены</h1>
          <p className="text-gray-600 max-w-2xl text-lg">
            В моем арсенале только сертифицированные методики с доказанной эффективностью. 
            Прайс-лист является ориентировочным, точная стоимость рассчитывается на консультации.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 -mt-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 bg-white p-2 rounded-xl shadow-sm md:inline-flex">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-transparent text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm">
                    {service.price}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-serif text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 flex-grow">{service.description}</p>
                  <Link to={`/contact?service=${encodeURIComponent(service.title)}`}>
                    <Button variant="outline" className="w-full justify-between group">
                      Записаться
                      <ArrowRight size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
