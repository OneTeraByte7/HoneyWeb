// src/pages/Signup.jsx
import { useState } from "react";
import axios from "axios";
import AuthFormWrapper from "../components/AuthFormWrapper";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", form);
      setMessage(res.data.msg || "Registered successfully!");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <AuthFormWrapper title="Sign Up">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Sign Up
        </button>
        {message && <p className="text-center mt-2 text-yellow-700">{message}</p>}
      </form>
    </AuthFormWrapper>
  );
}
