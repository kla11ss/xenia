import * as React from "react"
import { Link } from "react-router"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { Check } from "lucide-react"

export default function ServicesPage() {
  const categories = [
    { id: "all", label: "Все услуги" },
    { id: "injectable", label: "Инъекции" },
    { id: "esthetic", label: "Эстетика" },
    { id: "hardware", label: "Аппаратные" },
  ]

  const services = [
    {
      id: 1,
      title: "Ботулинотерапия",
      category: "injectable",
      desc: "Коррекция мимических морщин препаратами Диспорт, Ксеомин, Релатокс.",
      price: "от 350 ₽ / ед.",
      details: ["Лоб и межбровье", "Гусиные лапки", "Лифтинг Нефертити", "Лечение гипергидроза"]
    },
    {
      id: 2,
      title: "Контурная пластика губ",
      category: "injectable",
      desc: "Коррекция формы и объема губ филлерами на о��нове гиалуроновой кислоты.",
      price: "от 15 000 ₽",
      details: ["Естественный объем", "Увлажнение", "Исправление асимметрии"]
    },
    {
      id: 3,
      title: "Биоревитализация",
      category: "injectable",
      desc: "Глубокое увлажнение кожи, улучшение цвета лица, повышение упругости.",
      price: "от 12 000 ₽",
      details: ["Novacutan", "Profhilo", "Belotero Hydro"]
    },
    {
      id: 4,
      title: "Чистка лица (Combo)",
      category: "esthetic",
      desc: "Атравматичная чистка + пилинг + уход. Идеально для сияния и чистоты пор.",
      price: "5 500 ₽",
      details: ["Ультразвук + мануальная", "Легкий пилинг", "Успокаивающая маска"]
    },
    {
      id: 5,
      title: "Пилинг BioRePeel",
      category: "esthetic",
      desc: "Двухфазный пилинг с биостимулирующим эффектом. Без шелушения.",
      price: "4 500 ₽",
      details: ["Всесезонный", "Мгновенное сияние", "Сужение пор"]
    },
    {
      id: 6,
      title: "SMAS-лифтинг (Ultraformer)",
      category: "hardware",
      desc: "Безоперационная подтяжка лица сфокусированным ультразвуком.",
      price: "от 25 000 ₽",
      details: ["Четкий овал", "Уменьшение брылей", "Лифтинг век"]
    },
    {
      id: 7,
      title: "Фотолечение (IPL/BBL)",
      category: "hardware",
      desc: "Удаление пигментации, сосудов, лечение розацеа и фотоомоложение.",
      price: "от 8 000 ₽",
      details: ["Ровный тон", "Удаление сосудистой сетки", "Лечение акне"]
    },
    {
        id: 8,
        title: "Мезотерапия волосистой части головы",
        category: "injectable",
        desc: "Стимуляция роста волос, борьба с выпадением.",
        price: "от 4 000 ₽",
        details: ["Укрепление луковиц", "Улучшение качества волос"]
    }
  ]

  const [activeTab, setActiveTab] = React.useState("all")

  const filteredServices = activeTab === "all" 
    ? services 
    : services.filter(s => s.category === activeTab)

  return (
    <div className="pt-20 pb-24 bg-white min-h-screen">
      <div className="bg-slate-50 py-16 mb-12 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">Услуги и цены</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Здесь представлен перечень основных процедур. Точный план лечения составляется только после очной консультации и диагностики.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12 overflow-x-auto pb-4">
             <TabsList className="flex gap-2 p-1 bg-slate-100 rounded-full">
                {categories.map(cat => (
                  <TabsTrigger 
                    key={cat.id} 
                    value={cat.id}
                    className="px-6 py-3 rounded-full text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-[#BFA16F] data-[state=active]:shadow-sm text-slate-500 hover:text-slate-900 whitespace-nowrap"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
             </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map(service => (
                  <Card key={service.id} className="flex flex-col h-full hover:shadow-md transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-4">
                        <CardTitle className="text-xl font-medium text-slate-900">{service.title}</CardTitle>
                        <span className="text-[#BFA16F] font-semibold whitespace-nowrap text-sm">{service.price}</span>
                      </div>
                      <CardDescription className="mt-2 text-base leading-relaxed">
                        {service.desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <div className="border-t border-slate-100 pt-4 mt-2">
                        <ul className="space-y-2">
                          {service.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                              <Check className="h-4 w-4 text-[#BFA16F] shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
             </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 p-8 bg-[#BFA16F]/10 rounded-2xl text-center">
            <h3 className="text-xl font-medium text-[#6e5a36] mb-2">Не нашли нужную процедуру?</h3>
            <p className="text-[#967d50] mb-6">
                Возможно, она называется иначе или входит в комплекс. Запишитесь на консультацию, и мы подберем решение.
            </p>
            <Button variant="premium" asChild>
                <Link to="/contact">Записаться на консультацию</Link>
            </Button>
        </div>
      </div>
    </div>
  )
}
