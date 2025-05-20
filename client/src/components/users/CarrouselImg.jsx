import React from "react";
import { Carousel } from "flowbite-react";
import slide1 from "../../assets/slide1.webp";
import slide2 from "../../assets/slide2.webp";
import slide3 from "../../assets/slide3.webp";
import slide4 from "../../assets/slide4.webp";

const customTheme = {
    scrollContainer: {
        base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-hidden rounded-lg scroll-smooth", // Removed scroll-smooth
        snap: "snap-x",
    },
};

const CarrouselImg = () => {
    return (
        <div className="container w-full mx-auto mt-16 h-[300px] sm:h-[400px] xl:h-[500px] 2xl:h-[600px]">
            <Carousel theme={customTheme}>
                {[slide1, slide2, slide3, slide4].map((src, index) => (
                    <div
                        key={index}
                        className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white"
                    >
                        <img
                            loading="lazy"
                            src={src}
                            alt={`slide-${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default React.memo(CarrouselImg);
