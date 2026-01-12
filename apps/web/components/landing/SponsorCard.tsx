"use client";

interface SponsorCardProps {
  name: string;
  logo: string;
  index: number;
}

const SponsorCard = ({ name, logo, index }: SponsorCardProps) => {
  return (
    <div
      className="group relative mx-6 w-[380px] shrink-0"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Gradient border */}
      <div className="absolute -inset-px rounded-2xl opacity-0 blur-sm transition-all duration-500 group-hover:opacity-100 gradient-border" />

      {/* Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-amber-300/0 blur-2xl transition-all duration-500 group-hover:bg-amber-300/30" />

      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl bg-black/70 backdrop-blur-xl border border-amber-200/40 p-8 transition-all duration-500 group-hover:border-amber-200 group-hover:-translate-y-1 group-hover:shadow-[0_20px_60px_-15px_rgba(255,193,7,0.5)]">

        {/* Shimmer */}
        <div className="absolute inset-0 -translate-x-full shimmer group-hover:animate-shimmer" />

        {/* Logo */}
        <div className="flex h-24 items-center justify-center">
          <span className="text-4xl font-bold text-gold-premium">
            {logo}
          </span>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-linear-to-r from-transparent via-amber-200/50 to-transparent" />

        {/* Name */}
        <p className="text-center text-sm text-amber-300 transition-colors duration-300 group-hover:text-amber-300">
          {name}
        </p>

        {/* Corners */}
        <div className="absolute left-3 top-3 h-8 w-8 border-l-2 border-t-2 border-amber-200/40 group-hover:border-amber-300 transition-colors" />
        <div className="absolute bottom-3 right-3 h-8 w-8 border-b-2 border-r-2 border-amber-200/40 group-hover:border-amber-300 transition-colors" />
      </div>
    </div>
  );
};

export default SponsorCard;
