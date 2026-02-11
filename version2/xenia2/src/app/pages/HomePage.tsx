import * as React from "react"
import { motion } from "motion/react"
import { Link } from "react-router"
import { ArrowRight, Star, Clock, ShieldCheck, Heart, Sparkles, Activity } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { BeforeAfterSlider } from "../components/BeforeAfterSlider"
import { ImageWithFallback } from "../components/figma/ImageWithFallback"

export default function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-20 overflow-hidden bg-[#F8F9FA]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#BFA16F] blur-3xl opacity-20 mix-blend-multiply" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#BFA16F] blur-3xl opacity-20 mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="initial" 
              animate="animate" 
              variants={stagger}
              className="max-w-xl"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BFA16F]/10 border border-[#BFA16F]/20 text-[#BFA16F] text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Эстетическая медицина & Косметология</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Ваша красота — <br/>
                <span className="font-serif italic text-[#967d50]">научный подход</span> и 
                <span className="font-serif italic text-[#967d50]"> врачебная этика</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 mb-8 leading-relaxed max-w-md">
                Я — Ксения Баринова, врач-дерматовенеролог. 
                Создаю персональные программы преображения, сохраняя вашу индивидуальность и естественность.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="premium" asChild className="text-base h-14 px-8 shadow-lg shadow-[#BFA16F]/10">
                  <Link to="/contact">Записаться на прием</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base h-14 px-8 border-slate-300">
                  <Link to="/services">Выбрать услугу</Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-12 flex items-center gap-8 text-slate-500 text-sm">
                 <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#BFA16F]" />
                    <span>Лицензированный врач</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#BFA16F]" />
                    <span>Более 3000 пациентов</span>
                 </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative hidden lg:block h-[700px] w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/0 z-10 rounded-[2rem]" />
              {/* Main Portrait */}
              <div className="absolute right-0 top-0 w-[90%] h-[90%] rounded-[2rem] overflow-hidden shadow-2xl">
                 <ImageWithFallback 
                   src="https://images.unsplash.com/photo-1706565029539-d09af5896340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkZXJtYXRvbG9naXN0JTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWwlMjB3aGl0ZSUyMGNvYXR8ZW58MXx8fHwxNzcwNzYwMzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                   alt="Dr. Xenia Barinova"
                   className="w-full h-full object-cover"
                 />
              </div>
              
              {/* Floating Card */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-12 left-0 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs z-20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#BFA16F]/10 flex items-center justify-center text-[#BFA16F]">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Комплексный подход</h4>
                    <p className="text-xs text-slate-500">Диагностика → Лечение</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  Не маскирую симптомы, а работаю с качеством кожи на клеточном уровне.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW (Bento Grid) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">
                Популярные <span className="font-serif italic text-[#967d50]">процедуры</span>
              </h2>
              <p className="text-slate-600">
                Мой арсенал включает только сертифицированные препараты и доказанные методики для решения эстетических задач любой сложности.
              </p>
            </div>
            <Link to="/services" className="hidden md:flex items-center text-[#BFA16F] font-medium hover:underline mt-4 md:mt-0">
              Смотреть все услуги <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Card 1: Large */}
            <Link to="/services" className="group relative overflow-hidden rounded-3xl md:col-span-2 bg-slate-100">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1664549761426-6a1cb1032854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBmYWNpYWwlMjB0cmVhdG1lbnQlMjB3b21hbiUyMHNwYSUyMHJlbGF4aW5nfGVufDF8fHx8MTc3MDc2MDM2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Injectables"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-white text-2xl font-medium mb-1">Инъекционная косметология</h3>
                <p className="text-white/80 text-sm">Контурная пластика, биоревитализация, ботулинотерапия</p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link to="/services" className="group relative overflow-hidden rounded-3xl bg-[#BFA16F] text-white p-8 flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-medium mb-2">Лечение акне</h3>
                <p className="text-white/70 text-sm">Комплексная терапия: от чисток до системных ретиноидов. Работаю со сложными случаями.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center self-end group-hover:bg-white/20 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>

            {/* Card 3 */}
            <Link to="/services" className="group relative overflow-hidden rounded-3xl bg-[#F0F4F4] p-8 flex flex-col justify-between">
               <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#BFA16F] shadow-sm">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900">Аппаратные методики</h3>
                  <p className="text-slate-600 text-sm">SMAS-лифтинг, лазерная шлифовка, фотоомоложение (BBL/IPL).</p>
               </div>
               <span className="text-[#BFA16F] text-sm font-medium group-hover:underline">Подробнее</span>
            </Link>

             {/* Card 4: Wide */}
            <Link to="/services" className="group relative overflow-hidden rounded-3xl md:col-span-2 bg-slate-100">
               <ImageWithFallback 
                src="https://images.unsplash.com/photo-1532642431870-2cd545b1c86c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2tpbiUyMHRleHR1cmUlMjBtYWNybyUyMGNsb3NlJTIwdXAlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcwNzYwMzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Skin Quality"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-white text-2xl font-medium mb-1">Качество кожи</h3>
                <p className="text-white/80 text-sm">Работа с пигментацией, сосудами, рубцами и текстурой кожи</p>
              </div>
            </Link>
          </div>
          
          <div className="mt-8 md:hidden text-center">
             <Link to="/services" className="inline-flex items-center text-[#BFA16F] font-medium hover:underline">
              Смотреть все услуги <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* APPROACH SECTION (Sticky) */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="container mx-auto px-4 md:px-8">
           <div className="flex flex-col lg:flex-row gap-16">
              {/* Sticky Left Side */}
              <div className="lg:w-1/2 lg:sticky lg:top-32 lg:h-fit">
                 <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6">
                    Мой подход: <br/>
                    <span className="font-serif italic text-[#967d50]">бережно и осознанно</span>
                 </h2>
                 <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                    Я не делаю процедур "ради процедуры". Каждое назначение обосновано состоянием вашей кожи и желаемым результатом.
                 </p>
                 <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                    <ImageWithFallback
                       src="https://images.unsplash.com/photo-1648775507324-b48dd3791fa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwYWVzdGhldG1pYyUyMGNsaW5pYyUyMGludGVyaW9yJTIwYnJpZ2h0JTIwbWluaW1hbHxlbnwxfHx8fDE3NzA3NjAzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                       alt="Clinic Interior"
                       className="w-full h-full object-cover"
                    />
                 </div>
              </div>

              {/* Scrollable Right Side */}
              <div className="lg:w-1/2 flex flex-col gap-12 pt-8">
                 {[
                    { title: "Диагностика", desc: "Сбор анамнеза, оценка состояния кожи, выявление противопоказаний. Мы обсуждаем ваш образ жизни и ожидания." },
                    { title: "План лечения", desc: "Составляю индивидуальную карту процедур. Никаких шаблонных решений — только то, что нужно именно вам." },
                    { title: "Процедура", desc: "Использую только сертифицированные препараты (вскрываю упаковку при вас) и стерильные инструменты. Максимальный комфорт и безболезненность." },
                    { title: "Домашний уход", desc: "Подбираю средства для домашнего использования, которые продлят и усилят эффект от процедур." },
                    { title: "Сопровождение", desc: "Остаюсь на связи после процедуры. Контролирую процесс реабилитации до полного восстановления." }
                 ].map((step, idx) => (
                    <div key={idx} className="flex gap-6 group">
                       <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#BFA16F]/30 bg-white flex items-center justify-center text-[#BFA16F] font-serif font-medium text-xl shadow-sm group-hover:bg-[#BFA16F]/10 transition-colors">
                          {idx + 1}
                       </div>
                       <div>
                          <h3 className="text-xl font-medium text-slate-900 mb-2">{step.title}</h3>
                          <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* RESULTS SECTION */}
      <section className="py-24 bg-white overflow-hidden">
         <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
               <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">
                  Результаты <span className="font-serif italic text-[#967d50]">работы</span>
               </h2>
               <p className="text-slate-600">
                  Лучшее подтверждение экспертизы врача — счастливые пациенты.
               </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
               <div className="aspect-[4/3] md:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl">
                  {/* Using placeholder images for before/after demo. In real app, these would be real case photos */}
                  <BeforeAfterSlider 
                     beforeImage="https://images.unsplash.com/photo-1532642431870-2cd545b1c86c?grayscale&contrast=0.8" 
                     afterImage="https://images.unsplash.com/photo-1532642431870-2cd545b1c86c"
                  />
               </div>
               <div className="mt-6 flex justify-between items-start text-sm text-slate-500 bg-slate-50 p-4 rounded-xl">
                  <p>Процедура: <strong>Комплексное лечение акне (6 месяцев)</strong></p>
                  <p className="text-right max-w-[200px] text-xs">
                     * Результат индивидуален и может отличаться. Требуется консультация специалиста.
                  </p>
               </div>
            </div>

            <div className="mt-12 text-center">
               <Button variant="outline" asChild>
                  <Link to="/results">Посмотреть все кейсы</Link>
               </Button>
            </div>
         </div>
      </section>

      {/* REVIEWS & FAQ */}
      <section className="py-24 bg-[#F0F4F4]">
         <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
               {/* Reviews */}
               <div>
                  <h2 className="text-3xl font-light text-slate-900 mb-8">Отзывы пациентов</h2>
                  <div className="grid gap-6">
                     {[
                        { name: "Елена, 34 года", text: "Ксения — врач от Бога. Очень боялась делать губы, но результат превзошел ожидания. Всё выглядит максимально естественно, никто даже не догадывается!", tag: "Контурная пластика" },
                        { name: "Анна, 27 лет", text: "Вылечили акне, с которым я боролась 5 лет. Ксения составила план, подобрала уход, и мы шли к цели шаг за шагом. Спасибо за чистую кожу!", tag: "Лечение акне" },
                        { name: "Марина, 42 года", text: "Делала SMAS-лифтинг. Процедура прошла комфортно, реабилитация быстрая. Лицо подтянулось, я выгляжу свежее лет на 5.", tag: "Аппаратная косметология" }
                     ].map((review, i) => (
                        <Card key={i} className="border-none shadow-md">
                           <CardContent className="pt-6">
                              <div className="flex gap-1 mb-3">
                                 {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                              </div>
                              <p className="text-slate-700 italic mb-4">"{review.text}"</p>
                              <div className="flex justify-between items-center text-sm">
                                 <span className="font-semibold text-slate-900">{review.name}</span>
                                 <span className="text-slate-400 bg-slate-100 px-2 py-1 rounded text-xs">{review.tag}</span>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               </div>

               {/* FAQ */}
               <div>
                  <h2 className="text-3xl font-light text-slate-900 mb-8">Частые вопросы</h2>
                  <Accordion type="single" collapsible className="w-full">
                     <AccordionItem value="item-1">
                        <AccordionTrigger>��то больно?</AccordionTrigger>
                        <AccordionContent>
                           Большинство процедур проходят комфортно благодаря использованию качественной аппликационной анестезии (крем). Для некоторых методик анестезия не требуется вовсе.
                        </AccordionContent>
                     </AccordionItem>
                     <AccordionItem value="item-2">
                        <AccordionTrigger>Как подготовиться к первому приему?</AccordionTrigger>
                        <AccordionContent>
                           Специальной подготовки обычно не требуется. Рекомендуется прийти без макияжа (или мы снимем его на месте). Если вы принимаете какие-либо лекарства, обязательно сообщите об этом.
                        </AccordionContent>
                     </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger>Можно ли делать процедуры летом?</AccordionTrigger>
                        <AccordionContent>
                           Многие процедуры (биоревитализация, ботулинотерапия, некоторые пилинги) можно и нужно делать летом. Ограничения касаются лазерных шлифовок и агрессивных пилингов. Мы подберем то, что безопасно для текущего сезона.
                        </AccordionContent>
                     </AccordionItem>
                     <AccordionItem value="item-4">
                        <AccordionTrigger>Как долго держится результат?</AccordionTrigger>
                        <AccordionContent>
                           Зависит от процедуры. Ботулинотерапия: 3-6 месяцев. Филлеры: 9-18 месяцев. Курс биоревитализации дает эффект на 6-8 месяцев. Мы всегда обсуждаем это на консультации.
                        </AccordionContent>
                     </AccordionItem>
                  </Accordion>
               </div>
            </div>
         </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-[#BFA16F] text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
         </div>
         <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif italic mb-6">Начните путь к идеальной коже</h2>
            <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
               Запишитесь на первичную консультацию, чтобы составить индивидуальный план преображения.
            </p>
            <Button size="lg" variant="outline" className="bg-white text-[#967d50] border-none hover:bg-white/90" asChild>
               <Link to="/contact">Записаться онлайн</Link>
            </Button>
         </div>
      </section>
    </div>
  )
}
