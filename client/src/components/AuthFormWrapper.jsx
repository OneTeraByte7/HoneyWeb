// src/components/AuthFormWrapper.jsx
export default function AuthFormWrapper({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-yellow-200">
        <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">{title} 🍯</h2>
        {children}
      </div>
    </div>
  );
}
