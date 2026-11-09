import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="bg-[#f5f4ef] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="relative overflow-hidden rounded-[32px] bg-[#e8edf5]">

          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-32 -top-40 h-[550px] w-[550px] rounded-full border border-[#172d50]/[0.07]" />
          <div className="pointer-events-none absolute -right-16 -top-24 h-[400px] w-[400px] rounded-full border border-[#172d50]/[0.07]" />
          <div className="pointer-events-none absolute -bottom-40 left-[25%] h-[450px] w-[450px] rounded-full bg-[#a9c5ef]/30 blur-[100px]" />

          <div className="relative grid items-center gap-12 px-7 py-16 sm:px-12 md:grid-cols-2 md:px-16 md:py-20 lg:gap-16 lg:px-20">

            {/* Left Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#172d50]/10 bg-white/70 px-4 py-2.5 text-[#244c83]">
                <Sparkles size={15} />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">
                  Limited Time Offer
                </span>
              </div>

              <h2 className="mt-8 text-5xl font-black leading-[1.08] tracking-[-2px] text-[#172d50] sm:text-6xl lg:text-[72px]">
                Step Into
                <span className="mt-2 block font-serif font-medium italic text-[#4778b9]">
                  Something
                </span>
                <span className="block">Better.</span>
              </h2>

              <p className="mt-7 max-w-md text-[15px] leading-8 text-[#52647c]">
                Your next favorite pair is waiting. Discover standout
                sneaker styles at prices worth stepping out for.
              </p>

              {/* Offer Details */}
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#172d50] px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#315d96] hover:shadow-xl"
                >
                  Shop The Sale
                  <ArrowUpRight
                    size={19}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>

                <div className="flex items-center gap-3">
                  <span className="text-5xl font-black tracking-[-2px] text-[#172d50]">
                    30%
                  </span>
                  <div className="h-10 w-px bg-[#172d50]/20" />
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#4778b9]">
                      Up to
                    </p>
                    <p className="text-sm font-bold text-[#172d50]">
                      Discount
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#172d50]/40">
                Find your style. Make your move.
              </p>
            </div>

            {/* Right Product Image */}
            <div className="relative mx-auto w-full max-w-[560px]">

              {/* Image Background Shape */}
              <div className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5d7f0]" />

              <div className="relative overflow-hidden rounded-[28px] shadow-[0_25px_60px_rgba(23,45,80,0.15)]">
                <Image
                  src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=900"
                  alt="Featured sneaker special offer"
                  width={900}
                  height={700}
                  unoptimized
                  className="h-[300px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[380px] md:h-[440px]"
                />
              </div>

              {/* Discount Badge */}
              <div className="absolute -bottom-5 -left-5 flex h-28 w-28 flex-col items-center justify-center rounded-full border-[6px] border-[#e8edf5] bg-[#4778b9] text-white shadow-xl sm:-left-7 sm:h-32 sm:w-32">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                  Save up to
                </span>
                <span className="text-3xl font-black tracking-tight">
                  30%
                </span>
              </div>

              {/* Floating Label */}
              <div className="absolute -right-3 top-6 rounded-xl border border-white/60 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md sm:-right-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#7890b0]">
                  Selected styles
                </p>
                <p className="mt-1 text-xs font-extrabold text-[#172d50]">
                  Special Collection
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}