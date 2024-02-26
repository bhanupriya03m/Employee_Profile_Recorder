import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Main from "./pages/Main"; // Adjusted import path
import Next from "./pages/Next"; // Adjusted import path


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/next" element={<Next />} /> {/* Adjusted path to "/next" */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
