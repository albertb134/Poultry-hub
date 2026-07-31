import React, { useState, useMemo } from "react";

// ---- Signature element: hand-drawn chicken mark ----
function ChickenMark({ size = 32, color = "#1F5C3F" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 40c-6 0-10-5-10-11 0-5 3-9 8-10-1-3 0-6 3-8 3-2 7-1 9 2 2-2 5-2 7 0 3-2 7-1 8 2 1 2 0 5-2 6 5 1 9 5 9 10 0 6-4 11-10 11"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M20 40c0 8 5 14 12 14s12-6 12-14" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="26" cy="24" r="2" fill={color} />
      <path d="M36 22l6-3-3 6z" fill="#E8A33D" />
      <path d="M22 15c1-3 3-4 5-4" stroke="#C64B3C" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ---- Seed data ----
const CITIES = ["Accra", "Kumasi", "Takoradi", "Tamale", "Ho", "Cape Coast"];
const CATEGORIES = ["Layers", "Broilers", "Cockerels", "Chicks", "Eggs", "Feed & Supplies"];

const LISTINGS = [
  { id: 1, title: "Sasso Layers, 20 weeks", category: "Layers", city: "Accra", price: 45, unit: "bird", seller: "Ama's Poultry Farm", qty: 120, desc: "Point-of-lay Sasso birds, vaccinated on schedule, ready for immediate pickup." },
  { id: 2, title: "Broiler batch, 6 weeks", category: "Broilers", city: "Kumasi", price: 38, unit: "bird", seller: "Kumasi Agro Farms", qty: 300, desc: "Healthy broilers raised on quality feed, dressed weight averaging 1.8kg." },
  { id: 3, title: "Kuroiler Cockerels", category: "Cockerels", city: "Accra", price: 55, unit: "bird", seller: "Ablekuma Poultry", qty: 40, desc: "Hardy dual-purpose cockerels, good for backyard flock improvement." },
  { id: 4, title: "Day-old chicks (Kuroiler)", category: "Chicks", city: "Tamale", price: 12, unit: "bird", seller: "Northern Hatchery", qty: 500, desc: "Vaccinated day-old chicks, minimum order 20." },
  { id: 5, title: "Fresh brown eggs, crate", category: "Eggs", city: "Takoradi", price: 42, unit: "crate", seller: "Coastal Egg Suppliers", qty: 80, desc: "Fresh table eggs, delivered same day within Takoradi metro." },
  { id: 6, title: "Easter Egger chicks (blue eggs)", category: "Chicks", city: "Accra", price: 18, unit: "bird", seller: "Ablekuma Poultry", qty: 60, desc: "Cross-bred for blue-green eggs, great for niche buyers." },
  { id: 7, title: "Layer mash, 50kg bag", category: "Feed & Supplies", city: "Ho", price: 320, unit: "bag", seller: "Volta Feed Mills", qty: 200, desc: "Balanced layer mash, 16% protein, freshly milled." },
  { id: 8, title: "Broiler starter feed, 25kg", category: "Feed & Supplies", city: "Cape Coast", price: 175, unit: "bag", seller: "Coastal Feed Depot", qty: 150, desc: "Starter feed for chicks 0–3 weeks." },
  { id: 9, title: "Point-of-lay Sasso hens", category: "Layers", city: "Kumasi", price: 48, unit: "bird", seller: "Ashanti Layers Co-op", qty: 90, desc: "Ready-to-lay hens, brown egg producers, bulk discounts available." },
];

function currency(n) {
  return `GH₵ ${n.toLocaleString()}`;
}

// ---- Listing card ----
function ListingCard({ item, onOpen }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className="text-left bg-white border border-emerald-100 rounded-2xl p-4 hover:border-emerald-400 hover:shadow-md transition-all duration-200 flex flex-col gap-2 w-full"
    >
      <div className="flex items-start justify-between">
        <span className="text-[11px] uppercase tracking-wide font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
          {item.category}
        </span>
        <span className="text-[11px] text-stone-400">{item.city}</span>
      </div>
      <h3 className="text-base font-semibold text-stone-800 leading-snug">{item.title}</h3>
      <p className="text-sm text-stone-500 line-clamp-2">{item.desc}</p>
      <div className="flex items-end justify-between pt-1">
        <div>
          <span className="text-lg font-bold text-emerald-800">{currency(item.price)}</span>
          <span className="text-xs text-stone-400"> /{item.unit}</span>
        </div>
        <span className="text-xs text-stone-400">{item.qty} available</span>
      </div>
    </button>
  );
}

// ---- Detail modal ----
function DetailModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div
      className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 relative animate-[fadeIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-xl leading-none"
          aria-label="Close"
        >
          ×
        </button>
        <span className="text-[11px] uppercase tracking-wide font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
          {item.category}
        </span>
        <h2 className="text-xl font-bold text-stone-800 mt-3">{item.title}</h2>
        <p className="text-sm text-stone-500 mt-1">{item.city} · Sold by {item.seller}</p>
        <p className="text-stone-600 mt-4 text-sm leading-relaxed">{item.desc}</p>
        <div className="flex items-center justify-between mt-6 border-t border-stone-100 pt-4">
          <div>
            <span className="text-2xl font-bold text-emerald-800">{currency(item.price)}</span>
            <span className="text-sm text-stone-400"> /{item.unit}</span>
          </div>
          <span className="text-sm text-stone-400">{item.qty} available</span>
        </div>
        <button className="w-full mt-5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-xl transition-colors">
          Contact seller
        </button>
      </div>
    </div>
  );
}

