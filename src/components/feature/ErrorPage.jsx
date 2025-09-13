function ErrorPage() {
  return (
    <div className="flex flex-col bg-red-100 items-center h-[100vh] justify-center">
      <div className="w-20 h-20"></div>
      <h1 className="text-red-700 text-4xl flex items-center">
        ⚠️ Error while fetching data
      </h1>
    </div>
  );
}

export default ErrorPage;
