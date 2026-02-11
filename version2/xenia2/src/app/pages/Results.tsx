import React from "react";
import { BeforeAfter } from "../components/ui/BeforeAfter";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

export default function Results() {
  const cases = [
    {
      title: "Лечение акне",
      description: "Курс из 4 процедур пилинга + домашний уход. Срок: 2 месяца.",
      before: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=800&auto=format&fit=crop&q=80",
      after: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=800&auto=format&fit=crop&q=80"
    },
    {
      title: "Омоложение (Full Face)",
      description: "Комплексная работа: ботулинотерапия Full Face + контурная пластика скул. Мгновенный лифтинг-эффект.",
      before: "https://images.unsplash.com/photo-1473280025148-b43e9ca08290?w=800&auto=format&fit=crop&q=80",
      after: "https://images.unsplash.com/photo-1596704017254-9b1b1f9e86f5?w=800&auto=format&fit=crop&q=80"
    },
    {
      title: "Коррекция губ",
      description: "Аугментация губ препаратом Belotero Lips (0.6 мл). Задача: увлажнение и легкий объем, сохраняя естественную форму.",
      before: "https://images.unsplash.com/photo-1588510906234-2b6355325881?w=800&auto=format&fit=crop&q=80",
      after: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&auto=format&fit=crop&q=80"
    },
    {
      title: "Качество кожи",
      description: "Биоревитализация (2 процедуры). Результат: сияние, выравнивание тона, уменьшение пор.",
      before: "https://images.unsplash.com/photo-1555547908-16e7884d521d?w=800&auto=format&fit=crop&q=80",
      after: "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=800&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Результаты работ</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            В этом разделе собраны примеры моих работ. Помните, что каждый случай уникален, и результат зависит от исходных данных и соблюдения рекомендаций.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {cases.map((item, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
              <div className="rounded-2xl overflow-hidden shadow-inner mb-6 border border-gray-100 bg-gray-100">
                <BeforeAfter 
                  beforeImage={item.before}
                  afterImage={item.after}
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-serif font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Кейс №{index + 1}</span>
                <Link to="/contact">
                  <Button variant="ghost" size="sm">Хочу так же</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-primary/5 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-serif font-bold mb-4">Не нашли похожий случай?</h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Запишитесь на консультацию — мы разберем вашу ситуацию и подберем индивидуальное решение.
          </p>
          <Link to="/contact">
            <Button size="lg">Записаться на консультацию</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