// ---- Sell form ----
function SellForm({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "", category: CATEGORIES[0], city: CITIES[0], price: "", unit: "bird", qty: "", desc: "",
  });

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.price) return;
    onSubmit({ ...form, id: Date.now(), price: Number(form.price), qty: Number(form.qty) || 0 });
  }

  return (
    <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4" onClick={onClose}>
      <div
        className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-stone-800">List something for sale</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 text-xl leading-none" aria-label="Close">×</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-sm font-medium text-stone-600">
            Title
            <input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. Sasso Layers, 20 weeks"
              className="mt-1 w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm font-medium text-stone-600">
              Category
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="mt-1 w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium text-stone-600">
              City
              <select
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className="mt-1 w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <label className="text-sm font-medium text-stone-600 col-span-1">
              Price (GH₵)
              <input
                type="number" min="0"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                className="mt-1 w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
            </label>
            <label className="text-sm font-medium text-stone-600 col-span-1">
              Unit
              <input
                value={form.unit}
                onChange={(e) => update("unit", e.target.value)}
                placeholder="bird / crate / bag"
                className="mt-1 w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </label>
            <label className="text-sm font-medium text-stone-600 col-span-1">
              Quantity
              <input
                type="number" min="0"
                value={form.qty}
                onChange={(e) => update("qty", e.target.value)}
                className="mt-1 w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </label>
          </div>
          <label className="text-sm font-medium text-stone-600">
            Description
            <textarea
              value={form.desc}
              onChange={(e) => update("desc", e.target.value)}
              rows={3}
              placeholder="Age, vaccination status, condition, pickup details..."
              className="mt-1 w-full border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
            />
          </label>
          <button type="submit" className="mt-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-xl transition-colors">
            Post listing
          </button>
        </form>
      </div>
    </div>
  );
}

export default function PoultryHub() {
  const [city, setCity] = useState("All cities");
  const [category, setCategory] = useState("All categories");
  const [query, setQuery] = useState("");
  const [listings, setListings] = useState(LISTINGS);
  const [selected, setSelected] = useState(null);
  const [showSellForm, setShowSellForm] = useState(false);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const matchesCity = city === "All cities" || l.city === city;
      const matchesCategory = category === "All categories" || l.category === category;
      const matchesQuery = l.title.toLowerCase().includes(query.toLowerCase());
      return matchesCity && matchesCategory && matchesQuery;
    });
  }, [listings, city, category, query]);

  function handleNewListing(item) {
    setListings((prev) => [item, ...prev]);
    setShowSellForm(false);
  }

  return (
    <div className="min-h-screen bg-emerald-50/40 font-[system-ui]">
      {/* Header */}
      <header className="bg-emerald-800 text-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChickenMark size={30} color="#ffffff" />
            <span className="font-bold text-lg tracking-tight">PoultryHub</span>
          </div>
          <button
            onClick={() => setShowSellForm(true)}
            className="bg-white text-emerald-800 text-sm font-semibold px-4 py-2 rounded-full hover:bg-emerald-50 transition-colors"
          >
            + Sell
          </button>
        </div>
      </header>

      {/* Search + filters */}
      <div className="max-w-5xl mx-auto px-4 pt-5 pb-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search layers, broilers, feed..."
          className="w-full border border-emerald-200 bg-white rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-stone-400"
        />
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 -mx-4 px-4">
          {["All cities", ...CITIES].map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                city === c ? "bg-emerald-700 text-white border-emerald-700" : "bg-white text-stone-600 border-stone-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-2 overflow-x-auto pb-2 -mx-4 px-4">
          {["All categories", ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                category === c ? "bg-amber-500 text-white border-amber-500" : "bg-white text-stone-600 border-stone-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Listings grid */}
      <main className="max-w-5xl mx-auto px-4 pb-16">
        <p className="text-xs text-stone-400 mb-3">{filtered.length} listing{filtered.length !== 1 ? "s" : ""}</p>
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <ChickenMark size={40} color="#c8d8ce" />
            <p className="mt-3 text-sm">Nothing matches yet. Try a different filter or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <ListingCard key={item.id} item={item} onOpen={setSelected} />
            ))}
          </div>
        )}
      </main>

      <DetailModal item={selected} onClose={() => setSelected(null)} />
      {showSellForm && <SellForm onClose={() => setShowSellForm(false)} onSubmit={handleNewListing} />}
    </div>
  );
}
