import React from "react";
import { BeforeAfter } from "../ui/BeforeAfter";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export function ResultsPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Результаты</h2>
            <p className="text-gray-600">
              Лучшая работа косметолога — та, которую не замечают окружающие. Вы выглядите отдохнувшей и свежей.
            </p>
          </div>
          <Link to="/results">
            <Button variant="ghost" className="hidden md:inline-flex">Смотреть все кейсы →</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
               <BeforeAfter 
                  beforeImage="https://images.unsplash.com/photo-1588510906234-2b6355325881?w=800&auto=format&fit=crop&q=80"
                  afterImage="https://images.unsplash.com/photo-1596704017254-9b1b1f9e86f5?w=800&auto=format&fit=crop&q=80"
               />
            </div>
            <div className="flex justify-between items-start">
               <div>
                  <h3 className="font-serif font-medium text-lg">Коррекция средней трети</h3>
                  <p className="text-sm text-muted-foreground">Филлеры на основе гиалуроновой кислоты</p>
               </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
               <BeforeAfter 
                  beforeImage="https://images.unsplash.com/photo-1555547908-16e7884d521d?w=800&auto=format&fit=crop&q=80"
                  afterImage="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&auto=format&fit=crop&q=80"
               />
            </div>
             <div className="flex justify-between items-start">
               <div>
                  <h3 className="font-serif font-medium text-lg">Лечение акне и постакне</h3>
                  <p className="text-sm text-muted-foreground">Комплексная терапия: пилинги + мезотерапия</p>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center md:hidden">
            <Link to="/results">
              <Button variant="outline" className="w-full">Смотреть все кейсы</Button>
            </Link>
        </div>

        <div className="mt-12 p-4 bg-muted/50 rounded-lg text-xs text-muted-foreground text-center">
          * Фотографии публикуются с письменного согласия пациентов. Результат процедур индивидуален и зависит от особенностей организма.
        </div>
      </div>
    </section>
  );
}
