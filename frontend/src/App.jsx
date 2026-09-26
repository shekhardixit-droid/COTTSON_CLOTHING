import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Clients from "./pages/Clients";
<<<<<<< Updated upstream
import ContactUs from "./pages/ContactUs";
=======
import Resources from "./pages/Resources";
>>>>>>> Stashed changes

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/clients" element={<Clients />} />
<<<<<<< Updated upstream
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/contact" element={<ContactUs />} />
        
=======
        <Route path="/resources" element={<Resources />} />
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}

export default App;