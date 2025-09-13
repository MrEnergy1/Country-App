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
  console.log(allCountries, error, isLoading);

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
      if (sortByPopulation) {
        return a.population - b.population;
      }
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
      }`}
    >
      <div className="bg-white flex h-15 top-15 fixed w-full text-black">
        <div className="bg-white flex-col md:flex md:flex-row w-full justify-between items-center">
          <div className="flex items-center md:pl-10 text-md h-full w-full">
            <b>Total Population:</b>
            <span className="ml-2">
              {totalPopulation?.toLocaleString()}
            </span>
          </div>

          <div className="flex h-full w-[80%] items-center justify-center">
            <button
              onClick={toggleMode}
              className={`border p-1 h-10 w-12 flex items-center justify-center rounded-md text-md animate-pulse hover:animate-none cursor-pointer ${
                isMode
                  ? "hover:bg-gray-700 hover:text-white"
                  : "hover:bg-gray-200 hover:text-black"
              }`}
            >
              {isMode ? <SunMedium /> : <Moon />}
            </button>
          </div>

          <div className="flex h-full w-full justify-evenly items-center">
            <div className="relative group">
              <div
                className={`border w-15 flex items-center justify-center py-1 rounded-2xl cursor-pointer h-12 ${
                  isMode
                    ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
                    : "bg-white border-gray-400 hover:bg-gray-200"
                }`}
              >
                <img
                  src={colorWheel}
                  alt="color wheel"
                  className="w-auto h-full flex"
                />
              </div>
              <ul
                className={`absolute left-0 mt-2 w-60 border rounded-lg shadow-lg transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible ${
                  isMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              >
                <li className="colorCode">
                  <div className="border-4 mr-1 border-red-500"></div>
                  Highly High Over-Populated
                </li>
                <li className="colorCode">
                  <div className="border-4 mr-1 border-red-300"></div>
                  High Over-populated
                </li>
                <li className="colorCode">
                  <div className="border-4 mr-1 border-yellow-500"></div>
                  Highly Medium Population
                </li>
                <li className="colorCode">
                  <div className="border-4 mr-1 border-yellow-300"></div>
                  Medium Population
                </li>
                <li className="colorCode">
                  <div className="border-4 mr-1 border-green-500"></div>
                  Highly Small Population
                </li>
                <li className="colorCode">
                  <div className="border-4 mr-1 border-green-300"></div>
                  Small Population
                </li>
                <li className="colorCode">
                  <div className="border-4 mr-1 border-black"></div>
                  Zero Population
                </li>
              </ul>
            </div>

            <button
              className={`p-2 border rounded flex items-center justify-evenly w-50 ${
                isMode
                  ? "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                  : "bg-white border-gray-400 text-black hover:bg-gray-100"
              }`}
              onClick={handleSortByPopulation}
            >
              <p className="font-semibold">Sort By Population</p>
              <ArrowDownAZ />
            </button>

            <input
              type="text"
              className={`border text-[18px] h-10 rounded-md px-3 flex items-center transition duration-150 ease-in-out ${
                isMode
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-200 border-gray-400 text-black placeholder-gray-600"
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search countries..."
            />
          </div>
        </div>
      </div>

      <div className="mt-20">
        {filteredCountries?.map((country, index) => (
          <div
            key={index}
            className={`p-4 mb-5 rounded flex items-center border ${
              isMode ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="w-32 h-20 object-cover mt-2"
            />

            <div className="flex ml-20 h-20 w-[90%] items-center justify-evenly">
              <div className="w-full h-full flex justify-center mr-5">
                <Link
                  to={`/country/${country.name.common}`}
                  className="w-full hover:underline"
                >
                  <h2 className="text-3xl font-mono font-semibold text-yellow-600 flex text-center items-center justify-center cursor-pointer h-full w-auto">
                    {country.name.common}
                  </h2>
                </Link>
              </div>

              <div
                className="w-full h-13 bg-cover bg-bottom flex items-center"
                style={{ backgroundImage: `url(${map})` }}
              >
                <p className="text-2xl h-full w-full flex items-center">
                  <span className="font-semibold bg-white/50 h-full w-[50%] flex items-center justify-center font-serif text-black">
                    Region
                  </span>
                  <span className="font-medium bg-gray-200/50 h-full w-[50%] flex items-center justify-center font-serif text-black">
                    {country.region}
                  </span>
                </p>
              </div>

              <div className="w-full h-13 flex rounded-full overflow-hidden mx-4 text-xl items-center justify-center">
                <p className="h-full w-[80%] flex items-center rounded-4xl overflow-hidden">
                  <span
                    className={`font-semibold h-full flex items-center px-3 ${getPopulationColor(
                      country.population
                    )}`}
                  >
                    Population
                  </span>
                  <span className="px-3 h-full w-full flex items-center justify-center">
                    {country.population.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
