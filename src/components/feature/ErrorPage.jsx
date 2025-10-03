import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ErrorPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRetry = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(0);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-200 px-4">
      <div className="w-24 h-24 flex items-center justify-center mb-6 animate-bounce">
        <span className="text-6xl">⚠️</span>
      </div>

      <h1 className="text-red-700 text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-6">
        Error while fetching data
      </h1>

      <button
        onClick={handleRetry}
        disabled={loading}
        className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Retrying..." : "Retry"}
      </button>

      <button
        onClick={() => navigate("/")}
        className="mt-4 text-red-600 underline hover:text-red-800 transition-colors"
      >
        Go Back Home
      </button>
    </div>
  );
}
export default ErrorPage;