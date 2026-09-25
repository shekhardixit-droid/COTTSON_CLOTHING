import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductMarquee from "../components/ProductMarquee";
import TeamMarquee from "../components/TeamMarquee";
import ProductShowcase from "../components/ProductShowcase";
import TrustedBy from "../components/TrustedBy";
import CorporateNeeds from "../components/CorporateNeeds";
import DesignStudio from "../components/DesignStudio";
import BusinessTrust from "../components/Businesstrust";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

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