"use client";

import { useEffect, useState } from "react";
import CreateGallery from "./createGallery";
import Image from "next/image";
import { it } from "node:test";
import axios from "axios";
import { set } from "zod";
import { toast } from "react-toastify";
import { DeleteIcon } from "@/icons/action";

interface Props {
  result: [];
}

function Gallery(props: Props) {
  const [createGallery, setCreateGallery] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [chunks, setChunks] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [imageData, setImageData] = useState<any>([]);
  const [resultData, setResultData] = useState<any>([]);

  const chunk = (arr: any, size: number) =>
    arr.reduce(
      (acc: any, e: any, i: any) =>
        i % size ? acc : [...acc, arr.slice(i, i + size)],
      []
    );


  useEffect(() => {
    async function axs() {
      await axios.get(`https://result-gen.vercel.app/gallery?${Date.now()}`)
        .then(res => {
          setResultData(res.data)
          // console.log(data);
        })
        .catch(err => {
          // console.log(err)
        })
    }
    axs()
  }, [])

  useEffect(() => {
    const sortedDatanew = resultData.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setResultData(resultData);


    let image = sortedDatanew.map((item: any) => item.imageId);
    let finalData: any = [];
    for (let index = 0; index < sortedDatanew.length; index++) {
      finalData.push(`https://drive.google.com/uc?id=${image[index]}`);
    }
    setImageData(finalData);


    const chunksData = chunk(finalData, 12);
    setChunks(chunksData);
    // // console.log(chunks);
  }, [resultData]);

  const [toDeleteImage, setToDeleteImage] = useState<string>("");
  const hadndleDelete = async (item: any) => {
    // console.log(item.split("=")[1]);
    setToDeleteImage(item);
    const id = item.split("=")[1];
    const find = resultData.find((item: any) => item.imageId === id);
    // console.log(data);

    try {
      const res = await axios.delete(
        `https://result-gen.vercel.app/gallery/${find.id}`
      );
      // // console.log(props.result);
      toast.success("Image deleted successfully");
      const filterd = imageData.filter((itm: any) => {
        return itm != `https://drive.google.com/uc?id=${find.imageId}`;
      });
      // console.log(filterd);
      setImageData(filterd);

      const chunksData = chunk(filterd, 12);


      setChunks(chunksData);
      // console.log(chunks);

    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="w-full h-full overflow-scroll">
        <div className="h-10 cursor-pointer flex  justify-end mb-4">
          {/* search bar */}
          <button
            className="inline-flex bg-secondary text-white rounded-full px-5 py-2 font-bold"
            onClick={() => {
              setIsCreate(true);
              setIsEdit(false);
              setCreateGallery(true);
              setIsOpen(!isOpen);
            }}
          >
            Create
          </button>
        </div>

        {chunks.map((item: any, index: any) => {
          return (
            <div className="hidden lg:grid mt-4 grid-cols-8 grid-rows-7 gap-4  w-full h-full m-b-5 overflow-y-auto ">
              {item[0] && (
                <div
                  className={` col-span-2 row-span-3 col-start-1 row-start-3 rounded-md`}
                  style={{
                    backgroundImage: `url(${item[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[0])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[1] && (
                <div
                  className="  col-span-2 row-span-2 col-start-1 row-star-1"
                  style={{
                    backgroundImage: `url(${item[1]}  )`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[1])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[2] && (
                <div
                  className="  col-span-2 row-span-3 col-start-3 row-start-5"
                  style={{
                    backgroundImage: `url(${item[2]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[2])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[3] && (
                <div
                  className=" col-span-2 row-span-2 col-start-3 row-start-1"
                  style={{
                    backgroundImage: `url( ${item[3]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[3])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[4] && (
                <div
                  className="  col-span-2 row-span-2 col-start-3 row-start-3"
                  style={{
                    backgroundImage: `url( ${item[4]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[4])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[5] && (
                <div
                  className="  col-span-2 row-span-3 col-start-5 row-start-1"
                  style={{
                    backgroundImage: `url( ${item[5]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[5])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[6] && (
                <div
                  className="  col-span-2 row-span-2 col-start-1 row-start-6"
                  style={{
                    backgroundImage: `url(${item[6]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[6])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[7] && (
                <div
                  className="  col-span-2 row-span-2 col-start-5 row-start-4"
                  style={{
                    backgroundImage: `url( ${item[7]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[7])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[8] && (
                <div
                  className="  col-span-2 row-span-3 col-start-7 row-start-3"
                  style={{
                    backgroundImage: `url( ${item[8]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[8])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[9] && (
                <div
                  className="  col-span-2 row-span-2 col-start-7 row-start-1"
                  style={{
                    backgroundImage: `url( ${item[9]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[9])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[10] && (
                <div
                  className="  col-span-2 row-span-2 col-start-7 row-start-6"
                  style={{
                    backgroundImage: `url(  ${item[10]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[10])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[11] && (
                <div
                  className="  col-span-2 row-span-2 col-start-5 row-start-6"
                  style={{
                    backgroundImage: `url(   ${item[11]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[11])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {chunks.map((item: any, index: any) => {
          return (
            <div className=" hidden sm:grid lg:hidden grid-cols-6 grid-rows-9 gap-4  w-full h-full m-b-5 overflow-y-auto mt-4 pr-5">
              {item[0] && (
                <div
                  className=" col-span-2 row-span-2"
                  style={{
                    backgroundImage: `url(${item[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[0])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[1] && (
                <div
                  className=" col-span-2 row-span-3 col-start-1 row-start-3"
                  style={{
                    backgroundImage: `url(${item[1]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[1])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[2] && (
                <div
                  className=" col-span-2 row-span-2 col-start-1 row-start-6"
                  style={{
                    backgroundImage: `url(${item[2]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[2])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[3] && (
                <div
                  className=" col-span-2 row-span-2 col-start-1 row-start-8"
                  style={{
                    backgroundImage: `url(${item[3]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[3])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[4] && (
                <div
                  className=" col-span-2 row-span-3 col-start-3 row-start-1"
                  style={{
                    backgroundImage: `url(${item[4]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[4])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[5] && (
                <div
                  className=" col-span-2 row-span-2 col-start-3 row-start-4"
                  style={{
                    backgroundImage: `url(${item[5]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[5])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[6] && (
                <div
                  className=" col-span-2 row-span-2 col-start-3 row-start-6"
                  style={{
                    backgroundImage: `url(${item[6]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[6])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[7] && (
                <div
                  className=" col-span-2 row-span-2 col-start-3 row-start-8"
                  style={{
                    backgroundImage: `url(${item[7]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[7])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[8] && (
                <div
                  className=" col-span-2 row-span-2 col-start-5 row-start-1"
                  style={{
                    backgroundImage: `url(${item[8]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[8])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[9] && (
                <div
                  className=" col-span-2 row-span-2 col-start-5 row-start-3"
                  style={{
                    backgroundImage: `url(${item[9]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[9])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[10] && (
                <div
                  className=" col-span-2 row-span-3 col-start-5 row-start-5"
                  style={{
                    backgroundImage: `url(${item[10]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[10])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[11] && (
                <div
                  className=" col-span-2 row-span-2 col-start-5 row-start-8"
                  style={{
                    backgroundImage: `url(${item[11]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[11])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {chunks.map((item: any, index: any) => {
          return (
            <div className=" sm:hidden grid grid-cols-4 grid-rows-9 gap-4 w-full h-full m-b-5 overflow-y-auto mt-4 pr-5">
              {item[0] && (
                <div
                  className=" bg-slate-600 col-span-2 row-span-2"
                  style={{
                    backgroundImage: `url(   ${item[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[0])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[1] && (
                <div
                  className=" bg-slate-600 col-span-2 col-start-1 row-start-3"
                  style={{
                    backgroundImage: `url(   ${item[1]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[1])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[2] && (
                <div
                  className=" bg-slate-600 col-span-2 col-start-1 row-start-4"
                  style={{
                    backgroundImage: `url(   ${item[2]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[2])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[3] && (
                <div
                  className=" bg-slate-600 col-span-2 col-start-1 row-start-7"
                  style={{
                    backgroundImage: `url(   ${item[3]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[3])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[4] && (
                <div
                  className=" bg-slate-600 col-span-2 row-span-2 col-start-1 row-start-8"
                  style={{
                    backgroundImage: `url(   ${item[4]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[4])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[5] && (
                <div
                  className=" bg-slate-600 col-span-2 row-span-2 col-start-3 row-start-1"
                  style={{
                    backgroundImage: `url(   ${item[5]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[5])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[6] && (
                <div
                  className=" bg-slate-600 col-span-2 col-start-3 row-start-3"
                  style={{
                    backgroundImage: `url(   ${item[6]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[6])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[7] && (
                <div
                  className=" bg-slate-600 col-span-2 col-start-3 row-start-4"
                  style={{
                    backgroundImage: `url(   ${item[7]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[7])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[8] && (
                <div
                  className=" bg-slate-600 col-span-2 row-span-2 col-start-3 row-start-7"
                  style={{
                    backgroundImage: `url(   ${item[8]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[8])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[9] && (
                <div
                  className=" bg-slate-600 col-span-2 row-span-2 col-start-3 row-start-5"
                  style={{
                    backgroundImage: `url(   ${item[9]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[9])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[10] && (
                <div
                  className=" bg-slate-600 col-span-2 row-span-2 col-start-3 row-start-7"
                  style={{
                    backgroundImage: `url(   ${item[10]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[10])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
              {item[11] && (
                <div
                  className=" bg-slate-600 col-span-2 col-start-3 row-start-9"
                  style={{
                    backgroundImage: `url(   ${item[11]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}

                >
                  <div onClick={() => hadndleDelete(item[11])}>
                    <DeleteIcon className="w-9 h-9 fill-white relative bottom-0 left-0 bg-secondary p-3 cursor-pointer rounded-md" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {isOpen && <CreateGallery chunks={chunks} setChunks={setChunks} />}
    </>
  );
}

export default Gallery;
