"use client"
import Head from 'next/head';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ChatIcon from './components/ChatIcon';
import SpiralIcon from './components/SpiralIcon';
import CourseSection from './components/CourseSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import MissionSection from './components/MissionSection';
import FeaturedCourses from './components/featured-courses';
import Footer from './components/footer';
import MindeoSection from './components/mindeo-section';
import CategoryList from './components/CategoryList';
import { CategoryGrid } from './components/category-grid';
import { EventCard } from './components/event-card';

import { ArrowUp } from 'lucide-react';
export default function Home() {
  const categories = [
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Mobile Development' },
    { id: 3, name: 'Data Science' },
    { id: 4, name: 'Machine Learning' },
    { id: 5, name: 'Artificial Intelligence' },
  ];

  const events = [
    {
      id: 1,
      title: "Using Laptop and PC Working at Home",
      date: "25 Mar, 2024",
      location: "London, UK",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 2,
      title: "Business People Working Together Conference",
      date: "25 Mar, 2024",
      location: "London, UK",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 3,
      title: "Young Tutor Home Teaching Online Courses",
      date: "20 Mar, 2024",
      location: "NY, USA",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 4,
      title: "Startup Business Team Meeting Modern",
      date: "19 Mar, 2024",
      location: "London, UK",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 5,
      title: "Student Using Online Education Service",
      date: "19 Mar, 2024",
      location: "London, UK",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 6,
      title: "Professional Photographer Shooting Home",
      date: "19 Mar, 2023",
      location: "NY, USA",
      image: "/placeholder.svg?height=150&width=150",
    },
  ]
  return (
    <div className="min-h-screen flex flex-col relative">
      <Head>
        <title>Mindeo - L&apos;école 2.0 qui vous accompagne vers vos objectifs</title>
        <meta name="description" content="Mindeo est l'école en ligne qui vous permet d'acquérir les compétences nécessaires dans les domaines du business, de l'investissement et du développement personnel." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute inset-0 bg-gradient-overlay -z-10"></div>
      
      <HeroSection />
      <MissionSection />
      <div className="bg-[#070D33] container mx-auto px-4 py-12">
      <div className="text-center mb-12 ">
        <h1 className="text-4xl font-bold text-white mb-2">Top Categories</h1>
        <p className="text-white">12,000+ unique online course list designs</p>
      </div>
      <CategoryGrid />
      </div>
      <FeaturedCourses />
      {/* <CategoryList categories={categories} /> */}
      {/* <SpiralIcon /> */}
      {/* <ChatIcon /> */}
      <FeaturesSection />
      <CourseSection />
      <MindeoSection />
      <TestimonialsSection />

{/* <div className="bg-[#070D33] container mx-auto max-w-7xl">
<div className="text-center mb-8 ">
        <h1 className="text-4xl font-bold text-[#1a1a4b] mb-2">Upcoming Events</h1>
        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur.</p>
      </div>
<div className="grid md:grid-cols-2 gap-6 bg-[#070D33] container mx-auto px-4 py-12">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            location={event.location}
            image={event.image}
          />
        ))}
      </div>
</div> */}

      <div className="fixed bottom-6 right-6">
        <button
          className="bg-indigo-600 text-white p-3 rounded-md shadow-md hover:bg-indigo-700 transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
      
    </div>
  );
}