// src/components/AdmissionForm.js

import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { toast } from "react-toastify";

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
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.data);
        setLoading(false);
        setFormData({
          name: "",
          age: "",
          selectedBatch: "",
        });
      } else {
        toast.error(response.data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response.data.error);
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {loading ? (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      ) : null}
      <h2>Yoga Classes Admission Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Select Batch:
          <select
            name="selectedBatch"
            value={formData.selectedBatch}
            onChange={handleChange}
          >
            <option value="batch" defaultValue>
              batches
            </option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdmissionForm;
