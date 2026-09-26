import { useState } from "react";

const products = {
  shirts: [
    {
      name: "Classic Formal Shirt",
      image: "/resources/shirts/shirt-1.jpg",
    },
    {
      name: "Premium Cotton Shirt",
      image: "/resources/shirts/shirt-2.jpg",
    },
    {
      name: "Corporate Oxford Shirt",
      image: "/resources/shirts/shirt-3.jpg",
    },
    {
      name: "Executive Shirt",
      image: "/resources/shirts/shirt-4.jpg",
    },
    {
      name: "Slim Fit Shirt",
      image: "/resources/shirts/shirt-5.jpg",
    },
    {
      name: "Everyday Corporate Shirt",
      image: "/resources/shirts/shirt-6.jpg",
    },
    {
      name: "Classic Business Shirt",
      image: "/resources/shirts/shirt-7.jpg",
    },
    {
      name: "Premium Formal Shirt",
      image: "/resources/shirts/shirt-8.jpg",
    },
    {
      name: "Corporate Essential Shirt",
      image: "/resources/shirts/shirt-9.jpg",
    },
    {
      name: "Executive Cotton Shirt",
      image: "/resources/shirts/shirt-10.jpg",
    },
  ],

  tshirts: [
    {
      name: "Classic T-Shirt",
      image: "/resources/tshirts/tshirt-1.jpg",
    },
    {
      name: "Premium T-Shirt",
      image: "/resources/tshirts/tshirt-2.jpg",
    },
    {
      name: "Crew Neck T-Shirt",
      image: "/resources/tshirts/tshirt-3.jpg",
    },
    {
      name: "Corporate T-Shirt",
      image: "/resources/tshirts/tshirt-4.jpg",
    },
    {
      name: "Premium Crew T-Shirt",
      image: "/resources/tshirts/tshirt-5.jpg",
    },
    {
      name: "Everyday T-Shirt",
      image: "/resources/tshirts/tshirt-6.jpg",
    },
    {
      name: "Classic Cotton T-Shirt",
      image: "/resources/tshirts/tshirt-7.jpg",
    },
    {
      name: "Team T-Shirt",
      image: "/resources/tshirts/tshirt-8.jpg",
    },
    {
      name: "Performance T-Shirt",
      image: "/resources/tshirts/tshirt-9.jpg",
    },
    {
      name: "Corporate Essential T-Shirt",
      image: "/resources/tshirts/tshirt-10.jpg",
    },
  ],

  polos: [
    {
      name: "Classic Polo",
      image: "/resources/polos/polo-1.jpg",
    },
    {
      name: "Premium Polo",
      image: "/resources/polos/polo-2.jpg",
    },
    {
      name: "Corporate Polo",
      image: "/resources/polos/polo-3.jpg",
    },
    {
      name: "Performance Polo",
      image: "/resources/polos/polo-4.jpg",
    },
    {
      name: "Classic Cotton Polo",
      image: "/resources/polos/polo-5.jpg",
    },
    {
      name: "Premium Corporate Polo",
      image: "/resources/polos/polo-6.jpg",
    },
    {
      name: "Team Polo",
      image: "/resources/polos/polo-7.jpg",
    },
    {
      name: "Everyday Polo",
      image: "/resources/polos/polo-8.jpg",
    },
    {
      name: "Executive Polo",
      image: "/resources/polos/polo-9.jpg",
    },
    {
      name: "Performance Corporate Polo",
      image: "/resources/polos/polo-10.jpg",
    },
  ],

  jackets: [
    {
      name: "Corporate Jacket",
      image: "/resources/jackets/jacket-1.jpg",
    },
    {
      name: "Lightweight Jacket",
      image: "/resources/jackets/jacket-2.jpg",
    },
    {
      name: "Premium Jacket",
      image: "/resources/jackets/jacket-3.jpg",
    },
    {
      name: "Corporate Bomber Jacket",
      image: "/resources/jackets/jacket-4.jpg",
    },
    {
      name: "Executive Jacket",
      image: "/resources/jackets/jacket-5.jpg",
    },
    {
      name: "Team Jacket",
      image: "/resources/jackets/jacket-6.jpg",
    },
    {
      name: "Winter Jacket",
      image: "/resources/jackets/jacket-7.jpg",
    },
    {
      name: "Performance Jacket",
      image: "/resources/jackets/jacket-8.jpg",
    },
    {
      name: "Everyday Jacket",
      image: "/resources/jackets/jacket-9.jpg",
    },
    {
      name: "Corporate Essential Jacket",
      image: "/resources/jackets/jacket-10.jpg",
    },
  ],
};

const categories = [
  { id: "shirts", label: "Shirts" },
  { id: "tshirts", label: "T-Shirts" },
  { id: "polos", label: "Polos" },
  { id: "jackets", label: "Jackets" },
];

export default function ProductResources() {
  const [activeCategory, setActiveCategory] = useState("shirts");

  const activeProducts = products[activeCategory];

  return (
    <section
      className="
        bg-white
        px-6 py-20
        sm:px-8 sm:py-24
        lg:px-12 lg:py-28
      "
    >
      <div className="mx-auto w-[95vw] max-w-none">

        {/* Category Switcher */}
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-2
            rounded-full
            border border-[#113858]/10
            bg-white
            p-2
            sm:mx-auto
            sm:w-fit
          "
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`
  rounded-full
  border
  px-5 py-3
  text-[12px]
  font-semibold
  transition-all duration-300
  sm:px-7
  ${
    isActive
      ? "border-[#113858] bg-[#113858] text-white"
      : "border-[#113858] bg-white text-black hover:bg-white"
  }
`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Products */}
        <div
          className="
            mt-12
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {activeProducts.map((product, index) => (
            <div
              key={`${activeCategory}-${index}`}
              className="
                group
                overflow-hidden
                rounded-[22px]
                border border-[#113858]/10
                bg-white
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_12px_35px_rgba(17,56,88,0.08)]
              "
            >
              {/* Product Image */}
              <div className="aspect-[4/3] overflow-hidden bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                />
              </div>

              {/* Product Info */}
              <div className="p-5 sm:p-6">
                <h3
                  className="
                    text-[17px]
                    font-semibold
                    tracking-[-0.02em]
                    text-[#113858]
                  "
                >
                  {product.name}
                </h3>

                <p
                  className="
                    mt-2
                    text-[12px]
                    leading-[1.6]
                    text-[#607487]
                  "
                >
                  Customisable corporate apparel
                </p>
              </div>
            </div>
          ))}
        </div>

        

      </div>
    </section>
  );
}