import React from "react";
import { Star } from "lucide-react";

export function Reviews() {
  const reviews = [
    {
      name: "Елена М.",
      tag: "Контурная пластика",
      text: "Ксения — невероятно чуткий врач. Я очень боялась эффекта 'утиных губ', но результат получился настолько естественным, что даже муж не заметил вмешательства, просто сказал, что я похорошела!",
      stars: 5
    },
    {
      name: "Виктория С.",
      tag: "Лечение акне",
      text: "Мы лечим акне уже полгода. Это первый врач, который не стал назначать кучу дорогих мазей, а начал с анализов и питания. Кожа стала чище, я наконец-то перестала пользоваться тональником каждый день.",
      stars: 5
    },
    {
      name: "Ольга К.",
      tag: "Биоревитализация",
      text: "Хожу к Ксении уже 3 года. Нравится, что она никогда не навязывает лишнего. Если процедура мне не нужна — она честно об этом скажет. Очень ценю такой подход.",
      stars: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-12 text-center">Отзывы пациентов</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 text-primary mb-4">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6 leading-relaxed">"{review.text}"</p>
              <div>
                <p className="font-bold font-serif text-lg">{review.name}</p>
                <p className="text-sm text-muted-foreground">{review.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
