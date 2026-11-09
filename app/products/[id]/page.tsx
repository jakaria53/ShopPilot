"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
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
  color?: string;
  description?: string;
  images?: string[];
};
const sizes = ["39", "40", "41", "42", "43", "44", "45"];

export default function ProductDetailsPage() {
  const params = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const savedProducts = localStorage.getItem("shoppilot-products");

    if (savedProducts) {
      const allProducts: Product[] = JSON.parse(savedProducts);

      const foundProduct = allProducts.find(
        (item) => item.id === Number(params.id)
      );

      setProduct(foundProduct || null);
    }

    setLoading(false);
  }, [params.id]);

  useEffect(() => {
  if (!product) return;

  const savedWishlist = localStorage.getItem("shoppilot-wishlist");

  if (savedWishlist) {
    const wishlist: number[] = JSON.parse(savedWishlist);

    setIsWishlisted(wishlist.includes(product.id));
  }
}, [product]);

  const productImages = product
    ? product.images?.length
      ? product.images
      : [product.image, product.image, product.image]
    : [];
  
  if (loading) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
      <p className="text-sm font-semibold text-gray-500">
        Loading product...
      </p>
    </main>
  );
}

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#faf9f6] px-6">
        <h1 className="text-3xl font-black">Product Not Found</h1>
        <p className="mt-3 text-sm text-gray-500">
          The sneaker you are looking for does not exist.
        </p>
        <Link
          href="/products"
          className="mt-6 rounded-full bg-[#e66b3d] px-6 py-3 text-sm font-bold text-white"
        >
          Back to Products
        </Link>
      </main>
    );
  }

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  const handleWishlist = () => {
  const savedWishlist = JSON.parse(
    localStorage.getItem("shoppilot-wishlist") || "[]"
  );

  let updatedWishlist: number[];

  if (savedWishlist.includes(product.id)) {
    updatedWishlist = savedWishlist.filter(
      (id: number) => id !== product.id
    );
  } else {
    updatedWishlist = [...savedWishlist, product.id];
  }

  localStorage.setItem(
    "shoppilot-wishlist",
    JSON.stringify(updatedWishlist)
  );
window.dispatchEvent(new Event("cartUpdated"));

setAdded(true);
setTimeout(() => setAdded(false), 2000);
  setIsWishlisted(updatedWishlist.includes(product.id));
};
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a shoe size first.");
      return;
    }

    const existingCart = JSON.parse(
      localStorage.getItem("shoppilot-cart") || "[]"
    );

    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: productImages[0],
      size: selectedSize,
      quantity,
    };

    const existingIndex = existingCart.findIndex(
      (item: { productId: number; size: string }) =>
        item.productId === product.id && item.size === selectedSize
    );

    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem(
      "shoppilot-cart",
      JSON.stringify(existingCart)
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] px-6 py-10 md:py-16">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/products"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#e66b3d]"
        >
          <ArrowLeft size={17} />
          Back to Collection
        </Link>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-[28px] bg-[#f0ede8]">
              <Image
                src={productImages[selectedImage]}
                alt={product.name}
                fill
                unoptimized
                priority
                className="object-cover transition duration-500"
              />

              <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#e66b3d]">
                SAVE {discount}%
              </span>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Toggle wishlist"
                className={`absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white transition ${
                  isWishlisted ? "text-red-500" : "text-gray-700"
                }`}
              >
                <Heart
                  size={20}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-2xl bg-[#f0ede8] ${
                    selectedImage === index
                      ? "ring-2 ring-[#e66b3d] ring-offset-2"
                      : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    unoptimized
                    className="object-cover transition hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e66b3d]">
              {product.category} Collection
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-[#171717] md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#e6a23c]">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star key={item} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm font-semibold">
                {product.rating}
              </span>
              <span className="text-sm text-gray-400">
                ({product.reviews} reviews)
              </span>
            </div>

            <div className="mt-7 flex items-center gap-4">
              <span className="text-3xl font-black text-[#171717]">
                ${product.price}
              </span>
              <span className="text-lg text-gray-400 line-through">
                ${product.oldPrice}
              </span>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-[#e66b3d]">
                {discount}% OFF
              </span>
            </div>

                <p className="mt-7 border-t border-gray-200 pt-7 text-sm leading-8 text-gray-500">
        {product.description ||
          "A stylish sneaker designed for everyday comfort and movement."}
      </p>

                            {/* Color */}
                            <div className="mt-8">
                              <p className="mb-4 text-sm font-bold">
                  Color:{" "}
                  <span className="font-normal text-gray-500">
                    {product.color || "Not specified"}
                  </span>
                </p>

              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#e66b3d] bg-white">
                  <div className="h-7 w-7 rounded-full bg-gray-800" />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white">
                  <div className="h-7 w-7 rounded-full bg-[#d7b69a]" />
                </div>
              </div>
            </div>

            {/* Size */}
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-bold">Select Size (EU)</p>
                <button className="text-xs font-semibold text-[#e66b3d] underline">
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-xl border py-3 text-sm font-bold transition ${
                      selectedSize === size
                        ? "border-[#171717] bg-[#171717] text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:border-[#e66b3d]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <p className="mb-4 text-sm font-bold">Quantity</p>

              <div className="flex w-fit items-center gap-6 rounded-xl border border-gray-200 bg-white px-4 py-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>

                <span className="min-w-5 text-center text-sm font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="mt-9 flex w-full items-center justify-center gap-3 rounded-xl bg-[#171717] py-5 text-sm font-bold text-white transition hover:bg-[#e66b3d]"
            >
              {added ? <Check size={19} /> : <ShoppingBag size={19} />}
              {added ? "Added to Cart!" : "Add to Cart"}
            </button>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-200 pt-7">
              <div className="text-center">
                <Truck className="mx-auto mb-3 text-[#e66b3d]" size={22} />
                <p className="text-xs font-semibold">Fast Delivery</p>
              </div>

              <div className="text-center">
                <ShieldCheck className="mx-auto mb-3 text-[#e66b3d]" size={22} />
                <p className="text-xs font-semibold">Secure Payment</p>
              </div>

              <div className="text-center">
                <RotateCcw className="mx-auto mb-3 text-[#e66b3d]" size={22} />
                <p className="text-xs font-semibold">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
