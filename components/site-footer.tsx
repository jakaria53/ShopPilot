import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "Home", href: "/" },
    { label: "All Sneakers", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "About Us", href: "/about" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Return Policy", href: "/returns" },
  ],
};

export default function SiteFooter() {
  return (
    <footer className="bg-[#171717] px-6 pb-8 pt-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="text-3xl font-black tracking-tight">
              Shop<span className="text-[#e66b3d]">Pilot.</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/50">
              Find your next favorite pair. Discover sneakers that bring
              together comfort, quality, and everyday style.
            </p>

          <div className="mt-7 flex gap-3">
  {[
    { name: "Instagram", symbol: "ig" },
    { name: "Facebook", symbol: "f" },
    { name: "Twitter", symbol: "𝕏" },
  ].map((social) => (
    <a
      key={social.name}
      href="#"
      aria-label={social.name}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-sm font-bold transition hover:border-[#e66b3d] hover:bg-[#e66b3d]"
    >
      {social.symbol}
    </a>
  ))}
</div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-widest">
                {title}
              </h3>

              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-white/50 transition hover:text-[#e66b3d]"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={13}
                        className="opacity-0 transition group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-4 pt-7 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} ShopPilot. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}