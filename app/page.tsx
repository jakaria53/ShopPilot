import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import CategorySection from "@/components/category-section";
import FeaturedProducts from "@/components/featured-products";
import PromoBanner from "@/components/promo-banner";
import Testimonials from "@/components/testimonials";
import Newsletter from "@/components/newsletter";
import SiteFooter from "@/components/site-footer";
import { ArrowUpRight, ShoppingBag, Star } from "lucide-react";

const shoes = [
  {
    name: "Air Motion",
    category: "Running Collection",
    price: "$120",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
  },
  {
    name: "Urban Runner",
    category: "Street Collection",
    price: "$95",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=700",
  },
  {
    name: "Cloud Flex",
    category: "Lifestyle Collection",
    price: "$110",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=700",
  },
  {
    name: "Retro Sport",
    category: "Classic Collection",
    price: "$85",
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=700",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#faf9f6] text-[#171717]">
      <SiteHeader />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#f2eee8]">

        {/* Decorative Background */}
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#e9d9c9]/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#e9b99d]/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4 lg:px-16 lg:py-24">

          {/* LEFT CONTENT */}
          <div className="relative z-10 max-w-xl">

            <div className="inline-flex items-center gap-3 rounded-full border border-[#e6d9cd] bg-white/70 px-4 py-2.5 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e66b3d] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e66b3d]" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#62564d]">
                Step Into Something New
              </span>
            </div>

            <h1 className="mt-9 text-[52px] font-extrabold leading-[1.04] tracking-[-0.055em] sm:text-7xl lg:text-[82px]">
              Move With
              <span className="mt-2 block font-serif font-normal italic tracking-[-0.04em] text-[#df7048]">
                Your Style.
              </span>
            </h1>

            <p className="mt-8 max-w-[420px] text-[15px] leading-8 text-[#77716b]">
              Find the perfect pair that matches your personality.
              Explore our latest sneaker collection and make every
              step count.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">

              <Link
                href="/products"
                className="group inline-flex items-center gap-4 rounded-full bg-[#191919] px-8 py-[17px] text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#df7048] hover:shadow-xl"
              >
                Shop Collection
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={17} />
                </span>
              </Link>

              <Link
                href="/categories"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#4c4640] transition-colors hover:text-[#df7048]"
              >
                Explore Categories
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

            </div>

            {/* CUSTOMER PROOF */}
            <div className="mt-14 flex items-center gap-4 border-t border-[#ded5ca] pt-8">

              <div className="flex -space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#f2eee8] bg-[#d9b8a0] text-xs font-bold text-white">S</div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#f2eee8] bg-[#b9a5c9] text-xs font-bold text-white">A</div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#f2eee8] bg-[#8d9b87] text-xs font-bold text-white">J</div>
              </div>

              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Star key={item} size={13} fill="#df7048" color="#df7048" />
                  ))}
                </div>
                <p className="mt-1 text-xs font-medium text-[#77716b]">
                  Discover your next favorite pair
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT: PREMIUM SHOE COLLAGE */}
          <div className="relative mx-auto h-[500px] w-full max-w-[650px] sm:h-[590px] lg:h-[650px]">

            {/* Main Background Circle */}
            <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8cbb5] sm:h-[440px] sm:w-[440px]" />

            <div className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 sm:h-[370px] sm:w-[370px]" />

            {/* Decorative Elements */}
            <div className="absolute right-12 top-5 h-20 w-20 rounded-full border-[13px] border-[#df7048]/15 sm:right-20" />

            <div className="absolute bottom-16 left-7 h-14 w-14 rounded-full bg-[#df7048]/15 blur-sm" />

            <div className="absolute left-1/2 top-8 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#9b7963]">
              The New Collection
            </div>

            {/* Small Card - Top Left */}
            <div className="absolute left-0 top-16 z-20 w-[135px] -rotate-12 rounded-2xl border border-white/80 bg-white/95 p-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:z-40 hover:-translate-y-3 hover:rotate-0 sm:left-5 sm:w-[175px] sm:p-3">

              <div className="relative h-[105px] overflow-hidden rounded-xl bg-[#f2eee8] sm:h-[135px]">
                <Image
                  src={shoes[1].image}
                  alt={shoes[1].name}
                  fill
                  unoptimized
                  sizes="200px"
                  className="object-cover transition duration-700 hover:scale-110"
                />
              </div>

              <p className="mt-3 text-xs font-bold sm:text-sm">{shoes[1].name}</p>
              <p className="mt-1 text-xs font-semibold text-[#df7048]">{shoes[1].price}</p>
            </div>

            {/* Main Featured Card */}
            <div className="absolute left-1/2 top-1/2 z-10 w-[225px] -translate-x-1/2 -translate-y-1/2 rotate-3 rounded-[26px] border border-white/90 bg-white p-3 shadow-[0_30px_80px_rgba(60,40,25,0.20)] transition-all duration-500 hover:rotate-0 sm:w-[310px] sm:rounded-[32px] sm:p-4">

              <div className="relative h-[260px] overflow-hidden rounded-[20px] bg-[#f2eee8] sm:h-[365px] sm:rounded-[25px]">

                <Image
                  src={shoes[0].image}
                  alt={shoes[0].name}
                  fill
                  priority
                  unoptimized
                  sizes="350px"
                  className="object-cover transition duration-700 hover:scale-110"
                />

                <span className="absolute left-3 top-3 rounded-full bg-[#df7048] px-3 py-2 text-[9px] font-bold uppercase tracking-widest text-white shadow-lg sm:left-4 sm:top-4">
                  Bestseller
                </span>

                <button
                  aria-label="Add to cart"
                  className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#191919] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#df7048] hover:text-white sm:bottom-4 sm:right-4 sm:h-12 sm:w-12"
                >
                  <ShoppingBag size={19} />
                </button>
              </div>

              <div className="flex items-center justify-between px-1 pb-1 pt-4 sm:px-2">
                <div>
                  <p className="text-base font-extrabold tracking-tight sm:text-xl">
                    {shoes[0].name}
                  </p>
                  <p className="mt-1 text-[10px] text-[#99918a] sm:text-xs">
                    {shoes[0].category}
                  </p>
                </div>

                <p className="text-base font-extrabold text-[#df7048] sm:text-xl">
                  {shoes[0].price}
                </p>
              </div>
            </div>

            {/* Small Card - Top Right */}
            <div className="absolute right-0 top-20 z-20 w-[125px] rotate-12 rounded-2xl border border-white/80 bg-white/95 p-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:z-40 hover:-translate-y-3 hover:rotate-0 sm:right-3 sm:w-[165px] sm:p-3">

              <div className="relative h-[95px] overflow-hidden rounded-xl bg-[#f2eee8] sm:h-[125px]">
                <Image
                  src={shoes[2].image}
                  alt={shoes[2].name}
                  fill
                  unoptimized
                  sizes="180px"
                  className="object-cover transition duration-700 hover:scale-110"
                />
              </div>

              <p className="mt-3 text-xs font-bold sm:text-sm">{shoes[2].name}</p>
              <p className="mt-1 text-xs font-semibold text-[#df7048]">{shoes[2].price}</p>
            </div>

            {/* Bottom Floating Card */}
            <div className="absolute bottom-5 left-0 z-20 w-[145px] rotate-6 rounded-2xl border border-white/80 bg-white/95 p-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:z-40 hover:-translate-y-3 hover:rotate-0 sm:bottom-8 sm:left-5 sm:w-[175px] sm:p-3">

              <div className="relative h-[100px] overflow-hidden rounded-xl bg-[#f2eee8] sm:h-[125px]">
                <Image
                  src={shoes[3].image}
                  alt={shoes[3].name}
                  fill
                  unoptimized
                  sizes="200px"
                  className="object-cover transition duration-700 hover:scale-110"
                />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs font-bold sm:text-sm">{shoes[3].name}</p>
                <p className="text-xs font-bold text-[#df7048]">{shoes[3].price}</p>
              </div>
            </div>

            {/* Floating Label */}
            <div className="absolute bottom-12 right-0 z-30 rounded-2xl bg-[#191919] px-5 py-4 text-white shadow-2xl sm:bottom-20 sm:right-1 sm:px-6 sm:py-5">

              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/50">
                Fresh Drops
              </p>

              <p className="mt-1 text-lg font-bold tracking-tight sm:text-xl">
                New Season<span className="text-[#73df48]">.</span>
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* OTHER SECTIONS */}
      <CategorySection />
      <FeaturedProducts />
      <PromoBanner />
      <Testimonials />
      <Newsletter />
      <SiteFooter />

    </main>
  );
}
