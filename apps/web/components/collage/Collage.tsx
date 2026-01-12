import BentoBox from './BentoBox';

// Example usage
export default function App() {
    const myImages = [
        "/shoot1/1.png", "/shoot1/2.png", "/shoot1/3.png",
        "/shoot1/4.png", "/shoot1/5.png", "/shoot1/6.png",
        "/shoot1/7.png", "/shoot1/8.png", "/shoot1/9.png",
        "/shoot1/10.png"
    ];

    return (
        <div className="bg-black min-h-screen flex items-center justify-center">
            <BentoBox images={myImages} />
        </div>
    );
}