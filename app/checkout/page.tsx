
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  User,
  Phone,
  Mail,
  CreditCard,
  Wallet,
  Banknote,
  ShieldCheck,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";

type CartItem = {
  productId: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("shoppilot-cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }
  }, []);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal === 0 || subtotal >= 200 ? 0 : 10;
  const total = subtotal + shipping;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cart.length === 0) return;

    setLoading(true);

    const order = {
      orderId: `SP-${Date.now()}`,
      customer: form,
      items: cart,
      paymentMethod,
      subtotal,
      shipping,
      total,
      createdAt: new Date().toISOString(),
      status: "Pending",
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("shoppilot-orders") || "[]"
    );

    existingOrders.push(order);

    localStorage.setItem(
      "shoppilot-orders",
      JSON.stringify(existingOrders)
    );

    localStorage.setItem("shoppilot-cart", "[]");
    window.dispatchEvent(new Event("cartUpdated"));
    setCart([]);
    setLoading(false);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-6 py-16">
        <div className="w-full max-w-lg rounded-[28px] bg-white p-8 text-center shadow-sm md:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 size={42} className="text-green-500" />
          </div>

          <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-green-600">
            Order successful
          </p>

          <h1 className="mt-3 text-3xl font-black text-[#171717]">
            Thank you!
          </h1>

          <p className="mt-4 text-sm leading-7 text-gray-500">
            Your demo order has been placed successfully. We appreciate
            your shopping with ShopPilot.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#171717] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#e66b3d]"
          >
            Continue Shopping <ArrowRight size={17} />
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#faf9f6] px-6 text-center">
        <ShoppingBag size={45} className="text-[#e66b3d]" />

        <h1 className="mt-6 text-3xl font-black">
          Your cart is empty
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Add some sneakers before proceeding to checkout.
        </p>

        <Link
          href="/products"
          className="mt-7 rounded-xl bg-[#171717] px-7 py-4 text-sm font-bold text-white"
        >
          Explore Products
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/cart"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#e66b3d]"
        >
          <ArrowLeft size={17} />
          Back to Cart
        </Link>

        <div className="mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#e66b3d]">
            Almost there
          </p>

          <h1 className="text-4xl font-black text-[#171717] md:text-5xl">
            Checkout<span className="text-[#e66b3d]">.</span>
          </h1>

          <p className="mt-4 text-sm text-gray-500">
            Complete your information to place your order.
          </p>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid gap-10 lg:grid-cols-[1fr_400px]"
        >
          {/* Customer Information */}
          <div className="space-y-8">
            <section className="rounded-2xl bg-white p-6 md:p-8">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#e66b3d]">
                  <User size={20} />
                </div>

                <div>
                  <h2 className="font-black text-[#171717]">
                    Customer Information
                  </h2>
                  <p className="mt-1 text-xs text-gray-400">
                    Tell us who is placing the order.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-bold">
                    Full Name
                  </label>

                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-200 bg-[#faf9f6] px-4 py-4 text-sm outline-none focus:border-[#e66b3d]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="example@email.com"
                      className="w-full rounded-xl border border-gray-200 bg-[#faf9f6] py-4 pl-11 pr-4 text-sm outline-none focus:border-[#e66b3d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+880 1XXXXXXXXX"
                      className="w-full rounded-xl border border-gray-200 bg-[#faf9f6] py-4 pl-11 pr-4 text-sm outline-none focus:border-[#e66b3d]"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Delivery Address */}
            <section className="rounded-2xl bg-white p-6 md:p-8">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#e66b3d]">
                  <MapPin size={20} />
                </div>

                <div>
                  <h2 className="font-black text-[#171717]">
                    Delivery Address
                  </h2>
                  <p className="mt-1 text-xs text-gray-400">
                    Where should we deliver your sneakers?
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-bold">
                    Street Address
                  </label>

                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    placeholder="House, road, area..."
                    className="w-full rounded-xl border border-gray-200 bg-[#faf9f6] px-4 py-4 text-sm outline-none focus:border-[#e66b3d]"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold">
                      City
                    </label>

                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      placeholder="Dhaka"
                      className="w-full rounded-xl border border-gray-200 bg-[#faf9f6] px-4 py-4 text-sm outline-none focus:border-[#e66b3d]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold">
                      Postal Code
                    </label>

                    <input
                      name="postalCode"
                      value={form.postalCode}
                      onChange={handleChange}
                      required
                      placeholder="1200"
                      className="w-full rounded-xl border border-gray-200 bg-[#faf9f6] px-4 py-4 text-sm outline-none focus:border-[#e66b3d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold">
                    Delivery Notes (Optional)
                  </label>

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any special delivery instructions?"
                    className="w-full resize-none rounded-xl border border-gray-200 bg-[#faf9f6] px-4 py-4 text-sm outline-none focus:border-[#e66b3d]"
                  />
                </div>
              </div>
            </section>

            {/* Payment Methods */}
            <section className="rounded-2xl bg-white p-6 md:p-8">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#e66b3d]">
                  <CreditCard size={20} />
                </div>

                <div>
                  <h2 className="font-black text-[#171717]">
                    Payment Method
                  </h2>
                  <p className="mt-1 text-xs text-gray-400">
                    Choose how you want to pay.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: "cod",
                    title: "Cash on Delivery",
                    description: "Pay when your order arrives.",
                    Icon: Banknote,
                  },
                  {
                    id: "bkash",
                    title: "bKash",
                    description: "Mobile financial payment (demo only).",
                    Icon: Wallet,
                  },
                  {
                    id: "card",
                    title: "Credit / Debit Card",
                    description: "Secure card payment (demo only).",
                    Icon: CreditCard,
                  },
                ].map(({ id, title, description, Icon }) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => setPaymentMethod(id)}
                    className={`flex w-full items-center gap-4 rounded-xl border p-5 text-left transition ${
                      paymentMethod === id
                        ? "border-[#e66b3d] bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Icon
                      size={22}
                      className={
                        paymentMethod === id
                          ? "text-[#e66b3d]"
                          : "text-gray-400"
                      }
                    />

                    <div className="flex-1">
                      <p className="text-sm font-bold">{title}</p>
                      <p className="mt-1 text-xs text-gray-400">
                        {description}
                      </p>
                    </div>

                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        paymentMethod === id
                          ? "border-[#e66b3d] bg-[#e66b3d] text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === id && <CheckCircle2 size={14} />}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <aside className="h-fit rounded-2xl bg-white p-6 md:p-8 lg:sticky lg:top-8">
            <h2 className="text-xl font-black text-[#171717]">
              Your Order
            </h2>

            <div className="mt-7 max-h-72 space-y-5 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-4"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f0ede8]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />

                    <span className="absolute -right-0 -top-0 rounded-bl-lg bg-[#171717] px-2 py-1 text-[10px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-bold">{item.name}</h3>
                    <p className="mt-1 text-xs text-gray-400">
                      Size: {item.size}
                    </p>
                    <p className="mt-2 text-sm font-bold text-[#e66b3d]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 space-y-4 border-t border-gray-100 pt-6">
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

              <div className="flex justify-between border-t border-gray-100 pt-5">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-black text-[#e66b3d]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-[#171717] py-5 text-sm font-bold text-white transition hover:bg-[#e66b3d] disabled:opacity-50"
            >
              {loading ? "Processing..." : "Place Order"}
              <ArrowRight size={17} />
            </button>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck size={15} />
              Your information is kept secure.
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}
