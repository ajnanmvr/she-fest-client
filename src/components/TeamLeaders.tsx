import Carousel from "./Carousel";

const imageUrls = ["/img/1.jpg", "/img/2.jpg", "/img/3.jpg", "/img/4.jpg"];

function Home() {
  return (
    <div className="lg:flex justify-center items-center overflow-hidden h-[450px] hidden ">
      <Carousel images={imageUrls} />
    </div>
  );
}

export default Home;
