import { useState } from "react";

const honeyProducts = [
  {
    id: 1,
    name: "Organic Wild Honey",
    img: "/assets/h1.jpg",
    purity: "100%",
    time: "Spring",
    rate: 799,
    content: "Raw",
    volume: "1L",
  },
  {
    id: 2,
    name: "Tulsi Infused Honey",
    img: "/assets/h1.jpg",
    purity: "95%",
    time: "Winter",
    rate: 699,
    content: "Infused",
    volume: "1L",
  },
  {
    id: 3,
    name: "Multiflora Mountain Honey",
    img: "/assets/h1.jpg",
    purity: "100%",
    time: "Monsoon",
    rate: 999,
    content: "Multi-flora",
    volume: "2L",
  },
  // Add more products if needed
];

export default function ProductSection() {
  const [filters, setFilters] = useState({
    purity: "",
    time: "",
    content: "",
    volume: "",
    sort: "",
  });

  const filteredProducts = honeyProducts
    .filter((item) =>
      (!filters.purity || item.purity === filters.purity) &&
      (!filters.time || item.time === filters.time) &&
      (!filters.content || item.content === filters.content) &&
      (!filters.volume || item.volume === filters.volume)
    )
    .sort((a, b) => {
      if (filters.sort === "low") return a.rate - b.rate;
      if (filters.sort === "high") return b.rate - a.rate;
      return 0;
    });

  return (
    <section className="bg-white/90 backdrop-blur-md text-black px-8 py-16">
      <h2 className="text-4xl font-bold text-center mb-8 text-yellow-800">Our Honey Products</h2>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10 text-sm font-medium">
        <select onChange={(e) => setFilters({ ...filters, purity: e.target.value })}>
          <option value="">Purity</option>
          <option value="100%">100%</option>
          <option value="95%">95%</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, time: e.target.value })}>
          <option value="">Harvest Time</option>
          <option value="Spring">Spring</option>
          <option value="Winter">Winter</option>
          <option value="Monsoon">Monsoon</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, content: e.target.value })}>
          <option value="">Content</option>
          <option value="Raw">Raw</option>
          <option value="Infused">Infused</option>
          <option value="Multi-flora">Multi-flora</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, volume: e.target.value })}>
          <option value="">Volume</option>
          <option value="1L">1L</option>
          <option value="2L">2L</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, sort: e.target.value })}>
          <option value="">Sort by Rate</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <img src={product.img} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p>Purity: {product.purity}</p>
              <p>Harvest: {product.time}</p>
              <p>Content: {product.content}</p>
              <p>Volume: {product.volume}</p>
              <p className="mt-2 text-yellow-700 font-bold text-lg">₹{product.rate}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
