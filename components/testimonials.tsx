
import Image from "next/image";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Alex Morgan",
    role: "Verified Customer",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    review:
      "Absolutely love these sneakers! The quality is excellent, they are super comfortable, and the design looks even better in person.",
    product: "Air Motion Red",
  },
  {
    name: "Sophia Williams",
    role: "Verified Customer",
    image: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    review:
      "The shopping experience was smooth, delivery was quick, and the shoes fit perfectly. Definitely coming back for another pair!",
    product: "Urban Street Pro",
  },
  {
    name: "Daniel Carter",
    role: "Verified Customer",
    image: "https://i.pravatar.cc/150?img=11",
    rating: 4,
    review:
      "Great style and really good comfort for everyday use. The product looks exactly like the pictures. Highly recommended!",
    product: "Cloud Flex White",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#f3eee7] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e66b3d]">
            Real Stories, Real Style
          </p>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            What Our Customers{" "}
            <span className="font-serif font-medium italic text-[#e66b3d]">
              Say.
            </span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-500">
            Don't just take our word for it. See what sneaker lovers
            think about their shopping experience.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-sm">
            <span className="text-2xl font-extrabold">4.9</span>
            <div className="text-left">
              <div className="flex gap-1 text-[#e69a35]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={13} fill="currentColor" />
                ))}
              </div>
              <p className="mt-1 text-[10px] text-gray-500">
                Customer satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="rounded-[24px] border border-[#e8ded3] bg-white p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-[#e69a35]">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star
                      key={index}
                      size={15}
                      fill="currentColor"
                    />
                  ))}
                </div>

                <Quote size={30} className="text-[#e66b3d]/25" />
              </div>

              <p className="mt-6 min-h-28 text-sm leading-7 text-gray-600">
                "{review.review}"
              </p>

              <div className="mt-5 rounded-xl bg-[#faf9f6] px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Purchased Product
                </p>
                <p className="mt-1 text-sm font-bold text-gray-800">
                  {review.product}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={45}
                  height={45}
                  unoptimized
                  className="h-11 w-11 rounded-full object-cover"
                />

                <div>
                  <p className="text-sm font-bold">{review.name}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {review.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
