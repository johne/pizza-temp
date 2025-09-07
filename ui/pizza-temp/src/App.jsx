import { Routes, Route } from "react-router-dom";
import "./App.css";
import { TempGraph } from "./components/TempGraph";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/temps" element={<TempGraph />} />
      </Routes>
    </div>
  );
}

export default App;
