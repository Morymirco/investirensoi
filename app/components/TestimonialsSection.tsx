// components/TestimonialsSection.jsx
'use client'
import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sophie L.",
      role: "Entrepreneur",
      content: "Grâce à la formation e-commerce, j'ai pu lancer ma boutique en ligne en seulement 3 semaines. Les cours sont clairs, concrets et m'ont apporté toutes les connaissances nécessaires pour débuter.",
      image: "/testimonial1.jpg"
    },
    {
      id: 2,
      name: "Thomas M.",
      role: "Investisseur immobilier",
      content: "J'avais peur de me lancer dans l'immobilier, mais la formation de Mindeo m'a donné tous les outils pour faire mon premier investissement en toute confiance. Le support des coachs a été inestimable.",
      image: "/testimonial2.jpg"
    },
    {
      id: 3,
      name: "Julie D.",
      role: "Freelance designer",
      content: "La formation Business et IA a complètement transformé ma façon de travailler. J'ai pu automatiser une grande partie de mes tâches et me concentrer sur ce qui compte vraiment. Merci Mindeo !",
      image: "/testimonial3.jpg"
    }
  ];

  return (
    <div className="bg-[#070D33] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Ce que nos étudiants disent</h2>
          <p className="mt-4 text-xl text-white">
            Des milliers de personnes ont déjà transformé leur vie avec nos formations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-[#070730] p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-[#00b67a] flex items-center justify-center mr-4">
                  {/* Replace with actual image if available */}
                  <span className="text-white font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">{testimonial.name}</h3>
                  <p className="text-white">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-white">{testimonial.content}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#temoignages" 
            className="text-white font-medium hover:text-white"
          >
            Voir plus de témoignages →
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;