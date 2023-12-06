import data from "@/app/(user)/gallery/data";
import { log } from "console";
import React, { useEffect } from "react";
interface Props {
  data: [];
  setSlideShowOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SlideShow = (props: Props) => {
  const [slideShow, setSlideShow] = React.useState(false);
  const [slideShowData, setSlideShowData] = React.useState([]);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [slideShowOpen, setSlideShowOpen] = React.useState(false);
  const [slideShowImage, setSlideShowImage] = React.useState("");
  const [slideShowTitle, setSlideShowTitle] = React.useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 3000);
    setSlideShowData(props.data);
    setSlideShowOpen(true);
    return () => {
      clearInterval(interval);
    };
  }, []);
  if (currentSlide === props.data.length - 1) {
    setCurrentSlide(0);
  }
  // console.log(props.data.map((item=> item)));

  // loop my props.data and get single link

  console.log(currentSlide);

  return ( 
    <>
      <div className="h-screen w-full flex absolute bg-base-200 top-0   overflow-hidden">
        <div style={{ transform: `translateX(-${currentSlide}00vw)` }} className={`wrapper  h-[100vh]  w-[100vw] flex   transition-all duration-700  `}>
       
      
            {props.data.map((item, index) => (
              <img key={index}  src={item} alt="" className="min-w-[100vw] h-screen  object-cover " />
            ))}
            </div>
      
     
      </div>   
    </>
  );
};

export default SlideShow;
