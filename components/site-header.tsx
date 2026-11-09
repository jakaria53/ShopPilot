"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Heart } from "lucide-react";

export default function SiteHeader() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("shoppilot-cart");

      if (savedCart) {
        try {
          const cart = JSON.parse(savedCart);

          const totalItems = cart.reduce(
            (total: number, item: { quantity: number }) =>
              total + item.quantity,
            0
          );

          setCartCount(totalItems);
        } catch (error) {
          console.error("Failed to load cart count:", error);
        }
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-[#eae5de] bg-[#faf9f6]/95 shadow-[0_4px_24px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

        {/* Logo */}
        <Link
          href="/"
          className="group text-[34px] font-extrabold tracking-[-1.5px] text-[#191919] transition-colors duration-300 hover:text-[#e66b3d]"
        >
          Shop<span className="text-[#ffa600]">Pilot</span><span className="text-[#e6d157]">.</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-9 md:flex">
          <Link
            href="/"
            className="relative py-2 text-lg font-semibold text-[#e66b3d] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#e66b3d]"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="group relative py-2 text-lg font-medium text-[#55504b] transition-colors duration-300 hover:text-[#e66b3d]"
          >
            Products
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#e66b3d] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/categories"
            className="group relative py-2 text-lg font-medium text-[#55504b] transition-colors duration-300 hover:text-[#e66b3d]"
          >
            Categories
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#e66b3d] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/about"
            className="group relative py-2 text-lg font-medium text-[#55504b] transition-colors duration-300 hover:text-[#e66b3d]"
          >
            About
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#e66b3d] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/orders"
            className="group relative py-2 text-lg font-medium text-[#55504b] transition-colors duration-300 hover:text-[#e66b3d]"
          >
            My Orders
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#e66b3d] transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button
            aria-label="Search"
            className="text-[#35312d] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#e66b3d]"
          >
            <Search size={28} strokeWidth={2.1} />
          </button>

          <Link
            href="/wishlist"
            aria-label="My Wishlist"
            className="text-[#35312d] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#e66b3d]"
          >
            <Heart size={28} strokeWidth={2.1} />
          </Link>

          <Link
            href="/cart"
            aria-label={`Shopping cart with ${cartCount} items`}
            className="relative text-[#35312d] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#e66b3d]"
          >
            <ShoppingCart size={28} strokeWidth={2.1} />

            {cartCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e66b3d] px-1 text-[10px] font-bold text-white ring-2 ring-[#faf9f6]">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <button
            aria-label="User account"
            className="text-[#35312d] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#e66b3d]"
          >
            <User size={28} strokeWidth={2.1} />
          </button>
        </div>
      </div>
    </header>
  );
}