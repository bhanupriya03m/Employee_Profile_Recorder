import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const [empId, setEmpId] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  const handleNext = () => {
    if (!empId) {
      alert("Please enter Emp ID.");
    } else if (!employeeName) {
      alert("Please enter Employee Name.");
    } else {
      navigate(`/next?empId=${empId}&employeeName=${employeeName}`);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Employee Management System</h2>
        <form className="main-form" onSubmit={handleNext}>
          <div>
            <label htmlFor="empId">Emp ID:</label>
            <input
              type="number"
              id="empId"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              placeholder="Enter Employee ID"
              required
            />
          </div>
          <div>
            <label htmlFor="employeeName">Employee Name:</label>
            <input
              type="text"
              id="employeeName"
              value={employeeName}
              maxLength={30}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Enter Employee Name"
              required
            />
          </div>
          <button type="submit" className="next-button">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default Main;

