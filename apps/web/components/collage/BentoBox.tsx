import React from 'react';

interface BentoGalleryProps {
    images: string[];
}

const BentoGallery: React.FC<BentoGalleryProps> = ({ images }) => {
    const displayImages = images.slice(0, 10);

    if (displayImages.length < 10) {
        return <div className="text-white">Error: Please provide at least 10 images.</div>;
    }

    return (
        <>
            <style>
                {`
          @keyframes subtleZoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.2); }
          }
          .animate-zoom-continuous {
            animation: subtleZoom 7s ease-in-out infinite alternate;
          }
        `}
            </style>

            <div className="min-h-screen w-full flex items-center justify-center bg-gray-900">

                {/* Changed gap-2 to gap-4 for wider spacing */}
                <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-4 gap-4 w-[95vw] h-[95vh]">

                    {/* --- LEFT COLUMN --- */}

                    {/* 1. Top Left */}
                    <div className="md:col-span-1 md:row-span-1 overflow-hidden rounded-md">
                        <img src={displayImages[0]} alt="0" className="w-full h-full object-cover animate-zoom-continuous" />
                    </div>

                    {/* 2. Top Left-Right */}
                    <div className="md:col-span-1 md:row-span-1 overflow-hidden rounded-md">
                        <img src={displayImages[1]} alt="1" className="w-full h-full object-cover animate-zoom-continuous" />
                    </div>

                    {/* 3. Middle Left (Large) */}
                    <div className="md:col-span-2 md:row-span-2 overflow-hidden rounded-md">
                        <img src={displayImages[2]} alt="2" className="w-full h-full object-cover animate-zoom-continuous" />
                    </div>

                    {/* 4. Bottom Left */}
                    <div className="md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-4 overflow-hidden rounded-md">
                        <img src={displayImages[3]} alt="3" className="w-full h-full object-cover animate-zoom-continuous" />
                    </div>

                    {/* 5. Bottom Left-Right */}
                    <div className="md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-4 overflow-hidden rounded-md">
                        <img src={displayImages[4]} alt="4" className="w-full h-full object-cover animate-zoom-continuous" />
                    </div>


                    {/* --- MIDDLE COLUMN --- */}

                    {/* 6. Top Middle (Tall) */}
                    <div className="md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-1 overflow-hidden rounded-md">
                        <img src={displayImages[5]} alt="5" className="w-full h-full object-cover animate-zoom-continuous" />
                    </div>

                    {/* 7. Bottom Middle (Tall) */}
                    <div className="md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-3 overflow-hidden rounded-md">
                        <img src={displayImages[6]} alt="6" className="w-full h-full object-cover animate-zoom-continuous" />
                    </div>


                    {/* --- RIGHT COLUMN --- */}

                    {/* 8. Top Right (Large) */}
                    <div className="md:col-span-2 md:row-span-2 md:col-start-5 md:row-start-1 overflow-hidden rounded-md">
                        <img src={displayImages[7]} alt="7" className="w-full h-full object-cover animate-zoom-continuous" />
                    </div>

                    {/* 9. Middle Right (Wide) */}
                    <div className="md:col-span-2 md:row-span-1 md:col-start-5 md:row-start-3 overflow-hidden rounded-md">
                        <img src={displayImages[8]} alt="8" className="w-full h-full object-cover animate-zoom-continuous" />
                    </div>

                    {/* 10. Bottom Right (Wide) */}
                    <div className="md:col-span-2 md:row-span-1 md:col-start-5 md:row-start-4 overflow-hidden rounded-md">
                        <img src={displayImages[9]} alt="9" className="w-full h-full object-cover animate-zoom-continuous" />
                    </div>

                </div>
            </div>
        </>
    );
};

export default BentoGallery;