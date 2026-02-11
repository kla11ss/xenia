import React from "react";
import { Hero } from "../components/home/Hero";
import { ServicesBento } from "../components/home/ServicesBento";
import { Approach } from "../components/home/Approach";
import { ResultsPreview } from "../components/home/ResultsPreview";
import { Reviews } from "../components/home/Reviews";
import { FAQ } from "../components/home/FAQ";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ServicesBento />
      <Approach />
      <ResultsPreview />
      <Reviews />
      <FAQ />
      
      {/* Final CTA */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Готовы преобразиться?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8 text-lg">
            Запишитесь на консультацию, чтобы составить ваш персональный план красоты и молодости.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-10 h-12 rounded-full font-bold">
              Записаться сейчас
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
