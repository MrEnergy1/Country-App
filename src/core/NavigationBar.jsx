import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Homepage from "../components/feature/HomePage.jsx";
import PageNotFound from "../components/feature/PageNotFound.jsx";
import ErrorPage from "../components/feature/ErrorPage.jsx";
import LoadingPage from "../components/feature/LoadingPage.jsx";
import CountryDetails from "../components/feature/CountryDetails.jsx";
import { Menu, X } from "lucide-react";

function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <div className="bg-yellow-500 fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="flex items-center justify-between px-4 sm:px-8 h-16">
          <Link to="/">
            <span className="font-semibold text-2xl sm:text-3xl font-serif">
              Countries App
            </span>
          </Link>

          <nav className="hidden md:flex space-x-6 text-lg">
            <Link to="/" className="hover:underline hover:text-yellow-200 transition-colors">
              Home
            </Link>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-yellow-400 flex flex-col space-y-2 px-4 pb-4">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline text-lg">
              Home
            </Link>
          </div>
        )}
      </div>

      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/country/:name" element={<CountryDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default NavigationBar;