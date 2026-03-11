import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import StatsBento from "@/components/StatsBento";
import WhyChooseUs from "@/components/Whychooseus";

export default function Home() {
  return (
    <div className="h-500">
      <Header />
      <HeroSection />
      <LogoMarquee />
      <WhyChooseUs />
      <StatsBento />
      <Footer />
    </div>
  );
}
