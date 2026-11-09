"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  ArrowLeft,
  Image as ImageIcon,
} from "lucide-react";

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

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Air Motion Pro",
    category: "Running",
    price: 125,
    oldPrice: 150,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    rating: 4.8,
    reviews: 120,
    discount: 17,
  },
  {
    id: 2,
    name: "Urban Street Low",
    category: "Lifestyle",
    price: 95,
    oldPrice: 120,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600",
    rating: 4.7,
    reviews: 85,
    discount: 21,
  },
  {
    id: 3,
    name: "Cloud Runner X",
    category: "Running",
    price: 145,
    oldPrice: 170,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600",
    rating: 4.9,
    reviews: 150,
    discount: 15,
  },
  {
    id: 4,
    name: "Classic Court",
    category: "Classic",
    price: 85,
    oldPrice: 100,
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=600",
    rating: 4.6,
    reviews: 65,
    discount: 15,
  },
  {
    id: 5,
    name: "Velocity Sport",
    category: "Sports",
    price: 135,
    oldPrice: 160,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600",
    rating: 4.8,
    reviews: 95,
    discount: 16,
  },
  {
    id: 6,
    name: "Street Flex",
    category: "Lifestyle",
    price: 110,
    oldPrice: 130,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    rating: 4.7,
    reviews: 72,
    discount: 15,
  },
];

const emptyForm = {
  name: "",
  category: "Running",
  price: "",
  oldPrice: "",
  image: "",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const savedProducts = localStorage.getItem("shoppilot-products");

    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch {
        setProducts(initialProducts);
      }
    } else {
      setProducts(initialProducts);
      localStorage.setItem(
        "shoppilot-products",
        JSON.stringify(initialProducts)
      );
    }

    setLoaded(true);
  }, []);

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);

    localStorage.setItem(
      "shoppilot-products",
      JSON.stringify(updatedProducts)
    );
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setEditingId(product.id);

    setForm({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      oldPrice: product.oldPrice.toString(),
      image: product.image,
    });

    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const price = Number(form.price);
    const oldPrice = Number(form.oldPrice);

    if (!form.name.trim() || !form.image.trim() || price <= 0 || oldPrice < price) {
      alert("Please enter valid product information.");
      return;
    }

    if (editingId !== null) {
      const updatedProducts = products.map((product) =>
        product.id === editingId
          ? {
              ...product,
              name: form.name.trim(),
              category: form.category,
              price,
              oldPrice,
              image: form.image.trim(),
              discount: Math.round(
                ((oldPrice - price) / oldPrice) * 100
              ),
            }
          : product
      );

      saveProducts(updatedProducts);
    } else {
      const newProduct: Product = {
        id: Date.now(),
        name: form.name.trim(),
        category: form.category,
        price,
        oldPrice,
        image: form.image.trim(),
        rating: 5,
        reviews: 0,
        discount: Math.round(
          ((oldPrice - price) / oldPrice) * 100
        ),
      };

      saveProducts([...products, newProduct]);
    }

    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const deleteProduct = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    saveProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      filter === "All" || product.category === filter;

    return matchesSearch && matchesCategory;
  });

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading products...
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
          className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:bg-white/10 mt-2"
        >
          <ShoppingBag size={19} />
          Orders
        </Link>

        <Link
          href="/admin/products"
          className="flex items-center gap-3 p-3 rounded-xl bg-[#e66b3d] font-semibold mt-2"
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

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 mb-9">
          <div>
            <p className="text-sm text-[#e66b3d] font-semibold uppercase tracking-widest">
              Store Inventory
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              Product Management
            </h1>

            <p className="text-gray-500 mt-2">
              Add, edit and manage your sneaker collection.
            </p>
          </div>

          <button
            onClick={openAddForm}
            className="flex items-center justify-center gap-2 bg-[#e66b3d] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#171717] transition"
          >
            <Plus size={19} />
            Add New Product
          </button>
        </div>

        {/* Statistics */}
        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <p className="text-sm text-gray-500">Total Products</p>
            <h2 className="text-3xl font-bold mt-2">
              {products.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <p className="text-sm text-gray-500">Categories</p>
            <h2 className="text-3xl font-bold mt-2">
              {new Set(products.map((p) => p.category)).size}
            </h2>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-7 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#e66b3d]"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#e66b3d]"
          >
            <option value="All">All Categories</option>
            <option value="Running">Running</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Sports">Sports</option>
            <option value="Classic">Classic</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden group"
            >
              <div className="relative h-56 bg-[#f3eee7] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                <span className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-full text-xs font-bold">
                  {product.category}
                </span>

                <span className="absolute top-4 right-4 bg-[#e66b3d] text-white px-3 py-1.5 rounded-full text-xs font-bold">
                  {product.discount}% OFF
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg">
                  {product.name}
                </h3>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xl font-bold text-[#e66b3d]">
                    ${product.price}
                  </span>

                  <span className="text-sm text-gray-400 line-through">
                    ${product.oldPrice}
                  </span>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => openEditForm(product)}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-semibold hover:border-[#e66b3d] hover:text-[#e66b3d] transition"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="w-12 flex items-center justify-center border border-gray-200 rounded-xl text-red-500 hover:bg-red-50 transition"
                    aria-label={`Delete ${product.name}`}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
            <Package size={40} className="mx-auto mb-4 text-gray-300" />
            No products found.
          </div>
        )}
      </section>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 md:p-8 my-auto">

            <div className="flex justify-between items-center mb-7">
              <div>
                <p className="text-sm text-[#e66b3d] font-semibold uppercase tracking-wider">
                  Inventory
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  {editingId !== null ? "Edit Product" : "Add New Product"}
                </h2>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Product Name
                </label>

                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="e.g. Air Motion Pro"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#e66b3d]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#e66b3d]"
                >
                  <option value="Running">Running</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Sports">Sports</option>
                  <option value="Classic">Classic</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Selling Price ($)
                  </label>

                  <input
                    required
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    placeholder="125"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#e66b3d]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Old Price ($)
                  </label>

                  <input
                    required
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.oldPrice}
                    onChange={(e) =>
                      setForm({ ...form, oldPrice: e.target.value })
                    }
                    placeholder="150"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#e66b3d]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Product Image URL
                </label>

                <div className="relative">
                  <ImageIcon
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    required
                    type="url"
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    placeholder="https://example.com/shoe.jpg"
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#e66b3d]"
                  />
                </div>
              </div>

              {form.image && (
                <div className="rounded-xl overflow-hidden h-40 bg-[#f3eee7]">
                  <img
                    src={form.image}
                    alt="Product preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-200 rounded-xl py-3 font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-[#e66b3d] text-white rounded-xl py-3 font-semibold hover:bg-[#171717] transition"
                >
                  {editingId !== null ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
