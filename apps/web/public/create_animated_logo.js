// const fs = require('fs');
// const path = require('path');

// const originalPath = path.join('public', 'tk-logo.svg');
// const newPath = path.join('public', 'tk-logo-animated.svg');

// try {
//     const svgContent = fs.readFileSync(originalPath, 'utf8');

//     // Extract the d attribute
//     const dMatch = svgContent.match(/d="([^"]+)"/);
//     if (!dMatch) {
//         console.error("Could not find d attribute");
//         process.exit(1);
//     }
//     const dPath = dMatch[1];

//     // Create the new SVG content
//     const newSvg = `
// <svg xmlns="http://www.w3.org/2000/svg" width="564" height="931" viewBox="0 0 564 931">
//   <defs>
//     <linearGradient id="goldGradient" x1="0%" y1="100%" x2="0%" y2="0%">
//         <stop offset="0%" stop-color="#4a3000">
//              <animate attributeName="stop-color" values="#4a3000;#8B6914;#c9a227;#8B6914" dur="6s" repeatCount="indefinite" />
//         </stop>
//         <stop offset="50%" stop-color="#8B6914" />
//         <stop offset="100%" stop-color="#a5851cff" />
//     </linearGradient>
    
//     <clipPath id="fillClip">
//         <rect x="0" y="931" width="564" height="931">
//             <animate attributeName="y" from="931" to="0" dur="6s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.55 1" />
//         </rect>
//     </clipPath>
    
//     <filter id="glow">
//         <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
//         <feMerge>
//             <feMergeNode in="coloredBlur"/>
//             <feMergeNode in="SourceGraphic"/>
//         </feMerge>
//     </filter>
//   </defs>
  
//   <!-- Background with low opacity -->
//   <path fill="#222" stroke="#8B6914" stroke-width="1" stroke-opacity="0.3" d="${dPath}" />

//   <!-- Animated Fill -->
//   <path fill="url(#goldGradient)" clip-path="url(#fillClip)" filter="url(#glow)" d="${dPath}" />
// </svg>
// `;

//     fs.writeFileSync(newPath, newSvg);
//     console.log("Created tk-logo-animated.svg");
// } catch (err) {
//     console.error(err);
// }

const fs = require('fs');
const path = require('path');

const originalPath = path.join('public', 'tk-logo.svg');
const newPath = path.join('public', 'tk-logo-animated.svg');

try {
    const svgContent = fs.readFileSync(originalPath, 'utf8');

    // Extract the d attribute
    const dMatch = svgContent.match(/d="([^"]+)"/);
    if (!dMatch) {
        console.error("Could not find d attribute");
        process.exit(1);
    }
    const dPath = dMatch[1];

    // Create the new SVG content
    const newSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="564" height="931" viewBox="0 0 564 931">
  <defs>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#785A14" />
        
        <stop offset="50%" stop-color="#F5D76E" />
        
        <stop offset="100%" stop-color="#B98C23" />
    </linearGradient>
    
    <clipPath id="fillClip">
        <rect x="0" y="931" width="564" height="931">
            <animate attributeName="y" from="931" to="0" dur="3s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.55 1" />
        </rect>
    </clipPath>
    
    <filter id="glow">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
  </defs>
  
  <path fill="#222" stroke="#785A14" stroke-width="1" stroke-opacity="0.3" d="${dPath}" />

  <path fill="url(#goldGradient)" clip-path="url(#fillClip)" filter="url(#glow)" d="${dPath}" />
</svg>
`;

    fs.writeFileSync(newPath, newSvg);
    console.log("Created tk-logo-animated.svg (Static Gradient)");
} catch (err) {
    console.error(err);
}