import React from "react";

const categories = [
  {
    title: "Earbuds",
    description: "Compact, wireless, and crystal clear.",
    imageUrl: "https://placehold.co/600x400/0a0a0a/facc15?text=Earbuds",
    href: "/shop/earbuds",
  },
  {
    title: "Headphones",
    description: "Immersive sound with noise cancellation.",
    imageUrl: "https://placehold.co/600x400/0a0a0a/facc15?text=Headphones",
    href: "/shop/headphones",
  },
  {
    title: "Accessories",
    description: "Chargers, cases, and premium add-ons.",
    imageUrl: "https://placehold.co/600x400/0a0a0a/facc15?text=Accessories",
    href: "/shop/accessories",
  },
];

export default function CategoryNavigator() {
  return (
    <div className="bg-[#0a0a0a] py-20 px-6 sm:px-12 text-center">
      {/* Header */}
      <h2
        className="text-4xl sm:text-5xl font-extrabold text-yellow-400 tracking-widest drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
        style={{ fontFamily: "monospace" }}
      >
        Shop by Category
      </h2>
      <p
        className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
        style={{ fontFamily: "monospace" }}
      >
        Discover gadgets that elevate your experience — only at GadgetHub.
      </p>

      {/* Category Cards */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((category) => (
          <a
            key={category.title}
            href={category.href}
            className="group relative overflow-hidden rounded-xl border border-yellow-400/30 
                       bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] 
                       shadow-[0_0_15px_rgba(250,204,21,0.08)]
                       transition-all duration-300 hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] hover:-translate-y-1"
          >
            <img
              src={category.imageUrl}
              alt={category.title}
              className="h-64 w-full object-cover opacity-40 group-hover:opacity-50 transition-all duration-300"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/600x400/000000/ffffff?text=Image+Error";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            <div className="absolute bottom-0 left-0 p-6 text-left">
              <h3
                className="text-3xl font-extrabold text-yellow-400 tracking-wide"
                style={{ fontFamily: "monospace" }}
              >
                {category.title}
              </h3>
              <p className="text-gray-300 text-sm mt-1">{category.description}</p>

              <button
                className="relative mt-4 px-5 py-2 rounded-md border border-yellow-400 text-yellow-400 
                           font-semibold tracking-wide transition-all duration-300 
                           hover:bg-yellow-400 hover:text-black 
                           hover:shadow-[0_0_15px_rgba(250,204,21,0.7)]"
                style={{ fontFamily: "monospace" }}
              >
                Shop Now
              </button>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
