import HeroSection from "@/components/LandingPages/Herosection";
import Navbar from "@/components/LandingPages/Navbar";
import Banner from "@/components/LandingPages/Banner";
import Services from "@/components/LandingPages/Services";
import Team from "@/components/LandingPages/Team";
import Footer from "@/components/LandingPages/Footer";
import Contact from "@/components/LandingPages/Contact";
import Features from "@/components/LandingPages/Features";
export default function Home() {
  return (
    <>
      <div className="px-10 bg-gray-100 flex flex-col">
        <Navbar />
        <HeroSection />
        <Banner />
        <Services />
        <Features />
        <Team />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
