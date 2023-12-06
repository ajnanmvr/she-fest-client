"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface Props {
    images : any
}

const Carousel = (props : Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % props.images.length);
    }, 3000); // Change image every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [activeIndex, props.images]);

  return (
    <div className="relative w-full h-full">
      {props.images.map((image : any , index : number) => (
        <div
          key={index}
          className={`absolute transition-opacity duration-500 w-full   ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={image} alt={`Image ${index}`} className="w-full h-full"   />
        </div>
      ))}
    </div>
  );
};

export default Carousel;