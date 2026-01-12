import { Milestone } from "../TimelineTypes";

export default function Year2017({ item }: { item: Milestone }) {
    return (
        <div className="w-full h-full relative overflow-hidden bg-transparent p-8 md:p-16">
            {/* 1. Background: Subtle Grid & Noise */}
            <div className="absolute inset-0 bg-[#022c22]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b_1px,transparent_1px),linear-gradient(to_bottom,#064e3b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

            {/* 2. Visuals: Dispersed Glass Shards (NOT Center) */}
            {/* Top Right Shard */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-emerald-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            {/* Bottom Left Shard */}
            <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-emerald-400/5 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            {/* 3. The Layout: "Anti-Center" Corner Anchors */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none select-none">

                {/* TOP ROW */}
                <div className="flex justify-between items-start">
                    {/* Top-Left: Massive Title */}
                    <div className="flex flex-col">
                        <h1 className="font-serif text-[12vw] leading-[0.8] text-emerald-100 font-bold tracking-tighter mix-blend-overlay">
                            GRO
                        </h1>
                        <h1 className="font-serif text-[12vw] leading-[0.8] text-emerald-300 font-bold tracking-tighter pl-12 -mt-4 drop-shadow-2xl">
                            WTH
                        </h1>
                        <div className="w-24 h-2 bg-emerald-500 mt-4 ml-2" />
                    </div>

                    {/* Top-Right: Metadata/Nav element */}
                    <div className="hidden md:flex flex-col items-end space-y-2 opacity-70">
                        <span className="font-mono text-emerald-400 text-xs tracking-widest uppercase">Chapter 02</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                </div>

                {/* BOTTOM ROW */}
                <div className="flex justify-between items-end">

                    {/* Bottom-Left: Description (Editorial Block) */}
                    <div className="max-w-md bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 p-6 rounded-tr-3xl">
                        <h3 className="text-emerald-100 font-sans text-xl font-bold mb-2">Fertile Void</h3>
                        <p className="font-mono text-emerald-400/80 text-sm leading-relaxed">
                            The network expanded laterally. Organic systems merged with silicon.
                            A new lifeform emerged from the data soil.
                        </p>
                    </div>

                    {/* Bottom-Right: Massive Year */}
                    <div className="text-right">
                        <span className="block font-serif text-[15vw] leading-none text-transparent bg-clip-text bg-gradient-to-t from-emerald-900 to-emerald-500 opacity-80 -mb-8">
                            2017
                        </span>
                    </div>

                </div>
            </div>

            {/* 4. Decorative "Cool" Elements */}
            <div className="absolute right-32 top-1/2 -translate-y-1/2 w-[1px] h-64 bg-emerald-500/20" />
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-emerald-500/20" />

        </div>
    );
}
