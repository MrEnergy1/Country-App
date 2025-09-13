const getPopulationColor = (population) => {
  if (population === 0) {
    return "border-r-4 border-r-black text-red-500";
  }
  if (population <= 100_000) {
    return "border-r-4 border-r-green-300";
  }
  if (population <= 500_000) {
    return "border-r-4 border-r-green-500";
  }
  if (population <= 1_000_000) {
    return "border-r-4 border-r-yellow-300";
  }
  if (population <= 10_000_000) {
    return "border-r-4 border-r-yellow-500";
  }
  if (population <= 50_000_000) {
    return "border-r-4 border-r-red-300";
  }
  return "border-r-4 border-r-red-500";
};

export default getPopulationColor;
