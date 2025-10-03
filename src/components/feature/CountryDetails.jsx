import { useParams } from "react-router-dom";
import { useCountryById } from "../../services/countryApi.js";
import { Link } from "react-router-dom";
import { ArrowLeftFromLine } from "lucide-react";
import LoadingPage from "./LoadingPage.jsx";
import ErrorPage from "./ErrorPage.jsx";
import PageNotFound from "./PageNotFound.jsx";

function CountryDetails() {
  const { name } = useParams();
  const { data: selectedCountry, error, isLoading } = useCountryById(name);

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;
  if (!selectedCountry) return <PageNotFound />

  return (
    <div className="pt-15 min-h-screen px-4 sm:px-8 lg:px-20">
      {selectedCountry?.map((country, index) => (
        <div
          key={index}
          className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16"
        >
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="w-full h-auto max-h-[400px] object-contain bg-gray-200 rounded-lg"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link to="/" className="self-start mb-4 lg:mb-8">
              <p className="flex items-center text-xl text-gray-500 font-semibold hover:border-b-yellow-500 hover:border-2 hover:border-t-0 hover:border-l-0 hover:border-r-0 py-2 px-4 transition-all">
                <ArrowLeftFromLine className="mr-2" /> Go Back
              </p>
            </Link>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-serif py-2 mb-6">
              {country.name.common}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl py-1 mb-2">
              <b>Capital:</b> {country.capital}
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl py-1 mb-2">
              <b>Region:</b> {country.region}
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl py-1 mb-2">
              <b>Sub-region:</b> {country.subregion}
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl py-1 mb-2">
              <b>Area:</b> {country.area} km&#178;
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CountryDetails;
