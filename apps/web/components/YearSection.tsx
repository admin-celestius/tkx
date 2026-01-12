"use client";
import { Milestone } from "./TimelineTypes";
import Year2016 from "./features/Year2016";
import Year2017 from "./features/Year2017";
import Year2018 from "./features/Year2018";
import Year2019 from "./features/Year2019";
import Year2020 from "./features/Year2020";
import Year2021 from "./features/Year2021";
import Year2022 from "./features/Year2022";
import Year2023 from "./features/Year2023";
import Year2024 from "./features/Year2024";
import Year2025 from "./features/Year2025";
import Year2026 from "./features/Year2026";

export default function YearSection({ item, nextColor }: { item: Milestone; nextColor?: string }) {
    switch (item.year) {
        case "2016": return <Year2016 item={item} />;
        case "2017": return <Year2017 item={item} />;
        case "2018": return <Year2018 item={item} />;
        case "2019": return <Year2019 item={item} />;
        case "2020": return <Year2020 item={item} />;
        case "2021": return <Year2021 item={item} />;
        case "2022": return <Year2022 item={item} />;
        case "2023": return <Year2023 item={item} />;
        case "2024": return <Year2024 item={item} />;
        case "2025": return <Year2025 item={item} />;
        case "2026": return <Year2026 item={item} />;
        default: return null;
    }
}
