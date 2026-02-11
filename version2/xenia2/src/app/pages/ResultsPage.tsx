import * as React from "react"
import { BeforeAfterSlider } from "../components/BeforeAfterSlider"
import { Button } from "../components/ui/button"
import { Link } from "react-router"

export default function ResultsPage() {
  const cases = [
    {
      id: 1,
      title: "Лечение акне, 6 месяцев",
      desc: "Комплексная терапия: чистки, пилинги, домашний уход. Пациентка, 24 года.",
      before: "https://images.unsplash.com/photo-1532642431870-2cd545b1c86c?grayscale&contrast=0.8",
      after: "https://images.unsplash.com/photo-1532642431870-2cd545b1c86c"
    },
    {
      id: 2,
      title: "Контурная пластика губ",
      desc: "Увлажнение и легкая коррекция объема препаратом Belotero Lips.",
      before: "https://images.unsplash.com/photo-1664549761426-6a1cb1032854?grayscale&contrast=0.8",
      after: "https://images.unsplash.com/photo-1664549761426-6a1cb1032854"
    },
    {
      id: 3,
      title: "Ботулинотерапия Full Face",
      desc: "Коррекция мимических морщин лба, межбровья и глаз. Сохранена естественная мимика.",
      before: "https://images.unsplash.com/photo-1706565029539-d09af5896340?grayscale&contrast=0.8",
      after: "https://images.unsplash.com/photo-1706565029539-d09af5896340"
    }
  ]

  return (
    <div className="pt-20 pb-24 bg-white min-h-screen">
       <div className="bg-slate-50 py-16 mb-12 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">Результаты до/после</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
             Внимание: фотографии не подвергались ретуши. Результат каждой процедуры индивидуален и зависит от особенностей организма.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
         <div className="grid gap-20">
            {cases.map((item, index) => (
               <div key={item.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                  <div className="w-full lg:w-1/2">
                     <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                        <BeforeAfterSlider 
                           beforeImage={item.before} 
                           afterImage={item.after} 
                        />
                     </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                     <div className="flex items-center gap-3 mb-4">
                        <span className="w-8 h-[1px] bg-[#BFA16F]"></span>
                        <span className="text-[#BFA16F] font-medium uppercase text-sm">Кейс #{index + 1}</span>
                     </div>
                     <h2 className="text-3xl font-light text-slate-900 mb-4">{item.title}</h2>
                     <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        {item.desc}
                     </p>
                     <Button variant="outline" asChild>
                        <Link to="/contact">Хочу такой же результат</Link>
                     </Button>
                  </div>
               </div>
            ))}
         </div>

         <div className="mt-24 p-8 bg-slate-900 text-slate-300 rounded-3xl text-center">
             <p className="text-sm">
                Информация на данной странице носит ознакомительный характер. <br/>
                Для получения точного прогноза по вашему случаю необходима очная консультация врача.
             </p>
         </div>
      </div>
    </div>
  )
}
