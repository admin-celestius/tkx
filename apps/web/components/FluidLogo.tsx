"use client";

import { TK_TRIBAL_PATH } from "./LogoPath";

interface FluidLogoProps {
    fillProgress: number;
    baseColor: string;
    width: number;
    height: number;
}

export default function FluidLogo({ fillProgress, baseColor, width, height }: FluidLogoProps) {
    return (
        <div style={{ width, height }} className="relative flex items-center justify-center">
            <svg
                viewBox="0 0 100 140"
                className="w-full h-full"
            >
                <defs>
                    <mask id="fluidMask">
                        {/* Using the user's exact image as the mask source. 
                            Applying filters to crush non-black backgrounds to black (transparent) 
                            and boost the logo to white (opaque). */}
                        <image
                            href="/logo-mask.png"
                            x="0"
                            y="0"
                            width="100"
                            height="140"
                            preserveAspectRatio="xMidYMid meet"
                            style={{ filter: "grayscale(100%) contrast(300%) brightness(1.2)" }}
                        />
                    </mask>
                </defs>

                {/* Background Track Removed to prevent box artifacts */}
                {/* Liquid Fill (The Logo Shape getting filled) */}
                <rect
                    x="0"
                    y={140 - (fillProgress * 140)}
                    width="100"
                    height="140"
                    fill={baseColor}
                    mask="url(#fluidMask)"
                    className="transition-all duration-100 ease-linear"
                />
            </svg>
        </div>
    );
}
