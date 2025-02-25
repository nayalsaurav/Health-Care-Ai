import { HeroSection } from '@/components/hero-section-dark';
import Features from '../components/Features'
import { Link } from "react-router";
import AboutUs from '@/components/AboutUs';

export default function Homepage() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="mx-auto max-w-[1400px]">
      <div>
       <HeroSection
      title="Welcome to Our Platform"
      subtitle={{
        regular: "VedaVanni ",
        gradient: "Ancient Wisdom in Modern Dialogue",
      }}
      description="The wisdom of an Ayurvedic physician in your pocket. VaidyaVirtual offers personalized consultations, analyzing your unique constitutional patterns to provide customized dietary, herbal, and lifestyle recommendations."
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
    </div>
      <Features/>
      <AboutUs/>
      </div>
    </div>
  );
}
