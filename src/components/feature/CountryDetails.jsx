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
    <div className="pt-15 h-[100vh]">
      {selectedCountry?.map((country, index) => (
        <div key={index} className="flex h-full">
          <div className="w-[50%]">
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="w-full h-full bg-gray-200 py-5 px-10"
            />
          </div>

          <Link to="/">
            <p className="absolute flex text-xl text-gray-500 font-semibold mt-10 ml-10 hover:border-b-yellow-500 hover:border-2 hover:border-t-0 hover:border-l-0 hover:border-r-0 py-2 px-4">
              {" "}
              <ArrowLeftFromLine className="mr-2" /> Go Back
            </p>
          </Link>
          <div className="w-[50%] flex flex-col items-center justify-center">
            <h1 className="text-7xl font-bold font-serif py-2 mb-10">
              {country.name.common}
            </h1>
            <p className="text-2xl font-serif py-2 mb-2">
              <b>Capital:</b> {country.capital}
            </p>
            <p className="text-2xl font-serif py-2 mb-2">
              <b>Region:</b> {country.region}{" "}
            </p>
            <p className="text-2xl font-serif py-2 mb-2">
              <b>Sub-region:</b> {country.subregion}
            </p>
            <p className="text-2xl font-serif py-2 mb-2">
              <b>Area:</b> {country.area}km&#178;
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default CountryDetails;
