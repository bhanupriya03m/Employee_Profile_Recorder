import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Main from "./pages/Main";
import Next from "./pages/Next";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/next" element={<Next />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
