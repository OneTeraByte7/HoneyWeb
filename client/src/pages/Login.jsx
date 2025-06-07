import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // import useNavigate
import AuthFormWrapper from "../components/AuthFormWrapper";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  // initialize navigate

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", form);
    localStorage.setItem("authToken", res.data.token); // use consistent key
    setMessage(`Welcome back, ${res.data.user.name}!`);
    setForm({ email: "", password: "" });

    setTimeout(() => {
      navigate("/landing");  // redirect to /landing after login
    }, 1000);

  } catch (err) {
    setMessage(err.response?.data?.msg || "Login failed");
  }
};


  return (
    <AuthFormWrapper title="Login">
      <form onSubmit={handleSubmit} className="space-y-4">
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
          Login
        </button>
        {message && <p className="text-center mt-2 text-yellow-700">{message}</p>}
      </form>
    </AuthFormWrapper>
  );
}
