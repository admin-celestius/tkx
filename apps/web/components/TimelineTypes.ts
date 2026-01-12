export interface ThemePalette {
    bg: string;
    text: string;
    accent: string;
    font?: string;
}

export interface Milestone {
    year: string;
    title: string;
    description: string;
    image: string;
    theme: ThemePalette;
    transition?: "circle" | "liquid" | "corner" | "wipe" | "pixel" | "slit";
}
