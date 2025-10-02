import NavigationBar from "./core/NavigationBar.jsx";
import { useSelector } from "react-redux";

function App() {
  const isMode = useSelector((state) => state.store.isMode);

  return (
    <div className={`h-[100vh] ${isMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <NavigationBar />
    </div>
  );
}
export default App;