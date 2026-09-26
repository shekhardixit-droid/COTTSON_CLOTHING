import Navbar from "../components/home/Navbar";
import ClientsHero from "../components/clients/ClientsHero";
import Industries from "../components/clients/Industries";
import RetailClients from "../components/clients/RetailClients";
import HospitalityClients from "../components/clients/Hospitality";
import LeafyBoiSection from "../components/clients/LeafyBoiSection";
import HealthcareClients from "../components/clients/Healthcare";
import Energy from "../components/clients/Energy";
import ManufacturingClients from "../components/clients/Manufacturing";
import TechnologyClients from "../components/clients/TechnologyClients";
import CorporateWearShow from "../components/clients/CorporateWearShow";
import Footer from "../components/home/Footer";

export default function Clients() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ClientsHero />
      <Industries />
      <RetailClients/>
      <HospitalityClients/>
      <LeafyBoiSection/>
      <HealthcareClients/>
      <Energy/>
      <ManufacturingClients/>
      <TechnologyClients/>
      <CorporateWearShow/>
      <Footer/>
    </main>
  );
}