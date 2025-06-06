import { useState } from "react";
import { useCart } from "./CartContext";

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
    description: "Collected from Himalayan wildflowers during spring. Rich in enzymes and antioxidants.",
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
    description: "Infused with organic tulsi leaves. Boosts immunity and relieves cold symptoms.",
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
    description: "Harvested from diverse mountain flora. Thick texture, strong floral aroma.",
  },
];

export default function ProductSection() {
  const { addToCart } = useCart();

  const defaultFilters = {
    purity: "",
    time: "",
    content: "",
    volume: "",
    sort: "",
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [quantities, setQuantities] = useState({});

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const inputClass =
    "mt-1 w-full p-2 rounded bg-zinc-900 text-white border border-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500";

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

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) + delta, 0),
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 0;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantities((prev) => ({ ...prev, [product.id]: 0 }));
  };

  return (
    <section className="bg-black/80 text-white px-8 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-yellow-500">Our Honey Products</h2>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Filter Sidebar */}
        <aside className="lg:w-1/4 w-full bg-black/50 p-6 rounded-lg border border-yellow-900 shadow-md">
          <h3 className="text-xl font-semibold mb-6 text-yellow-400">Filters</h3>

          <div className="space-y-4 text-sm font-medium">
            <div>
              <label>Purity</label>
              <select
                value={filters.purity}
                onChange={(e) => setFilters({ ...filters, purity: e.target.value })}
                className={inputClass}
              >
                <option value="">All</option>
                <option value="100%">100%</option>
                <option value="95%">95%</option>
              </select>
            </div>

            <div>
              <label>Harvest Time</label>
              <select
                value={filters.time}
                onChange={(e) => setFilters({ ...filters, time: e.target.value })}
                className={inputClass}
              >
                <option value="">All</option>
                <option value="Spring">Spring</option>
                <option value="Winter">Winter</option>
                <option value="Monsoon">Monsoon</option>
              </select>
            </div>

            <div>
              <label>Content</label>
              <select
                value={filters.content}
                onChange={(e) => setFilters({ ...filters, content: e.target.value })}
                className={inputClass}
              >
                <option value="">All</option>
                <option value="Raw">Raw</option>
                <option value="Infused">Infused</option>
                <option value="Multi-flora">Multi-flora</option>
              </select>
            </div>

            <div>
              <label>Volume</label>
              <select
                value={filters.volume}
                onChange={(e) => setFilters({ ...filters, volume: e.target.value })}
                className={inputClass}
              >
                <option value="">All</option>
                <option value="1L">1L</option>
                <option value="2L">2L</option>
              </select>
            </div>

            <div>
              <label>Sort By</label>
              <select
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                className={inputClass}
              >
                <option value="">None</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
            </div>

            <button
              onClick={clearFilters}
              className="mt-4 w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded transition"
            >
              Clear Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white/10 border border-yellow-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img src={product.img} alt={product.name} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-yellow-300 mb-1">{product.name}</h3>
                <p className="text-sm mb-2 text-white/80">{product.description}</p>
                <p className="text-sm">Purity: {product.purity}</p>
                <p className="text-sm">Harvest: {product.time}</p>
                <p className="text-sm">Content: {product.content}</p>
                <p className="text-sm">Volume: {product.volume}</p>
                <p className="mt-2 text-yellow-400 font-bold text-lg">₹{product.rate}</p>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between mt-4 mb-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(product.id, -1)}
                      className="bg-yellow-700 hover:bg-yellow-800 px-3 py-1 rounded text-white"
                    >
                      -
                    </button>
                    <span className="text-lg">{quantities[product.id] || 0}</span>
                    <button
                      onClick={() => handleQuantityChange(product.id, 1)}
                      className="bg-yellow-700 hover:bg-yellow-800 px-3 py-1 rounded text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!quantities[product.id]}
                  className={`w-full ${
                    !quantities[product.id]
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-yellow-600 hover:bg-yellow-700"
                  } text-white font-medium py-2 rounded transition`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
