import { Route, Routes } from "react-router-dom";
import MyHealthAverage from "./components/assets/myHealthAverage.js";
import "./components/assets/index.css";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/api/myhealthaverage" element={<MyHealthAverage />} />
      </Routes>
    </>
  );
};

export default App;
