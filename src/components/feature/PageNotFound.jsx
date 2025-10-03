import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4">
      <div className="w-24 h-24 flex items-center justify-center mb-6 animate-pulse">
        <span className="text-6xl">⚠️</span>
      </div>

      <h1 className="text-red-700 text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-6 animate-shake">
        Error 404: Page Not Found!!
      </h1>

      <button
        onClick={() => navigate("/")}
        className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition-colors"
      >
        Go Back Home
      </button>

      <div className="absolute inset-0 bg-red-100 opacity-20 animate-pulse-slow -z-10"></div>

    </div>
  );
}

export default PageNotFound;
