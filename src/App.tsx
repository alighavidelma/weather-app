import React from "react";

import Home from "./pages/Home";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ForecastPage from "./pages/Forecast";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forecast" element={<ForecastPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
