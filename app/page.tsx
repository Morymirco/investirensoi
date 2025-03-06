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
export default function Home() {
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
      <FeaturedCourses />
      <SpiralIcon />
      {/* <ChatIcon /> */}
      <FeaturesSection />
      <CourseSection />
      <MindeoSection />
      <TestimonialsSection />
      
    </div>
  );
}