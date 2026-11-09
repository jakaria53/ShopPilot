
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  ShieldCheck,
  Tag,
} from "lucide-react";

type CartItem = {
  productId: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("shoppilot-cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }

    setIsLoaded(true);
  }, []);


    useEffect(() => {
      if (isLoaded) {
        localStorage.setItem("shoppilot-cart", JSON.stringify(cart));

        window.dispatchEvent(new Event("cartUpdated"));
      }
    }, [cart, isLoaded]);


  const updateQuantity = (
    productId: number,
    size: string,
    change: number
  ) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId: number, size: string) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          !(item.productId === productId && item.size === size)
      )
    );
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal === 0 || subtotal >= 200 ? 0 : 10;
  const total = subtotal + shipping;

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
        <p className="text-sm text-gray-500">Loading your cart...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/products"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#e66b3d]"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#e66b3d]">
                Your Selection
              </p>

              <h1 className="text-4xl font-black tracking-tight text-[#171717] md:text-5xl">
                Shopping Cart<span className="text-[#e66b3d]">.</span>
              </h1>
            </div>

            <p className="text-sm text-gray-500">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items in
              your cart
            </p>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-[28px] bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f3eee7]">
              <ShoppingBag size={32} className="text-[#e66b3d]" />
            </div>

            <h2 className="mt-7 text-2xl font-black text-[#171717]">
              Your cart is empty
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              Looks like you haven't added any sneakers yet.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#171717] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#e66b3d]"
            >
              Explore Sneakers <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            {/* Cart Items */}
            <div>
              <div className="mb-5 hidden grid-cols-[1fr_100px_100px_80px] gap-4 border-b border-gray-200 pb-4 text-xs font-bold uppercase tracking-widest text-gray-400 md:grid">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span className="text-right">Total</span>
              </div>

              <div className="space-y-5">
                {cart.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="grid gap-5 rounded-2xl border border-gray-100 bg-white p-4 md:grid-cols-[1fr_100px_100px_80px] md:items-center md:gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f0ede8]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="font-bold text-[#171717]">
                          {item.name}
                        </h3>

                        <p className="mt-2 text-xs text-gray-400">
                          Size: {item.size}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          SKU: SP-{item.productId}
                        </p>

                        <button
                          onClick={() =>
                            removeItem(item.productId, item.size)
                          }
                          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-red-400 transition hover:text-red-600"
                        >
                          <Trash2 size={13} />
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:block">
                      <span className="text-xs text-gray-400 md:hidden">
                        Price
                      </span>
                      <span className="text-sm font-bold">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between md:block">
                      <span className="text-xs text-gray-400 md:hidden">
                        Quantity
                      </span>

                      <div className="flex w-fit items-center gap-4 rounded-lg border border-gray-200 px-3 py-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, -1)
                          }
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="text-sm font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, 1)
                          }
                          aria-label="Increase quantity"
                          disabled={item.quantity >= 10}
                          className="disabled:opacity-30"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end">
                      <span className="text-xs text-gray-400 md:hidden">
                        Total
                      </span>

                      <span className="text-sm font-black text-[#e66b3d]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex items-center justify-between">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#e66b3d]"
                >
                  <ArrowLeft size={16} />
                  Continue Shopping
                </Link>

                <button
                  onClick={() => setCart([])}
                  className="text-xs font-semibold text-red-400 transition hover:text-red-600"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <aside className="h-fit rounded-[24px] bg-white p-6 md:p-8">
              <h2 className="text-xl font-black text-[#171717]">
                Order Summary
              </h2>

              <div className="mt-7 space-y-5 border-b border-gray-100 pb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {subtotal > 0 && subtotal < 200 && (
                  <p className="rounded-lg bg-orange-50 p-3 text-xs leading-5 text-[#e66b3d]">
                    Add ${(200 - subtotal).toFixed(2)} more to unlock free
                    shipping!
                  </p>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Tag size={15} />
                  Taxes calculated at checkout.
                </div>
              </div>

              <div className="flex justify-between py-6">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-black text-[#e66b3d]">
                  ${total.toFixed(2)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#171717] py-5 text-sm font-bold text-white transition hover:bg-[#e66b3d]"
              >
                Proceed to Checkout
                <ArrowRight size={17} />
              </Link>

              <div className="mt-6 space-y-4 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <Truck size={17} className="text-[#e66b3d]" />
                  Free shipping on orders over $200
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <ShieldCheck size={17} className="text-[#e66b3d]" />
                  Secure checkout experience
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
