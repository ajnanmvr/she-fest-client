"use client";
import React, { useEffect, useState } from "react";
import GalleryHeader from "@/components/GalleryHeader";
import SlideShow from "./SlideShow";
import { SlideShowIcon } from "@/icons/action";
import axios from "axios";

interface Props {
  result: [];
}

function userGallery(props: Props) {
  const [resultData, setResultData] = useState<any>([]);  
  const [chunks, setChunks] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [imageData, setImageData] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [slectedImage, setSelectedImage] = useState<any>("");
  const [nextOneImage, setNextOneImage] = useState<any>("");
  const [nextTwoImage, setNextTwoImage] = useState<any>("");
  const [nextThreeImage, setNextThreeImage] = useState<any>("");
  const [defaultImageOne, setDefaultImageOne] = useState<any>("");
  const [defaultImageTwo, setDefaultImageTwo] = useState<any>("");
  const [defaultImageThree, setDefaultImageThree] = useState<any>("");
  const [slideShowOpen, setSlideShowOpen] = useState<boolean>(false);
  const chunk = (arr: any, size: number) =>
    arr.reduce(
      (acc: any, e: any, i: any) =>
        i % size ? acc : [...acc, arr.slice(i, i + size)],
      []
    );
  
    useEffect(() => {
      const getGallery =  async () => {
          await axios.get(`https://result-gen.vercel.app/gallery?${Date.now()}`)
              .then(res => {
                setResultData(res.data)
                  // // console.log(data);
              })
              .catch(err => {
                  // // console.log(err)
              })
      }
      getGallery()
  }, [])

  useEffect(() => {
    const sortedDatanew = resultData.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setResultData(resultData);
    // console.log(data);

    // console.log(sortedDatanew);

    let image = sortedDatanew.map((item: any) => item.imageId);
    let finalData: any = [];
    for (let index = 0; index < sortedDatanew.length; index++) {
      finalData.push(`https://drive.google.com/uc?id=${image[index]}`);
    }
    setImageData(finalData);

    // console.log(finalData);

    const chunksData = chunk(finalData, 12);
    setChunks(chunksData);
  }, [resultData]);

  const handleOpen = (image: any) => {
    setOpen(!open);
    setSelectedImage(image);
    // console.log(image);
    // i have to get onther 3 images
    const index = imageData.indexOf(image);
    // console.log(index);
    const nextOne = imageData[index + 1];
    const nextTwo = imageData[index + 2];
    const nextThree = imageData[index + 3];
    const prevImage = imageData[index - 1];
    const PrevImageTwo = imageData[index - 2];
    const prevImagethree = imageData[index - 3];
    const defaultImage = imageData[0];
    const defaultImage2 = imageData[1];

    setNextOneImage(nextOne);
    setNextTwoImage(nextTwo);
    setNextThreeImage(nextThree);
    setDefaultImageOne(prevImage);
    setDefaultImageTwo(PrevImageTwo);
    setDefaultImageThree(prevImagethree);
  };
  return (
    <>
      <div className="h-screen w-screen overflow-x-hidden">
        <div className={`p-10 md:p-16 ${open ? "hidden" : "block"} `}>
          <GalleryHeader/>
        </div>

        {open && (
          <div className="h-screen w-screen bg-[#00000073] absolute z-50 ">
            <div className="hidden bg-white md:block fixed rounded-2xl z-50 border-x-[1rem] border-t-[1rem] border-b-[1rem] border-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bottom-0 transition-all duration-500">
              <button
                className="bg-white h-10 w-10 absolute top-2 right-2 rounded-full opacity-60 flex items-center justify-center"
                onClick={() => setOpen(!open)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height={24}
                  viewBox="0 -960 960 960"
                  width={24}
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
              <img
                className="h-full max-w-full object-cover "
                src={slectedImage}
                alt=""
              />
            </div>
          </div>
        )}

        {
          <div
            className={`fixed z-[100] top-0 h-screen w-screen ${
              !open ? `translate-x-full` : "translate-x-0"
            }   bg-white md:hidden  transition-all duration-500`}
          >
            <button
              className="bg-gray-100 h-10 w-10 absolute top-5 left-5 rounded-full opacity-60 flex items-center justify-center"
              onClick={() => setOpen(!open)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 -960 960 960"
                width={24}
              >
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
              </svg>
            </button>
            <img
              className="w-[90%] h-96 mx-auto mt-24 mb-2 object-cover rounded-md"
              src={slectedImage}
              alt=""
            />

            <div className="flex flex-wrap gap-2 justify-center ">
              <div
                className="h-24 w-24 bg-base-200 rounded overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: `url(${nextOneImage || defaultImageOne})`,
                }}
                onClick={() =>
                  setSelectedImage(nextOneImage || defaultImageOne)
                }
              ></div>
              <div
                className="h-24 w-24 bg-base-200 rounded overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: `url(${nextTwoImage || defaultImageTwo})`,
                }}
                onClick={() =>
                  setSelectedImage(nextTwoImage || defaultImageTwo)
                }
              ></div>
              <div
                className="h-24 w-24 bg-base-200 rounded overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: `url(${
                    nextThreeImage || defaultImageThree
                  })`,
                }}
                onClick={() =>
                  setSelectedImage(nextThreeImage || defaultImageThree)
                }
              ></div>
            </div>
          </div>
        }

        <div className=" w-full text-secondary overflow-hidden flex text-5xl lg:text-6xl font-black gap-2 text-color1 items-end py-5 lg:py-10 bg-background transition-all duration-500">
          <h1 className="-ml-24 opacity-50">Gallery</h1>
          <h1>Gallery</h1>
          <h1 className="opacity-50">Gallery</h1>
          <h1 className="opacity-50">Gallery</h1>
          <h1 className="opacity-50">Gallery</h1>
          <h1 className="opacity-50">Gallery</h1>
          <h1 className="opacity-50">Gallery</h1>
          <h1 className="opacity-50">Gallery</h1>
          <h1 className="opacity-50">Gallery</h1>
          <h1 className="opacity-50">Gallery</h1>
          <h1 className="opacity-50">Gallery</h1>
        </div>
        {/* gallery */}

        {chunks.length > 0 ? (
          chunks.map((item: any, index: any) => {
            return (
              <div className="hidden lg:grid mt-4 grid-cols-8 grid-rows-7 gap-4  w-full h-full m-b-5 overflow-y-auto px-5  pb-5">
                {item[0] && (
                  <div
                    className={`bg-base-200 rounded-md  col-span-2 row-span-3 col-start-1 row-start-3 `}
                    style={{
                      backgroundImage: `url(${item[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => handleOpen(item[0])}
                  ></div>
                )}
                {item[1] && (
                  <div
                    className="bg-base-200 rounded-md    col-span-2 row-span-2 col-start-1 row-star-1"
                    style={{
                      backgroundImage: `url(${item[1]}  )`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => handleOpen(item[1])}
                  ></div>
                )}
                {item[2] && (
                  <div
                    className="bg-base-200 rounded-md    col-span-2 row-span-3 col-start-3 row-start-5"
                    style={{
                      backgroundImage: `url(${item[2]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => handleOpen(item[2])}
                  ></div>
                )}
                {item[3] && (
                  <div
                    className="bg-base-200 rounded-md   col-span-2 row-span-2 col-start-3 row-start-1"
                    style={{
                      backgroundImage: `url( ${item[3]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => handleOpen(item[3])}
                  ></div>
                )}
                {item[4] && (
                  <div
                    className="bg-base-200 rounded-md   col-span-2 row-span-2 col-start-3 row-start-3"
                    style={{
                      backgroundImage: `url( ${item[4]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => handleOpen(item[4])}
                  ></div>
                )}
                {item[5] && (
                  <div
                    className="bg-base-200 rounded-md   col-span-2 row-span-3 col-start-5 row-start-1"
                    style={{
                      backgroundImage: `url( ${item[5]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => handleOpen(item[5])}
                  ></div>
                )}
                {item[6] && (
                  <div
                    className="bg-base-200 rounded-md   col-span-2 row-span-2 col-start-1 row-start-6"
                    style={{
                      backgroundImage: `url(${item[6]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => handleOpen(item[6])}
                  ></div>
                )}
                {item[7] && (
                  <div
                    className="bg-base-200 rounded-md   col-span-2 row-span-2 col-start-5 row-start-4"
                    style={{
                      backgroundImage: `url( ${item[7]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => handleOpen(item[7])}
                  ></div>
                )}
                {item[8] && (
                  <div
                    className="bg-base-200 rounded-md   col-span-2 row-span-3 col-start-7 row-start-3"
                    style={{
                      backgroundImage: `url( ${item[8]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => handleOpen(item[8])}
                  ></div>
                )}
                {item[9] && (
                  <div
                    className="bg-base-200 rounded-md   col-span-2 row-span-2 col-start-7 row-start-1"
                    style={{
                      backgroundImage: `url( ${item[9]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => handleOpen(item[9])}
                  ></div>
                )}
                {item[10] && (
                  <div
                    className="bg-base-200 rounded-md   col-span-2 row-span-2 col-start-7 row-start-6"
                    style={{
                      backgroundImage: `url(  ${item[10]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => handleOpen(item[10])}
                  ></div>
                )}
                {item[11] && (
                  <div
                    className="bg-base-200 rounded-md   col-span-2 row-span-2 col-start-5 row-start-6"
                    style={{
                      backgroundImage: `url(   ${item[11]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => handleOpen(item[11])}
                  ></div>
                )}
              </div>
            );
          })
        ) : (
          <>
            <div className="hidden lg:grid mt-4 grid-cols-8 grid-rows-7 gap-4  w-full h-full m-b-5 overflow-y-auto px-5 ">
              <div
                className={` animate-pulse rounded-md bg-base-200 col-span-2 row-span-3 col-start-1 row-start-3 `}
              ></div>

              <div className=" animate-pulse rounded-md bg-base-200   col-span-2 row-span-2 col-start-1 row-star-1"></div>

              <div className=" animate-pulse rounded-md bg-base-200   col-span-2 row-span-3 col-start-3 row-start-5"></div>

              <div className=" animate-pulse rounded-md bg-base-200  col-span-2 row-span-2 col-start-3 row-start-1"></div>

              <div className=" animate-pulse rounded-md bg-base-200  col-span-2 row-span-2 col-start-3 row-start-3"></div>

              <div className=" animate-pulse rounded-md bg-base-200  col-span-2 row-span-3 col-start-5 row-start-1"></div>

              <div className=" animate-pulse rounded-md bg-base-200  col-span-2 row-span-2 col-start-1 row-start-6"></div>

              <div className=" animate-pulse rounded-md bg-base-200  col-span-2 row-span-2 col-start-5 row-start-4"></div>

              <div className=" animate-pulse rounded-md bg-base-200  col-span-2 row-span-3 col-start-7 row-start-3"></div>

              <div className=" animate-pulse rounded-md bg-base-200  col-span-2 row-span-2 col-start-7 row-start-1"></div>

              <div className=" animate-pulse rounded-md bg-base-200  col-span-2 row-span-2 col-start-7 row-start-6"></div>

              <div className=" animate-pulse rounded-md bg-base-200  col-span-2 row-span-2 col-start-5 row-start-6"></div>
            </div>
          </>
        )}

        {chunks.length > 0 ? (
          chunks.map((item: any, index: any) => {
            return (
              <div className=" hidden sm:grid lg:hidden grid-cols-6 grid-rows-9 gap-4  w-full h-full m-b-5 overflow-y-auto mt-4 px-5">
                <div
                  className="bg-base-200rounded-md col-span-2 row-span-2"
                  style={{
                    backgroundImage: `url(${item[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[0])}
                ></div>
                <div
                  className="bg-base-200rounded-md col-span-2 row-span-3 col-start-1 row-start-3"
                  style={{
                    backgroundImage: `url(${item[1]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[1])}
                ></div>
                <div
                  className="bg-base-200rounded-md col-span-2 row-span-2 col-start-1 row-start-6"
                  style={{
                    backgroundImage: `url(${item[2]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[2])}
                ></div>
                <div
                  className="bg-base-200rounded-md col-span-2 row-span-2 col-start-1 row-start-8"
                  style={{
                    backgroundImage: `url(${item[3]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[3])}
                ></div>
                <div
                  className="bg-base-200rounded-md col-span-2 row-span-3 col-start-3 row-start-1"
                  style={{
                    backgroundImage: `url(${item[4]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[4])}
                ></div>
                <div
                  className="bg-base-200rounded-md col-span-2 row-span-2 col-start-3 row-start-4"
                  style={{
                    backgroundImage: `url(${item[5]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[5])}
                ></div>
                <div
                  className="bg-base-200rounded-md col-span-2 row-span-2 col-start-3 row-start-6"
                  style={{
                    backgroundImage: `url(${item[6]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[6])}
                ></div>
                <div
                  className="bg-base-200rounded-md col-span-2 row-span-2 col-start-3 row-start-8"
                  style={{
                    backgroundImage: `url(${item[7]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[7])}
                ></div>
                <div
                  className="bg-base-200rounded-md col-span-2 row-span-2 col-start-5 row-start-1"
                  style={{
                    backgroundImage: `url(${item[8]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[8])}
                ></div>
                <div
                  className="bg-base-200rounded-md col-span-2 row-span-2 col-start-5 row-start-3"
                  style={{
                    backgroundImage: `url(${item[9]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[9])}
                ></div>
                <div
                  className="bg-base-200rounded-md col-span-2 row-span-3 col-start-5 row-start-5"
                  style={{
                    backgroundImage: `url(${item[10]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[10])}
                ></div>
                <div
                  className="bg-base-200rounded-md col-span-2 row-span-2 col-start-5 row-start-8"
                  style={{
                    backgroundImage: `url(${item[11]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[11])}
                ></div>
              </div>
            );
          })
        ) : (
          <>
            <div className=" hidden sm:grid lg:hidden grid-cols-6 grid-rows-9 gap-4  w-full h-full m-b-5 overflow-y-auto mt-4 px-5">
              <div className="rounded-md bg-base-200 animate-pulse col-span-2 row-span-2"></div>
              <div className="rounded-md bg-base-200 animate-pulse col-span-2 row-span-3 col-start-1 row-start-3"></div>
              <div className="rounded-md bg-base-200 animate-pulse col-span-2 row-span-2 col-start-1 row-start-6"></div>
              <div className="rounded-md bg-base-200 animate-pulse col-span-2 row-span-2 col-start-1 row-start-8"></div>
              <div className="rounded-md bg-base-200 animate-pulse col-span-2 row-span-3 col-start-3 row-start-1"></div>
              <div className="rounded-md bg-base-200 animate-pulse col-span-2 row-span-2 col-start-3 row-start-4"></div>
              <div className="rounded-md bg-base-200 animate-pulse col-span-2 row-span-2 col-start-3 row-start-6"></div>
              <div className="rounded-md bg-base-200 animate-pulse col-span-2 row-span-2 col-start-3 row-start-8"></div>
              <div className="rounded-md bg-base-200 animate-pulse col-span-2 row-span-2 col-start-5 row-start-1"></div>
              <div className="rounded-md bg-base-200 animate-pulse col-span-2 row-span-2 col-start-5 row-start-3"></div>
              <div className="rounded-md bg-base-200 animate-pulse col-span-2 row-span-3 col-start-5 row-start-5"></div>
              <div className="rounded-md bg-base-200 animate-pulse col-span-2 row-span-2 col-start-5 row-start-8"></div>
            </div>
          </>
        )}

        {chunks.length > 0 ? (
          chunks.map((item: any, index: any) => {
            return (
              <div className=" sm:hidden grid grid-cols-4 grid-rows-9 gap-4 w-full h-full m-b-5 overflow-y-auto mt-4 px-5 pb-5">
                <div
                  className=" bg-base-200 rounded-md col-span-2 row-span-2"
                  style={{
                    backgroundImage: `url(   ${item[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[0])}
                ></div>
                <div
                  className=" bg-base-200 rounded-md col-span-2 col-start-1 row-start-3"
                  style={{
                    backgroundImage: `url(   ${item[1]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[1])}
                ></div>
                <div
                  className=" bg-base-200 rounded-md col-span-2 col-start-1 row-start-4"
                  style={{
                    backgroundImage: `url(   ${item[2]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[2])}
                ></div>
                <div
                  className=" bg-base-200 rounded-md col-span-2 col-start-1 row-start-7"
                  style={{
                    backgroundImage: `url(   ${item[3]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[3])}
                ></div>
                <div
                  className=" bg-base-200 rounded-md col-span-2 row-span-2 col-start-1 row-start-8"
                  style={{
                    backgroundImage: `url(   ${item[4]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[4])}
                ></div>
                <div
                  className=" bg-base-200 rounded-md col-span-2 row-span-2 col-start-3 row-start-1"
                  style={{
                    backgroundImage: `url(   ${item[5]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[5])}
                ></div>
                <div
                  className=" bg-base-200 rounded-md col-span-2 col-start-3 row-start-3"
                  style={{
                    backgroundImage: `url(   ${item[6]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[6])}
                ></div>
                <div
                  className=" bg-base-200 rounded-md col-span-2 col-start-3 row-start-4"
                  style={{
                    backgroundImage: `url(   ${item[7]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[7])}
                ></div>
                <div
                  className=" bg-base-200 rounded-md col-span-2 row-span-2 col-start-1 row-start-5"
                  style={{
                    backgroundImage: `url(   ${item[8]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[8])}
                ></div>
                <div
                  className=" bg-base-200 rounded-md col-span-2 row-span-2 col-start-3 row-start-5"
                  style={{
                    backgroundImage: `url(   ${item[9]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[9])}
                ></div>
                <div
                  className=" bg-base-200 rounded-md col-span-2 row-span-2 col-start-3 row-start-7"
                  style={{
                    backgroundImage: `url(   ${item[10]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[10])}
                ></div>

                <div
                  className=" bg-base-200 rounded-md col-span-2 col-start-3 row-start-9"
                  style={{
                    backgroundImage: `url(   ${item[11]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => handleOpen(item[11])}
                ></div>
              </div>
            );
          })
        ) : (
          <>
            <div className=" sm:hidden grid grid-cols-4 grid-rows-9 gap-4 w-full h-full m-b-5 overflow-y-auto mt-4 px-5 pb-5">
              <div className=" rounded-md bg-base-200 animate-pulse col-span-2 row-span-2 col-start-1 row-start-2"></div>
              <div className=" rounded-md bg-base-200 animate-pulse col-span-2 col-start-1 row-start-4"></div>
              <div className=" rounded-md bg-base-200 animate-pulse col-span-2 col-start-1 row-start-5"></div>
              <div className=" rounded-md bg-base-200 animate-pulse col-span-2 col-start-1 row-start-1"></div>
              <div className=" rounded-md bg-base-200 animate-pulse col-span-2 row-span-2 col-start-1 row-start-8"></div>
              <div className=" rounded-md bg-base-200 animate-pulse col-span-2 row-span-2 col-start-3 row-start-1"></div>
              <div className=" rounded-md bg-base-200 animate-pulse col-span-2 col-start-3 row-start-3"></div>
              <div className=" rounded-md bg-base-200 animate-pulse col-span-2 col-start-3 row-start-4"></div>
              <div className=" rounded-md bg-base-200 animate-pulse col-span-2 row-span-2 col-start-1 row-start-6"></div>
              <div className=" rounded-md bg-base-200 animate-pulse col-span-2 row-span-2 col-start-3 row-start-5"></div>
              <div className=" rounded-md bg-base-200 animate-pulse col-span-2 row-span-2 col-start-3 row-start-7"></div>
              <div className=" rounded-md bg-base-200 animate-pulse col-span-2 col-start-3 row-start-9"></div>
            </div>
          </>
        )}


        {/* slideshow */}

        <button onClick={()=> setSlideShowOpen(!slideShowOpen)} className="hidden lg:block btn btn-active btn-secondary fixed bottom-4 right-4 z-50">

          <SlideShowIcon className="w-6 h-6 fill-white  opacity-80" />
        </button>
   
        {  
          slideShowOpen &&  <div>
            
            <SlideShow data={imageData as any} setSlideShowOpen={setSlideShowOpen}/>
          </div>
          
        }
      </div>

    </>  
  );
}

export default userGallery;
