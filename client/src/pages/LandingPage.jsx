import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover z-0"
      >
        <source src="/assets/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute w-full h-full bg-black/50 z-10" />

      {/* Content Wrapper */}
      <div className="relative z-20 flex flex-col min-h-screen text-white">

        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-4 bg-transparent">
          <div className="flex items-center">
            <img
              src="/assets/logo.jpg"
              alt="BTech Honey Logo"
              className="h-20 w-auto shadow-lg"
            />
          </div>
          <div className="space-x-6 font-semibold">
            <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
            <Link to="/signup" className="hover:text-yellow-300 transition">Signup</Link>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-grow flex flex-col justify-center items-center text-center px-6 py-16">
          <h2 className="text-5xl font-bold mb-4 drop-shadow-xl">Welcome to BTech Honey</h2>
          <p className="max-w-xl mb-8 text-lg drop-shadow-md">
            Your sweet spot for everything BTech-related. Join us to explore projects, connect with peers, and supercharge your academic journey.
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="px-8 py-3 bg-yellow-700 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-800 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 border-2 border-yellow-700 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 hover:text-white transition"
            >
              Login
            </Link>
          </div>
        </main>

        {/* About Section */}
        <section id="about" className="bg-black/60 px-8 py-12 text-white backdrop-blur-sm">
          <h3 className="text-3xl font-bold mb-4 text-center">About BTech Honey</h3>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-center">
            BTech Honey is your platform for collaboration and growth. Share projects, find teammates, and get inspired by what others are building.
          </p>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-black/60 px-8 py-12 text-white backdrop-blur-sm">
          <h3 className="text-3xl font-bold mb-4 text-center">Contact Us</h3>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-center">
            Have questions, suggestions, or just want to say hi?
            <br />
            📧 Email: <a href="mailto:support@btechhoney.com" className="underline">support@btechhoney.com</a>
            <br />
            ☎️ Phone: +91-9876543210
          </p>
        </section>

        {/* Footer */}
        <footer className="bg-black/60 text-yellow-100 py-6 text-center backdrop-blur-sm">
          <p>© 2025 BTech Honey. Made with ❤️ for BTech students.</p>
          <div className="mt-2 space-x-4">
            <a href="#about" className="hover:underline">About</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
