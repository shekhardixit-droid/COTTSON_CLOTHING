import Navbar from "../components/home/Navbar";
import ContactHero from "../components/contact/ContactHero";
import ClientLogoCarousel from "../components/about/ClientLogoCarousel";
import ContactDetails from "../components/contact/ContactDetails";
import AboutReels from "../components/about/AboutReels";
import WhatsAppCTA from "../components/about/WhatsAppCTA";
import Footer from "../components/home/Footer";

export default function ContactUs() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <ContactHero />
      <ClientLogoCarousel />
      <ContactDetails />
      <AboutReels />
      <WhatsAppCTA />
      <Footer />
    </main>
  );
}