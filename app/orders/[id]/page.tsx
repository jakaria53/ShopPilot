"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
} from "lucide-react";

type Order = {
  orderId: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    notes?: string;
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

const trackingSteps = [
  {
    status: "Pending",
    title: "Order Placed",
    description: "We have received your order.",
    icon: Package,
  },
  {
    status: "Processing",
    title: "Processing",
    description: "Your order is being prepared.",
    icon: Clock,
  },
  {
    status: "Shipped",
    title: "Shipped",
    description: "Your package is on its way.",
    icon: Truck,
  },
  {
    status: "Delivered",
    title: "Delivered",
    description: "Your package has arrived.",
    icon: CheckCircle2,
  },
];

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem("shoppilot-orders");

    if (savedOrders) {
      const allOrders: Order[] = JSON.parse(savedOrders);

      const selectedOrder = allOrders.find(
        (item) => item.orderId === orderId
      );

      setOrder(selectedOrder || null);
    }

    setLoaded(true);
  }, [orderId]);

  if (!loaded) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
        Loading order...
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-[#faf9f6] flex items-center justify-center px-5">
        <div className="bg-white p-10 rounded-3xl text-center max-w-md w-full">
          <Package size={45} className="mx-auto text-[#e66b3d] mb-4" />
          <h1 className="text-2xl font-bold">Order Not Found</h1>
          <p className="text-gray-500 mt-2">
            We couldn't find this order.
          </p>
          <Link
            href="/orders"
            className="inline-flex mt-6 bg-[#171717] text-white px-6 py-3 rounded-full"
          >
            Back to My Orders
          </Link>
        </div>
      </main>
    );
  }

  const currentStep = trackingSteps.findIndex(
    (step) => step.status === order.status
  );

  const progress = currentStep >= 0 ? currentStep : 0;

  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-5xl mx-auto px-5 py-12">

        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#e66b3d] mb-8"
        >
          <ArrowLeft size={17} />
          Back to My Orders
        </Link>

        {/* Page Heading */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-9">
          <div>
            <p className="text-sm uppercase tracking-[3px] text-[#e66b3d] font-semibold">
              Order Details
            </p>
            <h1 className="text-4xl font-bold mt-2">
              Track Your <span className="font-serif italic text-[#e66b3d]">Order.</span>
            </h1>
            <p className="text-gray-500 mt-2">
              Order ID: {order.orderId}
            </p>
          </div>

          <span className="bg-orange-50 text-[#e66b3d] px-5 py-2 rounded-full text-sm font-bold w-fit">
            {order.status}
          </span>
        </div>

        {/* Tracking Timeline */}
        <section className="bg-white border border-gray-100 rounded-3xl p-7 md:p-9 mb-7">
          <h2 className="text-xl font-bold mb-8">
            Delivery Progress
          </h2>

          <div className="space-y-7">
            {trackingSteps.map((step, index) => {
              const Icon = step.icon;
              const completed = index <= progress;

              return (
                <div key={step.status} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center ${
                        completed
                          ? "bg-[#e66b3d] text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    {index !== trackingSteps.length - 1 && (
                      <div
                        className={`w-0.5 h-9 mt-2 ${
                          index < progress
                            ? "bg-[#e66b3d]"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>

                  <div className="pt-1">
                    <h3
                      className={`font-bold ${
                        completed ? "text-[#171717]" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Order Items */}
        <section className="bg-white border border-gray-100 rounded-3xl p-7 mb-7">
          <h2 className="text-xl font-bold mb-6">Ordered Products</h2>

          <div className="space-y-5">
            {order.items.map((item, index) => (
              <div
                key={`${item.productId}-${item.size}-${index}`}
                className="flex items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl bg-[#f3eee7]"
                />

                <div className="flex-1">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    EU {item.size} · Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-7">

          {/* Delivery Address */}
          <section className="bg-white border border-gray-100 rounded-3xl p-7">
            <div className="flex items-center gap-3 mb-5">
              <MapPin className="text-[#e66b3d]" />
              <h2 className="text-xl font-bold">Delivery Address</h2>
            </div>

            <p className="font-semibold">{order.customer.fullName}</p>
            <p className="text-gray-500 text-sm mt-2">
              {order.customer.address}
            </p>
            <p className="text-gray-500 text-sm">
              {order.customer.city}, {order.customer.postalCode}
            </p>
            <p className="text-gray-500 text-sm mt-3">
              {order.customer.phone}
            </p>
            <p className="text-gray-500 text-sm">
              {order.customer.email}
            </p>
          </section>

          {/* Payment Summary */}
          <section className="bg-white border border-gray-100 rounded-3xl p-7">
            <h2 className="text-xl font-bold mb-5">Payment Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>${order.shipping.toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-[#e66b3d]">
                  ${order.total.toFixed(2)}
                </span>
              </div>

              <p className="text-gray-500 pt-2">
                Payment Method:{" "}
                <span className="font-semibold text-[#171717] uppercase">
                  {order.paymentMethod}
                </span>
              </p>

              <p className="text-gray-500">
                Order Date:{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
