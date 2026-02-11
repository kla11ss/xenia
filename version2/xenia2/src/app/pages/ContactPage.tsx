import * as React from "react"
import { useForm } from "react-hook-form"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { MapPin, Phone, Instagram, Send, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface BookingFormData {
  name: string
  phone: string
  service: string
  message: string
}

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<BookingFormData>()

  const onSubmit = async (data: BookingFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log(data)
    toast.success("Заявка успешно отправлена!", {
      description: "Мы свяжемся с вами в ближайшее время для подтверждения записи.",
    })
    reset()
  }

  return (
    <div className="pt-20 pb-24 bg-white min-h-screen">
       <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
             {/* Text Info */}
             <div>
                <span className="text-[#BFA16F] font-medium tracking-wide uppercase text-sm">Контакты</span>
                <h1 className="text-4xl md:text-5xl font-light text-slate-900 mt-4 mb-8">
                   Запишитесь на прием
                </h1>
                <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                   Оставьте заявку, и администратор подберет удобное время для визита. 
                   Также вы можете написать мне напрямую в соцсетях.
                </p>

                <div className="space-y-8">
                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#BFA16F]/10 flex items-center justify-center text-[#BFA16F] shrink-0">
                         <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                         <h3 className="text-xl font-medium text-slate-900 mb-1">Адрес приема</h3>
                         <p className="text-slate-600">
                            г. Нижний Новгород, ул. Семашко, 17<br/>
                            Клиника "Skin"
                         </p>
                      </div>
                   </div>

                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#BFA16F]/10 flex items-center justify-center text-[#BFA16F] shrink-0">
                         <Phone className="w-6 h-6" />
                      </div>
                      <div>
                         <h3 className="text-xl font-medium text-slate-900 mb-1">Телефон</h3>
                         <p className="text-slate-600 mb-1">+7 (999) 000-00-00</p>
                         <p className="text-sm text-slate-400">Пн-Сб, с 09:00 до 20:00</p>
                      </div>
                   </div>

                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#BFA16F]/10 flex items-center justify-center text-[#BFA16F] shrink-0">
                         <Instagram className="w-6 h-6" />
                      </div>
                      <div>
                         <h3 className="text-xl font-medium text-slate-900 mb-1">Соцсети</h3>
                         <a href="https://instagram.com/dr.xenia.barinova" target="_blank" rel="noopener noreferrer" className="text-[#BFA16F] hover:underline">
                            @dr.xenia.barinova
                         </a>
                      </div>
                   </div>
                </div>
             </div>

             {/* Form */}
             <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-lg">
                <h2 className="text-2xl font-light text-slate-900 mb-6">Форма записи</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                   <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-slate-900">Ваше имя *</label>
                      <Input 
                        id="name" 
                        placeholder="Как к вам обращаться?" 
                        {...register("name", { required: "Пожалуйста, введите имя" })}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                   </div>

                   <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-slate-900">Телефон *</label>
                      <Input 
                        id="phone" 
                        placeholder="+7 (___) ___-__-__" 
                        type="tel"
                        {...register("phone", { required: "Пожалуйста, введите телефон" })}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                   </div>

                   <div className="space-y-2">
                      <label htmlFor="service" className="text-sm font-medium text-slate-900">Интересующая услуга</label>
                      <select 
                        id="service"
                        className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#BFA16F]"
                        {...register("service")}
                      >
                         <option value="">Не выбрана / Нужна консультация</option>
                         <option value="injectable">Инъекции</option>
                         <option value="acne">Лечение акне</option>
                         <option value="hardware">Аппаратные методики</option>
                         <option value="care">Уход / Чистка</option>
                      </select>
                   </div>

                   <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-slate-900">Комментарий</label>
                      <Textarea 
                        id="message" 
                        placeholder="Опишите проблему или желаемое время записи..." 
                        {...register("message")}
                      />
                   </div>

                   <Button type="submit" variant="premium" className="w-full h-12 text-base" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                           Отправка...
                        </>
                      ) : (
                        <>
                           Отправить заявку
                           <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                   </Button>
                   <p className="text-xs text-slate-400 text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                   </p>
                </form>
             </div>
          </div>
       </div>
    </div>
  )
}
