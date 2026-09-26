import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Clients from "./pages/Clients";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/contact" element={<ContactUs />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;