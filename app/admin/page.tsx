"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  DollarSign,
  Clock,
  ArrowUpRight,
  TrendingUp,
  CalendarDays,
  Eye,
  RefreshCw,
} from "lucide-react";

type Order = {
  orderId: string;
  customer: {
    fullName: string;
    email: string;
  };
  total: number;
  status: string;
  createdAt: string;
  items: {
    productId: number;
    name: string;
    quantity: number;
  }[];
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem("shoppilot-orders");

    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch {
        setOrders([]);
      }
    }

    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5]">
        Loading dashboard...
      </div>
    );
  }

  // Dashboard Statistics
  const validOrders = orders.filter(
    (order) => order.status !== "Cancelled"
  );

  const totalRevenue = validOrders.reduce(
    (total, order) => total + order.total,
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const totalItemsSold = validOrders.reduce(
    (total, order) =>
      total +
      order.items.reduce((sum, item) => sum + item.quantity, 0),
    0
  );

  // Last 7 days sales
  const lastSevenDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));

    const dayRevenue = validOrders
      .filter((order) => {
        const orderDate = new Date(order.createdAt);

        return (
          orderDate.getDate() === date.getDate() &&
          orderDate.getMonth() === date.getMonth() &&
          orderDate.getFullYear() === date.getFullYear()
        );
      })
      .reduce((total, order) => total + order.total, 0);

    return {
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      revenue: dayRevenue,
    };
  });

  const maxRevenue = Math.max(
    ...lastSevenDays.map((day) => day.revenue),
    1
  );

  const recentOrders = [...orders]
    .reverse()
    .slice(0, 5);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      description: "Excluding cancelled orders",
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: orders.length.toString(),
      description: "All customer orders",
      icon: ShoppingBag,
    },
    {
      title: "Pending Orders",
      value: pendingOrders.toString(),
      description: "Waiting for processing",
      icon: Clock,
    },
    {
      title: "Items Sold",
      value: totalItemsSold.toString(),
      description: "Units in active orders",
      icon: Package,
    },
  ];

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
          className="flex items-center gap-3 p-3 rounded-xl bg-[#e66b3d] font-semibold"
        >
          <LayoutDashboard size={19} />
          Dashboard
        </Link>

        <Link
          href="/admin/orders"
          className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:bg-white/10 mt-2"
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
            className="text-sm text-gray-400 hover:text-white"
          >
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Dashboard */}
      <section className="md:ml-64 px-5 md:px-10 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-9">
          <div>
            <p className="text-sm text-[#e66b3d] font-semibold uppercase tracking-widest">
              ShopPilot Administration
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mt-2 text-[#171717]">
              Dashboard Overview
            </h1>

            <p className="text-gray-500 mt-2">
              Here's what's happening with your store.
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50"
          >
            <RefreshCw size={16} />
            Refresh Data
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {stat.title}
                  </p>

                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#e66b3d] flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-[#171717] mt-5">
                  {stat.value}
                </h2>

                <p className="text-xs text-gray-400 mt-2">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Sales Overview */}
        <div className="grid xl:grid-cols-3 gap-6 mb-8">

          <div className="xl:col-span-2 bg-white border border-gray-100 rounded-2xl p-6">

            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-bold">
                  Sales Overview
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Revenue from the last 7 days
                </p>
              </div>

              <TrendingUp className="text-[#e66b3d]" size={23} />
            </div>

            <div className="flex items-end justify-between gap-3 h-52">
              {lastSevenDays.map((day) => (
                <div
                  key={day.day}
                  className="flex-1 flex flex-col items-center justify-end h-full gap-3"
                >
                  <div className="text-xs text-gray-500">
                    {day.revenue > 0
                      ? `$${day.revenue.toFixed(0)}`
                      : ""}
                  </div>

                  <div
                    className="w-full max-w-12 rounded-t-lg bg-[#e66b3d] hover:bg-[#171717] transition-all"
                    style={{
                      height: `${Math.max(
                        (day.revenue / maxRevenue) * 100,
                        3
                      )}%`,
                    }}
                  />

                  <span className="text-xs text-gray-400">
                    {day.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Summary */}
          <div className="bg-[#171717] text-white rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <p className="text-sm text-gray-400">
                Store Performance
              </p>

              <h2 className="text-3xl font-bold mt-3">
                {orders.length} Orders
              </h2>

              <p className="text-sm text-gray-400 mt-3">
                You have received {orders.length} orders so far.
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="mt-8 flex items-center justify-between bg-[#e66b3d] hover:bg-white hover:text-[#171717] transition rounded-xl p-4 font-semibold"
            >
              Manage Orders
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">

          <div className="p-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">
                Recent Orders
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Latest customer purchases
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="text-sm text-[#e66b3d] font-semibold flex items-center gap-1"
            >
              View All <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">

              <thead className="bg-[#faf9f6] text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-gray-50">

                    <td className="px-6 py-5 font-semibold text-sm">
                      {order.orderId}
                    </td>

                    <td className="px-6 py-5 text-sm">
                      {order.customer.fullName}
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5 font-bold text-sm">
                      ${order.total.toFixed(2)}
                    </td>

                    <td className="px-6 py-5">
                      <span className="text-xs font-semibold px-3 py-2 rounded-full bg-orange-50 text-[#e66b3d]">
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <Link
                        href={`/orders/${order.orderId}`}
                        className="text-[#e66b3d] hover:text-[#171717]"
                      >
                        <Eye size={18} />
                      </Link>
                    </td>

                  </tr>
                ))}

                {recentOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-12 text-gray-500"
                    >
                      No orders available yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-400 mt-8">
          ShopPilot Admin Dashboard · Demo Version
        </p>

      </section>
    </main>
  );
}
