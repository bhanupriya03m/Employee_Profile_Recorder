
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Next() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const empId = queryParams.get("empId");
  const employeeName = queryParams.get("employeeName");
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [dobError, setDobError] = useState("");
  const [salaryError, setSalaryError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (department && dob && gender && designation && salary && !dobError && !salaryError) {
      const formData = {
        id: empId,
        name: employeeName,
        department,
        dob,
        gender,
        designation,
        salary,
      };

      fetch("https://employee-management-1.onrender.com/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            alert("Form submitted successfully");
            // Clear form contents
            setDepartment("");
            setDob("");
            setGender("");
            setDesignation("");
            setSalary("");
            setDobError("");
            setSalaryError("");
            // Navigate to Main page
            navigate("/");
          } else {
            alert("Failed to submit form");
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          alert("Failed to submit form");
        });
    } else {
      alert("Please fill out all required fields or correct errors");
    }
  };

  const handleDobChange = (value) => {
    setDob(value);
    const selectedDate = new Date(value);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - selectedDate.getFullYear();
    const isDobValid = selectedDate < currentDate && age >= 18;
    setDobError(isDobValid ? "" : "Invalid date of birth or age less than 18");
  };

  const handleSalaryChange = (value) => {
    setSalary(value);
    const isValid = value !== "" && value.charAt(0) !== "0";
    setSalaryError(isValid ? "" : "Salary cannot start with 0");
  };

  return (
    <div className="next-container">
      <form onSubmit={handleSubmit}>
        <h2>Employee Management system</h2>
        <div>
          <label htmlFor="empId">Emp ID:</label>
          <input
            type="text"
            id="empId"
            value={empId}
            disabled
          />
        </div>
        <div>
          <label htmlFor="employeeName">Employee Name:</label>
          <input
            type="text"
            id="employeeName"
            value={employeeName}
            disabled
          />
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => handleDobChange(e.target.value)}
            required
          />
          {dobError && <p className="error-message">{dobError}</p>}
        </div>
        <div className="gender-container">
  <label htmlFor="gender">Gender:</label>
  <div className="gender-radio">
    <input
      type="radio"
      id="male"
      value="Male"
      checked={gender === "Male"}
      onChange={(e) => setGender(e.target.value)}
      required
    />
    <label htmlFor="male">Male</label>
    
    <input
      type="radio"
      id="female"
      value="Female"
      checked={gender === "Female"}
      onChange={(e) => setGender(e.target.value)}
      required
    />
    <label htmlFor="female">Female</label>
    
    <input
      type="radio"
      id="other"
      value="Other"
      checked={gender === "Other"}
      onChange={(e) => setGender(e.target.value)}
      required
    />
    <label htmlFor="other">Other</label>
  </div>
</div>



        <div>
          <label htmlFor="designation">Designation:</label>
          <input
            type="text"
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="Enter Designation"
            required
          />
        </div>
        <div>
          <label htmlFor="salary">Salary:</label>
          <input
            type="text"
            id="salary"
            value={salary}
            onChange={(e) => handleSalaryChange(e.target.value)}
            placeholder="Enter Salary"
            maxLength={8}
            required
          />
          {salaryError && <p className="error-message">{salaryError}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Next;
