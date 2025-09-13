function LoadingPage() {
  return (
    <div className="flex flex-col items-center bg-blue-100 h-[100vh] justify-center">
      <div className="border-t-yellow-400 border-4 border-yellow-100 w-20 h-20 animate-spin rounded-full"></div>
      <h2 className=" mt-4 text-4xl flex items-center">
        Loading
        <span
          className="ml-2 animate-bounce"
          style={{ animationDelay: "0.3s" }}
        >
          .
        </span>
        <span
          className="ml-2 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        >
          .
        </span>
        <span
          className="ml-2 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          .
        </span>
      </h2>
    </div>
  );
}
export default LoadingPage;