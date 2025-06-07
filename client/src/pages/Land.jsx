import { Link, useNavigate } from "react-router-dom";
import SplitText from "./SplitText";
import Waves from "./Waves";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LandingPage() {
  const navigate = useNavigate();

  const logoRef = useRef(null);
  const boxRef = useRef(null);
  const buttonsRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    gsap.fromTo(
      boxRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.3, delay: 0.4, ease: "back.out(1.7)" }
    );

    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, delay: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      buttonsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.1, delay: 1.5, ease: "power3.out" }
    );
  }, []);

  const handleShopClick = () => {
    const isLoggedIn = localStorage.getItem("authToken");
    if (isLoggedIn) {
      navigate("/shop");
    } else {
      navigate("/login");
    }
  };

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/assets/land.jpg')" }}
      ></div>

      {/* Waves background overlay */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Waves />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <div
          ref={logoRef}
          className="absolute top-6 left-6 flex items-center gap-3"
        >
          <img
            src="/assets/logo.jpg"
            alt="SweetGold Logo"
            className="h-14 w-14 rounded-full border-2 border-yellow-400 shadow-lg"
          />
          <h1 className="text-2xl font-bold text-yellow-900 drop-shadow font-serif">
            BTech Wala
          </h1>
        </div>

        {/* Main Box */}
        <div
          ref={boxRef}
          className="p-10 rounded-2xl shadow-xl max-w-3xl text-center backdrop-blur-md bg-white bg-opacity-40"
        >
          <SplitText
            text="Welcome to BTech Wala Honey 🍯"
            className="text-4xl font-extrabold text-yellow-900 mb-6 tracking-wide font-serif"
            delay={80}
            duration={0.5}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />

          <p
            ref={descRef}
            className="mb-8 text-lg text-yellow-900 leading-relaxed font-serif"
          >
            Discover the richness of pure, organic honey harvested with love.
            Taste nature’s sweetest gift in every drop!
          </p>

          <div ref={buttonsRef} className="space-x-6">
            <Link
              to="/login"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-full transition duration-300 shadow"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="border border-yellow-400 hover:bg-yellow-400 hover:text-black text-yellow-700 font-semibold px-5 py-2 rounded-full transition duration-300 shadow"
            >
              Signup
            </Link>
          </div>

          <button
            onClick={handleShopClick}
            className="mt-6 bg-white text-yellow-800 hover:bg-yellow-100 px-6 py-2 rounded-full font-bold text-lg transition duration-300 shadow-lg"
          >
            🛒 Shop Now
          </button>
        </div>

        {/* Floating Videos */}
{/* Floating Videos */}
            <video
            src="/assets/honey.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute bottom-6 left-6 w-20 h-20 rounded-md object-cover animate-float-slow z-10"
            />

            <video
            src="/assets/beehive.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute bottom-6 right-6 w-20 h-20 rounded-md object-cover animate-float-fast z-10"
            />

      </div>
    </div>
  );
}
