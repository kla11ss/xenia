import * as React from "react"
import { ImageWithFallback } from "../components/figma/ImageWithFallback"
import { Award, GraduationCap, Syringe, Sparkles } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="pt-20 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        {/* Intro */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
           <div className="lg:w-1/2 relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                <ImageWithFallback 
                   src="https://images.unsplash.com/photo-1706565029539-d09af5896340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkZXJtYXRvbG9naXN0JTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWwlMjB3aGl0ZSUyMGNvYXR8ZW58MXx8fHwxNzcwNzYwMzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                   alt="Dr. Xenia Barinova"
                   className="w-full h-full object-cover"
                 />
              </div>
              <div className="absolute top-10 -left-10 w-40 h-40 bg-[#BFA16F]/20 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-10 -right-10 w-60 h-60 bg-[#BFA16F]/20 rounded-full blur-3xl -z-10" />
           </div>
           
           <div className="lg:w-1/2">
              <span className="text-[#BFA16F] font-medium tracking-wide uppercase text-sm">Обо мне</span>
              <h1 className="text-4xl md:text-5xl font-light text-slate-900 mt-4 mb-8">
                Ксения Баринова <br />
                <span className="text-2xl text-slate-500 font-normal">(Белых)</span>
              </h1>
              
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Я — врач-дерматовенеролог, косметолог. Мой путь в медицине начался с желания помогать людям не просто "выглядеть лучше", а обретать уверенность через здоровье кожи.
                </p>
                <p>
                  Я верю, что современная косметология — это не про "перекраивание" лица, а про интеллектуальное управление возрастом. Моя задача — подчеркнуть вашу природную красоту, сохранив уникальные черты.
                </p>
                <p>
                  В своей работе я руководствуюсь принципом "не навреди". Я никогда не назначу процедуру, если она вам не нужна или может дать неестественный результат.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                 <div className="flex gap-4 items-start">
                    <GraduationCap className="w-8 h-8 text-[#BFA16F] shrink-0" />
                    <div>
                       <h4 className="font-semibold text-slate-900">Образование</h4>
                       <p className="text-sm text-slate-500 mt-1">Высшее медицинское (ПИМУ). Ординатура по дерматовенерологии. ПП по косметологии.</p>
                    </div>
                 </div>
                 <div className="flex gap-4 items-start">
                    <Award className="w-8 h-8 text-[#BFA16F] shrink-0" />
                    <div>
                       <h4 className="font-semibold text-slate-900">Квалификация</h4>
                       <p className="text-sm text-slate-500 mt-1">Регулярное повышение квалификации в России и Европе. Сертифицированный тренер.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Philosophy */}
        <div className="bg-[#F8F9FA] rounded-3xl p-8 md:p-16 mb-24">
           <div className="max-w-3xl mx-auto text-center">
              <Sparkles className="w-12 h-12 text-[#967d50] mx-auto mb-6" />
              <h2 className="text-3xl font-light text-slate-900 mb-8">Мои принципы</h2>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                 <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="font-medium text-xl mb-3 text-[#6e5a36]">Безопасность</h3>
                    <p className="text-sm text-slate-600">Стерильность, одноразовые расходники и только сертифицированные препараты с регистрационным удостоверением.</p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="font-medium text-xl mb-3 text-[#6e5a36]">Естественность</h3>
                    <p className="text-sm text-slate-600">Лица моих пациентов сохраняют живую мимику. Гармонизация, а не гиперкоррекция.</p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="font-medium text-xl mb-3 text-[#6e5a36]">Честность</h3>
                    <p className="text-sm text-slate-600">Я не продаю "чудо-курсы". Мы вместе обсуждаем реальные возможности и прогнозируемые результаты.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Certificates placeholder - simplified for now */}
        <div className="text-center">
           <h2 className="text-3xl font-light text-slate-900 mb-12">Дипломы и сертификаты</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-[3/4] bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                    <span className="text-slate-400 text-sm">Сертификат {i}</span>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  )
}
