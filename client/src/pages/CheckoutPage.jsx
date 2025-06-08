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

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (!authToken) {
      setLoading(false);
      return;
    }

    const fetchAddress = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/address", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (res.data && res.data.address) {
          setExistingAddress(res.data.address);
          setFormData(res.data.address);
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

  const handleUseExisting = () => setUseExisting(true);
  const handleEnterNew = () => setUseExisting(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/checkout",
        formData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (res.status === 200) {
        navigate("/billing", { state: { userData: formData } });
      }
    } catch (error) {
      console.error("Error saving checkout info:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 py-12 text-white">
      <div className="max-w-2xl mx-auto p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl text-white">
        <h2 className="text-3xl font-semibold mb-6 text-white">
          Checkout - Address Info
        </h2>

        {existingAddress && !useExisting ? (
          <div className="mb-6 border border-white/20 p-4 rounded-lg bg-white/5 backdrop-blur-md">
            <h3 className="text-lg font-semibold mb-2">Saved Address</h3>
            <p>{existingAddress.fullName}</p>
            <p>{existingAddress.addressLine1}</p>
            {existingAddress.addressLine2 && <p>{existingAddress.addressLine2}</p>}
            <p>
              {existingAddress.city}, {existingAddress.state} -{" "}
              {existingAddress.postalCode}
            </p>
            <p>{existingAddress.country}</p>
            <p>Phone: {existingAddress.phone}</p>
            <p>Email: {existingAddress.email}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleUseExisting}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded shadow transition"
              >
                Use This Address
              </button>
              <button
                onClick={handleEnterNew}
                className="border border-green-600 text-green-400 hover:bg-green-900/30 py-2 px-4 rounded shadow transition"
              >
                Enter New Address
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
            {[
              { name: "fullName", placeholder: "Full Name" },
              { name: "email", placeholder: "Email", type: "email" },
              { name: "phone", placeholder: "Phone" },
              { name: "addressLine1", placeholder: "Address Line 1" },
              { name: "addressLine2", placeholder: "Address Line 2", optional: true },
              { name: "city", placeholder: "City" },
              { name: "state", placeholder: "State" },
              { name: "postalCode", placeholder: "Postal Code" },
              { name: "country", placeholder: "Country" },
            ].map(({ name, placeholder, type = "text", optional }) => (
              <input
                key={name}
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required={!optional}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-white/60"
              />
            ))}

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300"
            >
              Continue to Billing
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
