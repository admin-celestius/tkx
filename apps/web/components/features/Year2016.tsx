import { Milestone } from "../TimelineTypes";

export default function Year2016({ item }: { item: Milestone }) {
    return (
        <div className="w-full h-full relative overflow-visible bg-transparent">
            {/* Background Gradient & Parallax Elements */}
            <div className="absolute inset-0 z-0 bg-transparent overflow-hidden" />
            <div className="absolute top-[5%] left-[0%] w-[40vw] h-[40vw] rounded-full bg-blue-600/20 blur-[120px] z-1 parallax-bg pointer-events-none" />
            <div className="absolute bottom-[0%] right-[20%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/10 blur-[150px] z-1 parallax-bg pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 w-full h-full grid grid-cols-12 pointer-events-none select-none">

                {/* Left Col: Massive Title */}
                <div className="col-span-8 h-full relative">
                    <div className="absolute top-0 left-0 w-[150%] h-full flex flex-col justify-center items-start pl-4 parallax-text z-20">
                        {/* Added 'animate-title' class here */}
                        <h1 className="animate-title text-[15vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#22d3ee] to-[#0ea5e9] leading-[0.8] drop-shadow-2xl whitespace-nowrap will-change-transform">
                            GEN
                        </h1>
                        <h1 className="animate-title text-[15vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-t from-[#1d4ed8] to-[#60a5fa] leading-[0.8] z-20 ml-[4vw] drop-shadow-2xl whitespace-nowrap will-change-transform">
                            ESIS
                        </h1>
                    </div>
                </div>

                {/* Right Col: Details */}
                <div className="col-span-4 h-full flex flex-col justify-center items-end pr-16 space-y-12 parallax-content z-30">
                    <div className="flex items-center gap-4 opacity-80">
                        <div className="w-16 h-[2px] bg-cyan-500 shadow-[0_0_10px_cyan]"></div>
                        <span className="text-cyan-400 font-mono text-sm tracking-[0.25em] font-bold">EST. 2016</span>
                    </div>

                    <div className="text-right">
                        {/* Added 'animate-subtitle' class here */}
                        <h2 className="animate-subtitle text-7xl font-black text-white tracking-tight leading-none mb-4 drop-shadow-lg will-change-transform">GENESIS</h2>
                        {/* Added 'animate-desc' class here */}
                        <p className="animate-desc text-cyan-100/70 text-xl font-light leading-relaxed max-w-xs ml-auto will-change-transform">
                            The spark that started it all.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}