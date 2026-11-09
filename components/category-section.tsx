import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Running",
    subtitle: "Built for every mile",
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=700",
    color: "bg-[#e9e3d9]",
  },
  {
    name: "Lifestyle",
    subtitle: "Everyday comfort",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=700",
    color: "bg-[#e8ded5]",
  },
  {
    name: "Sports",
    subtitle: "Push your limits",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700",
    color: "bg-[#e1e4dc]",
  },
  {
    name: "Classic",
    subtitle: "Timeless collection",
    image:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=700",
    color: "bg-[#e8dfd4]",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-[#f0dda4] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#e66b3d]">
              <span className="h-[2px] w-8 bg-[#e66b3d]" />
              Find Your Perfect Fit
            </p>

            <h2 className="text-4xl font-extrabold tracking-[-1.8px] text-[#191919] sm:text-5xl md:text-[56px]">
              Shop by{" "}
              <span className="font-serif font-medium italic text-[#e66b3d]">
                Category.
              </span>
            </h2>

            <p className="mt-4 max-w-md text-[15px] leading-7 text-[#77716b]">
              From everyday essentials to performance footwear,
              find the perfect pair for every moment.
            </p>
          </div>

          <Link
            href="/categories"
            className="group inline-flex items-center gap-3 border-b border-[#d8cfc5] pb-2 text-sm font-bold text-[#292521] transition-all duration-300 hover:border-[#e66b3d] hover:text-[#e66b3d]"
          >
            View All Categories
            <ArrowUpRight
              size={19}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              href="/products"
              key={category.name}
              className="group relative overflow-hidden rounded-[26px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_22px_45px_rgba(0,0,0,0.12)]"
            >
              <div
                className={`relative h-[380px] overflow-hidden ${category.color}`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />

                {/* Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 transition-all duration-500 group-hover:from-black/30 group-hover:to-black/85" />

                {/* Collection Number */}
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-2 backdrop-blur-md">
                  <span className="text-[10px] font-extrabold tracking-widest text-white">
                    0{index + 1}
                  </span>
                  <span className="h-3 w-px bg-white/50" />
                  <span className="text-[9px] font-bold tracking-[0.18em] text-white">
                    COLLECTION
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-6 text-white">
                  <div className="transition-transform duration-500 group-hover:-translate-y-1">
                    <p className="mb-2 text-[12px] font-medium tracking-wide text-white/75">
                      {category.subtitle}
                    </p>

                    <h3 className="text-[30px] font-extrabold tracking-[-0.8px]">
                      {category.name}
                    </h3>

                    <div className="mt-3 h-[2px] w-9 bg-[#e66b3d] transition-all duration-500 group-hover:w-16" />
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#191919] shadow-xl transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#e66b3d] group-hover:text-white">
                    <ArrowUpRight size={22} strokeWidth={1.8} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}