"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, Sparkles } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="bg-[#faf9f6] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="relative isolate overflow-hidden rounded-[32px] bg-[#171717] px-6 py-20 text-center text-white shadow-[0_25px_70px_rgba(0,0,0,0.12)] sm:px-12 md:py-28">

          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-32 -top-40 -z-10 h-[450px] w-[450px] rounded-full border border-white/[0.07]" />
          <div className="pointer-events-none absolute -right-20 -top-28 -z-10 h-[320px] w-[320px] rounded-full border border-white/[0.07]" />
          <div className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-[500px] w-[500px] rounded-full border border-white/[0.07]" />

          <div className="pointer-events-none absolute right-[12%] top-[18%] -z-10 h-64 w-64 rounded-full bg-[#e66b3d]/10 blur-[100px]" />
          <div className="pointer-events-none absolute bottom-[5%] left-[20%] -z-10 h-52 w-52 rounded-full bg-orange-500/[0.08] blur-[90px]" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl">

            {/* Label */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 backdrop-blur-md">
              <Sparkles size={14} className="text-[#e66b3d]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/80">
                Stay in the loop
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-extrabold leading-[1.12] tracking-[-1.8px] sm:text-5xl md:text-7xl">
              Good shoes.
              <span className="mt-2 block font-serif font-normal italic tracking-[-1px] text-[#e66b3d]">
                Great stories.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-white/55 sm:text-base">
              Get the latest sneaker drops, exclusive offers, and fresh
              arrivals delivered straight to your inbox. Stay ahead of
              every step.
            </p>

            {/* Newsletter Form */}
            {subscribed ? (
              <div className="mx-auto mt-11 inline-flex items-center gap-3 rounded-2xl border border-green-400/20 bg-green-400/[0.08] px-7 py-5 text-sm font-medium text-green-400">
                <CheckCircle2 size={20} />
                Thanks for subscribing!
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mx-auto mt-11 flex max-w-2xl flex-col gap-3 rounded-[20px] border border-white/10 bg-white/[0.08] p-2.5 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3 px-4">
                  <Mail size={20} className="shrink-0 text-[#e66b3d]" />

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/35"
                  />
                </div>

                <button
                  type="submit"
                  className="group flex items-center justify-center gap-3 rounded-[14px] bg-[#e66b3d] px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#cf572d] hover:shadow-[0_8px_25px_rgba(230,107,61,0.3)]"
                >
                  Subscribe
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </form>
            )}

            {/* Footer Text */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] tracking-wide text-white/35">
              <span>Join our sneaker community</span>
              <span className="h-1 w-1 rounded-full bg-[#e66b3d]" />
              <span>Unsubscribe anytime</span>
              <span className="h-1 w-1 rounded-full bg-[#e66b3d]" />
              <span>No spam, ever</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}