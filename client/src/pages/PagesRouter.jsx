import { Route, Routes } from "react-router-dom";
import DevPage from "./DevPage.jsx";
import HomePage from "./HomePage.jsx";

function PagesRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/dev" element={<DevPage />}></Route>
    </Routes>
  );
}

export default PagesRouter;
