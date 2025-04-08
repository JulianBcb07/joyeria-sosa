import React from 'react'
import { Carousel } from "flowbite-react";
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import slide4 from '../assets/slide4.jpg';

const customTheme = {
    scrollContainer: {
        "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-hidden scroll-smooth rounded-lg",
        snap: "snap-x"
    }
};

const CarrouselImg = () => {

    return (
        <div className="container w-full mx-auto h-[300px] sm:h-[400px] xl:h-[500px] 2xl:h-[600px]">
            <Carousel onSlideChange={(index) => console.log("onSlideChange()", index)} theme={customTheme}>
                <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                    {<img src={slide1} alt="articulos promocionales" />}
                </div>
                <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                    {<img src={slide2} alt="articulos promocionales" />}
                </div>
                <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                    {<img src={slide3} alt="articulos promocionales" />}
                </div>
                <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                    {<img src={slide4} alt="articulos promocionales" />}
                </div>
            </Carousel>
        </div>
    )
}

export default CarrouselImg;