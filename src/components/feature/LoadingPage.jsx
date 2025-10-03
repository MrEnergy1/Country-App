function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="w-20 h-20 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin mb-6"></div>

      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold flex items-center">
        Loading
        <span className="ml-2 animate-bounceDot">.</span>
        <span className="ml-2 animate-bounceDot delay-200">.</span>
        <span className="ml-2 animate-bounceDot delay-400">.</span>
      </h2>

      <div className="absolute inset-0 bg-blue-100 opacity-20 animate-pulse-slow -z-10"></div>
    </div>
  );
}

export default LoadingPage;