
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  ArrowLeft,
  Search,
  Eye,
  RefreshCw,
} from "lucide-react";

type Order = {
  orderId: string;
  customer: {
    fullName: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
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

const statuses = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem("shoppilot-orders");

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    setLoaded(true);
  }, []);

  const updateStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId
        ? { ...order, status: newStatus }
        : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "shoppilot-orders",
      JSON.stringify(updatedOrders)
    );
  };

  const filteredOrders = [...orders]
    .reverse()
    .filter((order) => {
      const matchesSearch =
        order.orderId.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filter === "All" || order.status === filter;

      return matchesSearch && matchesStatus;
    });

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((total, order) => total + order.total, 0);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5]">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden md:flex flex-col w-64 h-screen bg-[#171717] text-white p-6">
        <Link href="/" className="text-2xl font-bold mb-12">
          Shop<span className="text-[#e66b3d]">Pilot.</span>
        </Link>

        <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
          Management
        </p>

        <Link
          href="/admin"
          className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:bg-white/10"
        >
          <LayoutDashboard size={19} />
          Dashboard
        </Link>

        <Link
          href="/admin/orders"
          className="flex items-center gap-3 p-3 rounded-xl bg-[#e66b3d] font-semibold mt-2"
        >
          <ShoppingBag size={19} />
          Orders
        </Link>

        <Link
          href="/admin/products"
          className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:bg-white/10 mt-2"
        >
          <Package size={19} />
          Products
        </Link>

        <div className="mt-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm"
          >
            <ArrowLeft size={17} />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <section className="md:ml-64 px-5 md:px-10 py-8">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-9">
          <div>
            <p className="text-sm text-[#e66b3d] font-semibold uppercase tracking-widest">
              Admin Panel
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              Order Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage customer orders and delivery status.
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="text-3xl font-bold mt-2">{orders.length}</h2>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <p className="text-sm text-gray-500">Active Orders</p>
            <h2 className="text-3xl font-bold mt-2">
              {orders.filter((o) => !["Delivered", "Cancelled"].includes(o.status)).length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <p className="text-sm text-gray-500">Order Revenue</p>
            <h2 className="text-3xl font-bold mt-2 text-[#e66b3d]">
              ${totalRevenue.toFixed(2)}
            </h2>
          </div>

        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

          <div className="p-6 flex flex-col md:flex-row justify-between gap-4">
            <h2 className="text-xl font-bold">All Orders</h2>

            <div className="flex flex-col sm:flex-row gap-3">

              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search order or customer..."
                  className="w-full sm:w-64 pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#e66b3d]"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#e66b3d]"
              >
                <option value="All">All Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[850px]">

              <thead className="bg-[#faf9f6] text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Details</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredOrders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-gray-50">

                    <td className="px-6 py-5 font-semibold">
                      {order.orderId}
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-semibold">
                        {order.customer.fullName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {order.customer.email}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5 font-bold">
                      ${order.total.toFixed(2)}
                    </td>

                    <td className="px-6 py-5">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order.orderId, e.target.value)
                        }
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold outline-none focus:border-[#e66b3d]"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-6 py-5">
                      <Link
                        href={`/orders/${order.orderId}`}
                        className="inline-flex items-center gap-2 text-[#e66b3d] font-semibold text-sm"
                      >
                        <Eye size={16} />
                        View
                      </Link>
                    </td>

                  </tr>
                ))}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-14 text-gray-500"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>

      </section>
    </main>
  );
}
