"use client";
import { Milestone } from "../TimelineTypes";

export default function GenericYear({ item }: { item: Milestone }) {
    return (
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-between p-10 relative z-10">
            {/* Visual Left: Huge Number */}
            <div className="relative mix-blend-overlay opacity-50">
                <h1 className="text-[20vw] font-black leading-none tracking-tighter select-none">
                    {item.year}
                </h1>
            </div>

            {/* Content Right: Minimal Bordered Block (No Glass Card) */}
            <div className="max-w-xl pl-8 border-l-4" style={{ borderColor: item.theme.accent }}>
                <h1 className="text-5xl mb-4 font-bold uppercase tracking-tight" style={{ color: item.theme.text }}>{item.title}</h1>
                <p className="text-xl leading-relaxed opacity-90 font-light" style={{ color: item.theme.text }}>{item.description}</p>

                {/* Image Decoration if available */}
                {item.image && (
                    <div className="mt-8 h-64 w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 img-container">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                )}
            </div>
        </div>
    );
}
