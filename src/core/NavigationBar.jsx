import { Link, Routes, Route } from "react-router-dom";
import Homepage from "../components/feature/HomePage.jsx"
import PageNotFound from "../components/feature/PageNotFound.jsx";
import ErrorPage from "../components/feature/ErrorPage.jsx";
import LoadingPage from "../components/feature/LoadingPage.jsx";
import CountryDetails from "../components/feature/CountryDetails.jsx";

function NavigationBar() {
  return (
    <div>
      <div className="bg-yellow-500 flex h-15 items-center justify-evenly text-lg fixed w-[100%]">
        <nav className="space-x-4">
          <Link to="/"><span className="font-semibold text-3xl font-serif">Countries App</span></Link>
        </nav>
      </div>
      <div>
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