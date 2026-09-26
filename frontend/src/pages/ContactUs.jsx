import Navbar from "../components/home/Navbar";
import ContactHero from "../components/contact/ContactHero";
import ContactDetails from "../components/contact/ContactDetails";

export default function ContactUs() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ContactHero />
      <ContactDetails/>
    </main>
  );
}