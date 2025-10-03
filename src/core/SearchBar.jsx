import LoadingPage from "../components/feature/LoadingPage.jsx";
import ErrorPage from "../components/feature/ErrorPage.jsx";
import { Link } from "react-router-dom";
import { useCountry } from "../services/countryApi.js";
import { useState } from "react";
import { ArrowDownAZ, SunMedium, Moon } from "lucide-react";
import map from "../assets/map_bg.jpg";
import getPopulationColor from "../core/getPopulationColor.js";
import colorWheel from "../assets/color-wheel.png";
import { useSelector, useDispatch } from "react-redux";
import { setIsMode } from "../Hooks/storeSlice.js";

function SearchBar() {
  const { data: allCountries, error, isLoading } = useCountry();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByPopulation, setSortByPopulation] = useState(false);

  const dispatch = useDispatch();
  const isMode = useSelector((state) => state.store.isMode);

  if (error) return <ErrorPage />;
  if (isLoading) return <LoadingPage />;

  const toggleMode = () => {
    dispatch(setIsMode(!isMode));
  };

  const handleSortByPopulation = () => {
    setSortByPopulation((prev) => !prev);
  };

  const filteredCountries = allCountries
    ?.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortByPopulation) return a.population - b.population;
      return a.name.common.localeCompare(b.name.common);
    });

  const totalPopulation = filteredCountries?.reduce(
    (sum, country) => sum + country.population,
    0
  );

  return (
    <div
      className={`${
        isMode ? "bg-black text-white" : "bg-white text-black"
      } pt-24 px-4 sm:px-8 lg:px-16`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center text-lg md:text-xl font-semibold border-b-4 border-yellow-400">
          Total Population:{" "}
          <span className="ml-2">{totalPopulation?.toLocaleString()}</span>
        </div>

        <button
          onClick={toggleMode}
          className={`flex items-center justify-center p-2 rounded-md transition-colors duration-200 hover:scale-105 ${
            isMode
              ? "bg-gray-800 hover:bg-gray-700 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-black"
          }`}
        >
          {isMode ? <SunMedium size={24} /> : <Moon size={24} />}
        </button>

        <div className="relative group">
          <div
            className={`flex items-center justify-center p-2 rounded-md cursor-pointer transition-colors duration-200 ${
              isMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            <img src={colorWheel} alt="color wheel" className="w-8 h-8" />
          </div>
          <ul
            className={`absolute left-0 mt-2 w-56 border rounded-lg shadow-lg transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible z-50 ${
              isMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          >
            <li className="flex items-center px-2 py-1">
              <div className="w-4 h-4 mr-2 border-4 border-red-500"></div>Highly
              High Over-Populated
            </li>
            <li className="flex items-center px-2 py-1">
              <div className="w-4 h-4 mr-2 border-4 border-red-300"></div>High
              Over-Populated
            </li>
            <li className="flex items-center px-2 py-1">
              <div className="w-4 h-4 mr-2 border-4 border-yellow-500"></div>
              Highly Medium Population
            </li>
            <li className="flex items-center px-2 py-1">
              <div className="w-4 h-4 mr-2 border-4 border-yellow-300"></div>
              Medium Population
            </li>
            <li className="flex items-center px-2 py-1">
              <div className="w-4 h-4 mr-2 border-4 border-green-500"></div>
              Highly Small Population
            </li>
            <li className="flex items-center px-2 py-1">
              <div className="w-4 h-4 mr-2 border-4 border-green-300"></div>
              Small Population
            </li>
            <li className="flex items-center px-2 py-1">
              <div className="w-4 h-4 mr-2 border-4 border-black"></div>Zero
              Population
            </li>
          </ul>
        </div>

        <button
          onClick={handleSortByPopulation}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 hover:scale-105 ${
            isMode
              ? "bg-gray-800 hover:bg-gray-700 text-white"
              : "bg-white hover:bg-gray-100 text-black border border-gray-400"
          }`}
        >
          <ArrowDownAZ size={20} />
          <span className="font-semibold">Sort By Population</span>
        </button>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search countries..."
          className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200 w-full md:w-60 ${
            isMode
              ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              : "bg-gray-200 border-gray-400 text-black placeholder-gray-600"
          }`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCountries?.map((country, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border shadow-md hover:shadow-xl transition-shadow duration-200 flex flex-col md:flex-row items-center gap-4 ${
              isMode
                ? "border-gray-700 bg-gray-900"
                : "border-gray-300 bg-white"
            }`}
          >
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="w-full md:w-32 h-20 object-cover rounded-md"
            />

            <div className="flex-1 flex flex-col justify-between w-full gap-2">
              <Link
                to={`/country/${country.name.common}`}
                className="hover:underline"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-yellow-600">
                  {country.name.common}
                </h2>
              </Link>

              <div
                className="w-full h-12 bg-cover bg-bottom flex items-center rounded-md overflow-hidden"
                style={{ backgroundImage: `url(${map})` }}
              >
                <span className="flex-1 text-center font-semibold bg-white/50">
                  {country.region}
                </span>
              </div>

              <div className="w-full h-12 flex items-center rounded-full overflow-hidden">
                <span
                  className={`flex-1 text-center font-semibold ${getPopulationColor(
                    country.population
                  )} px-2`}
                >
                  Population
                </span>
                <span className="flex-1 text-center">
                  {country.population.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
