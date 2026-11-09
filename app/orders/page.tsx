
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  ArrowRight,
  ShoppingBag,
  CalendarDays,
  Truck,
  CheckCircle2,
  Clock,
} from "lucide-react";

type Order = {
  orderId: string;
  customer: {
    fullName: string;
    email: string;
  };
  items: {
    productId: number;
    name: string;
    price: number;
    image: string;
    size: string;
    quantity: number;
  }[];
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
  status: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem("shoppilot-orders");

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading orders...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-6xl mx-auto px-5 py-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div>
            <p className="text-sm font-semibold text-[#e66b3d] uppercase tracking-[3px]">
              Your Account
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-[#171717] mt-3">
              My <span className="font-serif italic text-[#e66b3d]">Orders.</span>
            </h1>

            <p className="text-gray-500 mt-3">
              Track your purchases and check your order history.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#171717] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#e66b3d] transition"
          >
            Continue Shopping <ArrowRight size={17} />
          </Link>
        </div>

        {/* Order Count */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-orange-50 text-[#e66b3d] flex items-center justify-center">
            <Package size={27} />
          </div>

          <div>
            <p className="text-2xl font-bold text-[#171717]">
              {orders.length}
            </p>
            <p className="text-sm text-gray-500">Total Orders</p>
          </div>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-orange-50 text-[#e66b3d] flex items-center justify-center mx-auto mb-5">
              <ShoppingBag size={35} />
            </div>

            <h2 className="text-2xl font-bold text-[#171717]">
              No orders yet!
            </h2>

            <p className="text-gray-500 mt-2 mb-7">
              Your shopping journey starts here.
            </p>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#e66b3d] text-white px-7 py-3 rounded-full font-semibold hover:bg-[#171717] transition"
            >
              Explore Products <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {[...orders].reverse().map((order) => (
              <div
                key={order.orderId}
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Order ID
                    </p>

                    <h3 className="font-bold text-lg mt-1">
                      {order.orderId}
                    </h3>

                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">
                      <CalendarDays size={15} />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-4 py-2 rounded-full bg-orange-50 text-[#e66b3d] text-xs font-bold">
                      <Clock size={13} className="inline mr-1" />
                      {order.status}
                    </span>

                    <p className="text-xl font-bold">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Products */}
                <div className="p-6 space-y-5">
                  {order.items.map((item, index) => (
                    <div
                      key={`${item.productId}-${item.size}-${index}`}
                      className="flex items-center gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover bg-[#f3eee7]"
                      />

                      <div className="flex-1">
                        <h4 className="font-bold text-[#171717]">
                          {item.name}
                        </h4>

                        <p className="text-sm text-gray-500 mt-1">
                          Size: EU {item.size} · Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                
{/* Footer */}
<div className="bg-[#faf9f6] px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm">

  <div className="space-y-2">
    <p className="text-gray-500">
      Payment:{" "}
      <span className="font-semibold text-[#171717] uppercase">
        {order.paymentMethod}
      </span>
    </p>

    <p className="text-gray-500">
      Order Total:{" "}
      <span className="font-bold text-[#171717]">
        ${order.total.toFixed(2)}
      </span>
    </p>
  </div>

  <Link
    href={`/orders/${order.orderId}`}
    className="inline-flex items-center gap-2 text-[#e66b3d] font-semibold hover:gap-3 transition-all"
  >
    View Details <ArrowRight size={16} />
  </Link>

</div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
