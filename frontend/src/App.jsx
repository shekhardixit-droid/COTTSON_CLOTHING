import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Clients = lazy(() => import("./pages/Clients"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Resources = lazy(() => import("./pages/Resources"));

function PageLoader() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#113858]/20 border-t-[#113858]" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;