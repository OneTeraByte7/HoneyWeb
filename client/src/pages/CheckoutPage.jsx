import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [useExisting, setUseExisting] = useState(false);
  const [existingAddress, setExistingAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // Assuming authToken or userId is stored in localStorage
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (!authToken) {
      // If not logged in, redirect or do nothing
      setLoading(false);
      return;
    }

    // Fetch user's saved address from backend
    const fetchAddress = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/address", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (res.data && res.data.address) {
          setExistingAddress(res.data.address);
          setFormData(res.data.address); // prefill form with existing address
        }
      } catch (error) {
        console.error("Error fetching user address:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [authToken]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUseExisting = () => {
    setUseExisting(true);
  };

  const handleEnterNew = () => {
    setUseExisting(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save or update address for user in backend
      const res = await axios.post(
        "http://localhost:5000/api/checkout",
        formData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (res.status === 200) {
        // Redirect to Billing Page with user data
        navigate("/billing", { state: { userData: formData } });
      }
    } catch (error) {
      console.error("Error saving checkout info:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 mt-10 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-6">Checkout - Address Info</h2>

      {existingAddress && !useExisting ? (
        <div className="mb-6 border p-4 rounded bg-green-50">
          <h3 className="text-lg font-semibold mb-2">Saved Address</h3>
          <p>{existingAddress.fullName}</p>
          <p>{existingAddress.addressLine1}</p>
          {existingAddress.addressLine2 && <p>{existingAddress.addressLine2}</p>}
          <p>
            {existingAddress.city}, {existingAddress.state} - {existingAddress.postalCode}
          </p>
          <p>{existingAddress.country}</p>
          <p>Phone: {existingAddress.phone}</p>
          <p>Email: {existingAddress.email}</p>

          <button
            onClick={handleUseExisting}
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Use This Address
          </button>

          <button
            onClick={handleEnterNew}
            className="mt-4 ml-4 border border-green-600 text-green-600 py-2 px-4 rounded hover:bg-green-100 transition"
          >
            Enter New Address
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            name="fullName"
            onChange={handleChange}
            value={formData.fullName}
            placeholder="Full Name"
            required
            className="input"
          />
          <input
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email"
            type="email"
            required
            className="input"
          />
          <input
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            placeholder="Phone"
            required
            className="input"
          />
          <input
            name="addressLine1"
            onChange={handleChange}
            value={formData.addressLine1}
            placeholder="Address Line 1"
            required
            className="input"
          />
          <input
            name="addressLine2"
            onChange={handleChange}
            value={formData.addressLine2}
            placeholder="Address Line 2"
            className="input"
          />
          <input
            name="city"
            onChange={handleChange}
            value={formData.city}
            placeholder="City"
            required
            className="input"
          />
          <input
            name="state"
            onChange={handleChange}
            value={formData.state}
            placeholder="State"
            required
            className="input"
          />
          <input
            name="postalCode"
            onChange={handleChange}
            value={formData.postalCode}
            placeholder="Postal Code"
            required
            className="input"
          />
          <input
            name="country"
            onChange={handleChange}
            value={formData.country}
            placeholder="Country"
            required
            className="input"
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Continue to Billing
          </button>
        </form>
      )}
    </div>
  );
}
