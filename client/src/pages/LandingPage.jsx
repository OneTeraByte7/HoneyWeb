// src/pages/LandingPage.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductSection from "./ProductSection";

export default function LandingPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // On component mount, get user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout clears localStorage and redirects to login
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden text-sm md:text-base font-sans">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional Overlay */}
      <div className="fixed inset-0 bg-black/20 z-0" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-30 px-8 py-4 flex justify-between items-center bg-black/60 text-white shadow-md">
        <div className="flex items-center">
          <img
            src="/assets/logo.jpg"
            alt="BTech Honey Logo"
            className="h-12 w-auto rounded shadow-lg"
          />
        </div>

        <div className="space-x-6 font-semibold flex items-center">
          {user ? (
            <>
              <span className="mr-4">Hello, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-white transition"
              >
                Logout
              </button>
              <Link
                to="/cart"
                className="hover:text-yellow-300 transition ml-6"
              >
                Cart 🛒
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-300 transition">
                Login
              </Link>
              <Link to="/signup" className="hover:text-yellow-300 transition">
                Signup
              </Link>
              <Link to="/cart" className="hover:text-yellow-300 transition">
                Cart 🛒
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <div className="relative z-10 mt-24 flex flex-col space-y-20 text-white px-4">
        {/* 1. Hero / Content */}
        <section className="text-center py-20">
          <h2 className="text-5xl font-bold mb-4">Welcome to BTech Honey</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Your sweet spot for everything BTech-related. Join us to explore
            projects, connect with peers, and supercharge your academic journey.
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="px-6 py-2 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-2 border border-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
            >
              Login
            </Link>
          </div>
        </section>

        {/* 2. Product Section */}
        <ProductSection />

        {/* 3. USP */}
        <section id="usp" className="text-center py-16">
          <h3 className="text-3xl font-bold mb-6">Why Choose Us? 🐝</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8">
            <div className="bg-black/40 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">100% Natural</h4>
              <p>No additives or preservatives – just raw, real honey straight from nature.</p>
            </div>
            <div className="bg-black/40 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">Tested & Trusted</h4>
              <p>Each batch goes through rigorous lab testing to ensure quality and safety.</p>
            </div>
            <div className="bg-black/40 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">Sustainable Practices</h4>
              <p>We support eco-friendly beekeeping and tribal empowerment.</p>
            </div>
          </div>
        </section>

        {/* 4. How We Harvest */}
        <section id="harvest" className="text-center py-16">
          <h3 className="text-3xl font-bold mb-4">How We Harvest Honey 🍯</h3>
          <p className="max-w-3xl mx-auto leading-relaxed">
            We use ethical and sustainable harvesting practices by working closely
            with local farmers and tribal communities. Every drop is collected with care,
            maintaining purity and nutrients.
          </p>
        </section>

        {/* 5. About */}
        <section id="about" className="text-center py-16">
          <h3 className="text-3xl font-bold mb-4">About BTech Honey</h3>
          <p className="max-w-3xl mx-auto leading-relaxed">
            BTech Honey is your platform for collaboration and growth. Share projects,
            find teammates, and get inspired by what others are building.
          </p>
        </section>

        {/* 6. Testimonials */}
        <section id="testimonials" className="text-center py-16">
          <h3 className="text-3xl font-bold mb-6">What Our Customers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-8">
            <div className="bg-black/40 p-4 rounded-lg">
              <p>
                "Absolutely delicious! You can taste the difference in quality.
                Love the tulsi-infused one!"
              </p>
              <p className="mt-2 font-semibold text-yellow-200">– Riya Shah</p>
            </div>
            <div className="bg-black/40 p-4 rounded-lg">
              <p>"The purity and packaging is unmatched. I use it daily in my tea."</p>
              <p className="mt-2 font-semibold text-yellow-200">– Arjun Mehta</p>
            </div>
          </div>
        </section>

        {/* 7. Contact */}
        <section id="contact" className="text-center py-16">
          <h3 className="text-3xl font-bold mb-4">Contact Us</h3>
          <p className="max-w-3xl mx-auto leading-relaxed">
            Have questions, suggestions, or just want to say hi?
            <br />
            📧 Email:{" "}
            <a
              href="mailto:support@btechhoney.com"
              className="underline"
            >
              support@btechhoney.com
            </a>
            <br />
            ☎️ Phone: +91-9876543210
          </p>
        </section>

        {/* 8. Footer */}
        <footer className="text-yellow-100 py-6 text-center bg-black/70">
          <p>© 2025 BTech Wala. Made with Passion for All.</p>
          <div className="mt-2 space-x-4">
            <a href="#about" className="hover:underline">
              About
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </div>
        </footer>
      </div>

      {/* Floating Cart Button */}
      <Link
        to="/cart"
        className="fixed bottom-8 right-8 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full p-4 shadow-lg transition"
        title="Go to Cart"
      >
        🛒
      </Link>
    </div>
  );
}
