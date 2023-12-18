import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./App.css"; // Make sure to use the correct CSS file

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    selectedBatch: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the Express backend API to store data
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/enroll`,
        formData
      );

      // Assuming the API returns a success message
      if (response.status === 200) {
        toast.success(response.data.data);
        setLoading(false);
        resetForm();
      } else {
        toast.error(response.data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.error || "Something went wrong");
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      selectedBatch: "",
    });
  };

  return (
    <div className="app">
      {loading && (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h2>Yoga Classes Admission Form</h2>
        <FormField
          label="Name:"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <FormField
          label="Age:"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <FormField
          label="Select Batch:"
          type="select"
          name="selectedBatch"
          value={formData.selectedBatch}
          onChange={handleChange}
          options={[
            { value: "batch", label: "Select batch" },
            { value: "6-7AM", label: "6-7AM" },
            { value: "7-8AM", label: "7-8AM" },
            { value: "8-9AM", label: "8-9AM" },
            { value: "5-6PM", label: "5-6PM" },
          ]}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// A reusable form field component
const FormField = ({ label, type, name, value, onChange, options }) => (
  <div className="form-group">
    <label>
      {label}
      {type === "select" ? (
        <select name={name} value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} />
      )}
    </label>
  </div>
);

export default AdmissionForm;
