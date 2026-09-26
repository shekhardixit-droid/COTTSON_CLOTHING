import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import ProductMarquee from "../components/home/ProductMarquee";
import TeamMarquee from "../components/home/TeamMarquee";
import ProductShowcase from "../components/home/ProductShowcase";
import TrustedBy from "../components/home/TrustedBy";
import CorporateNeeds from "../components/home/CorporateNeeds";
import DesignStudio from "../components/home/DesignStudio";
import BusinessTrust from "../components/home/Businesstrust";
import FAQ from "../components/home/FAQ";
import Footer from "../components/home/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductMarquee />
      <TeamMarquee />
      <ProductShowcase />
      <TrustedBy />
      <CorporateNeeds />
      <DesignStudio />
      <BusinessTrust />
      <FAQ />
      <Footer />
    </>
  );
}

export default Home;