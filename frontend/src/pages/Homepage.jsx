import { HeroSection } from '@/components/hero-section-dark';
import Features from '../components/Features'
import { Link } from "react-router";
import AboutUs from '@/components/AboutUs';

export default function Homepage() {
  return (
    <div className='flex flex-col justify-center items-center max-w-[1400px]'>
       <HeroSection
      title="Welcome to Our Platform"
      subtitle={{
        regular: "Transform your ideas into ",
        gradient: "beautiful digital experiences",
      }}
      description="Transform your ideas into reality with our comprehensive suite of development tools and resources."
      ctaText="Get Started"
      ctaHref="/signup"
      gridOptions={{
        angle: 65,
        opacity: 0.4,
        cellSize: 50,
        lightLineColor: "#4a4a4a",
        darkLineColor: "#2a2a2a",
      }}
    />
      <Features/>
      <AboutUs/>
    </div>
  );
}
