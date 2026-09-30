import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import ProductShowcase from "../components/home/ProductShowcase";
import DesignStudio from "../components/home/DesignStudio";
import AboutReels from "../components/about/AboutReels";
import TeamMarquee from "../components/home/TeamMarquee";
import TrustedBy from "../components/home/TrustedBy";
import BusinessTrust from "../components/home/Businesstrust";
import WhatsAppCTA from "../components/about/WhatsAppCTA";
import Footer from "../components/home/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductShowcase />
      <DesignStudio />
      <AboutReels />
      <TeamMarquee />
      <TrustedBy />
      <BusinessTrust />
      <WhatsAppCTA />
      <Footer />
    </>
  );
}

export default Home;