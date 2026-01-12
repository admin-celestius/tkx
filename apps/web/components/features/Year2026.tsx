import { Milestone } from "../TimelineTypes";

export default function Year2026({ item }: { item: Milestone }) {
    return (
        <div className="w-full h-full relative flex items-center justify-end p-20 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-1 opacity-10 pointer-events-none">
                {[...Array(144)].map((_, i) => (
                    <div key={i} className="border border-purple-500/30 w-full h-full" />
                ))}
            </div>

            <div className="relative z-10 text-right">
                <div className="text-xs font-mono text-purple-400 mb-4 tracking-[0.5em]">
                    /// PROTOCOL_INIT
                </div>
                <h1 className="text-[12vw] font-black leading-none tracking-tighter text-white mix-blend-overlay">
                    FUTURE
                </h1>
                <h1 className="text-[12vw] font-black leading-none tracking-tighter text-purple-500 blur-sm absolute top-10 right-0 -z-10 opacity-50 animate-pulse">
                    FUTURE
                </h1>

                <div className="mt-12 space-y-2 text-right font-mono text-sm text-purple-300/60">
                    <p>TARGET: HORIZON</p>
                    <p>COORDINATES: UNKNOWN</p>
                    <p>STATUS: PENDING</p>
                    <p>ARCHITECTS: US</p>
                </div>
            </div>

            {/* Floating Geometry */}
            <div className="absolute left-20 bottom-20 w-40 h-40 border border-purple-500/50 rounded-full animate-spin-slow opacity-50" />
            <div className="absolute left-40 bottom-40 w-10 h-10 bg-purple-500 rounded-full blur-xl animate-bounce" />
        </div>
    );
}
