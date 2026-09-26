import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< Updated upstream
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
=======

import Home from "./pages/Home";
import Clients from "./pages/Clients";
>>>>>>> Stashed changes

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< Updated upstream
        <Route path="/about" element={<AboutUs />} />
=======
        <Route path="/clients" element={<Clients />} />
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}

export default App;