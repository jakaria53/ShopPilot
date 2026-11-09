
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  image: string;
  rating: number;
  reviews: number;
  discount: number;
};

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedProducts = localStorage.getItem("shoppilot-products");
    const savedWishlist = localStorage.getItem("shoppilot-wishlist");

    if (savedProducts && savedWishlist) {
      try {
        const allProducts: Product[] = JSON.parse(savedProducts);
        const wishlistIds: number[] = JSON.parse(savedWishlist);

        const wishlistProducts = allProducts.filter((product) =>
          wishlistIds.includes(product.id)
        );

        setProducts(wishlistProducts);
      } catch (error) {
        console.error("Failed to load wishlist:", error);
      }
    }

    setLoading(false);
  }, []);

  const handleRemove = (productId: number) => {
    const savedWishlist = JSON.parse(
      localStorage.getItem("shoppilot-wishlist") || "[]"
    );

    const updatedWishlist = savedWishlist.filter(
      (id: number) => id !== productId
    );

    localStorage.setItem(
      "shoppilot-wishlist",
      JSON.stringify(updatedWishlist)
    );

    setProducts((previousProducts) =>
      previousProducts.filter((product) => product.id !== productId)
    );
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
        <p className="text-sm font-semibold text-gray-500">
          Loading wishlist...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">

        <Link
          href="/products"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#e66b3d]"
        >
          <ArrowLeft size={17} />
          Continue Shopping
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-3">
            <Heart size={28} className="text-[#e66b3d]" />
            <h1 className="text-3xl font-black text-[#171717] md:text-4xl">
              My Wishlist
            </h1>
          </div>

          <p className="mt-3 text-sm text-gray-500">
            Your favorite sneakers, all in one place.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl bg-white px-6 py-20 text-center">
            <Heart size={48} className="mx-auto text-gray-300" />

            <h2 className="mt-5 text-xl font-bold text-[#171717]">
              Your Wishlist is Empty
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              You haven't saved any sneakers yet.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#171717] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#e66b3d]"
            >
              <ShoppingBag size={17} />
              Explore Products
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm font-semibold text-gray-500">
              {products.length} saved {products.length === 1 ? "item" : "items"}
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-3xl bg-white"
                >
                  <Link
                    href={`/products/${product.id}`}
                    className="relative block aspect-square overflow-hidden bg-[#f0ede8]"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-2 text-xs font-bold text-[#e66b3d]">
                      {product.discount}% OFF
                    </span>
                  </Link>

                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#e66b3d]">
                      {product.category}
                    </p>

                    <h2 className="mt-2 text-lg font-bold text-[#171717]">
                      {product.name}
                    </h2>

                    <div className="mt-3 flex items-center gap-3">
                      <span className="text-xl font-black">
                        ${product.price}
                      </span>

                      <span className="text-sm text-gray-400 line-through">
                        ${product.oldPrice}
                      </span>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <Link
                        href={`/products/${product.id}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#171717] py-3 text-sm font-bold text-white transition hover:bg-[#e66b3d]"
                      >
                        <ShoppingBag size={16} />
                        View Product
                      </Link>

                      <button
                        onClick={() => handleRemove(product.id)}
                        aria-label={`Remove ${product.name} from wishlist`}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
