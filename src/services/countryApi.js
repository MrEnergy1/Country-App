import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const getAllCountry = async () => {
  const response = await axios.get(
    "https://restcountries.com/v3.1/all?fields=name,region,population,flags,capital,languages"
  );
  return response.data;
};

export const getCountryById = async (name) => {
  const response = await axios.get(
    `https://restcountries.com/v3.1/name/${name}`
  );
  return response.data;
};

export const useCountryById = (name) => {
  return useQuery({
    queryKey: ["countries", name],
    queryFn: () => getCountryById(name),
    enabled: !!name,
  });
};

export const useCountry = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: getAllCountry,
  });
};