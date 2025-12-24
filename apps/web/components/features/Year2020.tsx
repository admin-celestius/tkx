"use client";

import { Milestone } from "../TimelineTypes";

// 2020: Digital Glitch - The Shift
export default function Year2020({ item }: { item: Milestone }) {
    return (
        <div className="w-full h-full flex flex-col items-start justify-center relative overflow-hidden bg-[#18181b] pl-10 pr-32">
            {/* Cyberpunk Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center w-full justify-between z-10">
                {/* Visual Left */}
                <div className="relative mix-blend-hard-light group cursor-pointer">
                    <h1 className="text-[20vw] font-mono font-black tracking-tighter text-red-600 relative z-10 transition-transform duration-100 group-hover:scale-105 leading-none">
                        20
                    </h1>
                    <h1 className="text-[20vw] font-mono font-black tracking-tighter text-white relative z-10 -mt-10 md:ml-20 leading-none">
                        20
                    </h1>
                </div>

                {/* Info Right (but left of sidebar) */}
                <div className="relative p-8 border-l-4 border-red-500 bg-black/80 backdrop-blur-md max-w-md mr-10 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                    <h3 className="text-4xl font-mono font-bold text-white mb-4 uppercase">{item.title}</h3>
                    <p className="font-mono text-gray-400 text-sm mb-6 leading-relaxed">{item.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-center">
                        <span className="p-2 bg-red-900/40 text-red-400 text-xs border border-red-500/50 hover:bg-red-500 hover:text-white transition-colors">ERR_CONNECTION</span>
                        <span className="p-2 bg-cyan-900/40 text-cyan-400 text-xs border border-cyan-500/50 hover:bg-cyan-500 hover:text-white transition-colors">VIRTUAL_MODE</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
