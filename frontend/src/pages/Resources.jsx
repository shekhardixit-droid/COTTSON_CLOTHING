import Navbar from "../components/home/Navbar";
import ResourcesHero from "../components/resources/ResourcesHero";
import ProductsSwitch from "../components/resources/ProductsSwitch";
import WhatsAppCTA from "../components/about/WhatsAppCTA";
import Footer from "../components/home/Footer";

function Resources() {
  return (
    <>
      <Navbar />
      <ResourcesHero />
      <ProductsSwitch />
      <WhatsAppCTA />
      <Footer />
    </>
  );
}

export default Resources;