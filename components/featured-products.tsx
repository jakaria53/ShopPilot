
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Air Motion Red",
    category: "Running Shoes",
    price: 120,
    oldPrice: 150,
    rating: 4.8,
    reviews: 124,
    discount: "20% OFF",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
    bg: "bg-[#f5e6df]",
  },
  {
    id: 2,
    name: "Urban Street Pro",
    category: "Lifestyle Shoes",
    price: 95,
    oldPrice: 120,
    rating: 4.7,
    reviews: 98,
    discount: "21% OFF",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=700",
    bg: "bg-[#e8e9e5]",
  },
  {
    id: 3,
    name: "Cloud Flex White",
    category: "Casual Shoes",
    price: 110,
    oldPrice: 140,
    rating: 4.9,
    reviews: 156,
    discount: "21% OFF",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=700",
    bg: "bg-[#e9e3dc]",
  },
  {
    id: 4,
    name: "Retro Classic",
    category: "Classic Shoes",
    price: 85,
    oldPrice: 105,
    rating: 4.6,
    reviews: 87,
    discount: "19% OFF",
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=700",
    bg: "bg-[#e8e3d9]",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-[#faf9f6] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e66b3d]">
              Handpicked For You
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Featured <span className="font-serif font-medium italic text-[#e66b3d]">Products.</span>
            </h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-gray-500">
              Discover our most loved sneakers, selected for comfort,
              quality and everyday style.
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm font-bold hover:text-[#e66b3d]"
          >
            View All Products
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-[22px] border border-[#eee9e2] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <div className={`relative m-3 overflow-hidden rounded-[17px] ${product.bg}`}>
                <div className="relative h-[260px]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                <span className="absolute left-3 top-3 rounded-full bg-[#e66b3d] px-3 py-1.5 text-[10px] font-bold text-white">
                  {product.discount}
                </span>

                <button
                  aria-label={`Add ${product.name} to wishlist`}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition hover:bg-[#e66b3d] hover:text-white"
                >
                  <Heart size={17} />
                </button>
              </div>

              {/* Details */}
              <div className="px-5 pb-5 pt-2">
                <p className="text-xs font-medium text-gray-400">
                  {product.category}
                </p>

                <h3 className="mt-2 text-lg font-bold">
                  {product.name}
                </h3>

                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[#e69a35]">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold text-gray-700">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    ({product.reviews} reviews)
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-extrabold">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${product.oldPrice}
                    </span>
                  </div>

                  <button
                    aria-label={`Add ${product.name} to cart`}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#171717] text-white transition hover:bg-[#e66b3d]"
                  >
                    <ShoppingBag size={17} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
