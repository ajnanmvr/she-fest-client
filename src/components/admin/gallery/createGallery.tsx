

import { AddIcon } from "@/icons/action";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  chunks: [];
  setChunks: any
}

const createGallery = (props: Props) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [fileee, setFile] = React.useState<File>();
  const [data, setData] = React.useState<any>(props.chunks);

  function imagesVerify(files: FileList | null) {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileType = file.type;
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (!validImageTypes.includes(fileType)) {
          alert("Invalid File Type");
          return false;
        }
      }
      return true;
    }
    return false;
  }

  async function handleUpload() {
    console.log(files);

    if (files.length > 0) {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      console.log(formData);

      const res = await axios.post(
        "https://realia23.azurewebsites.net/gallery/many",
        formData
      );

      const changed = res.data.map((data: any) => {
        return `https://drive.google.com/uc?id=${data.imageId}`
      })


      props.setChunks([...props.chunks, changed])
      toast.success("Images Uploaded Successfully 🎉 preview will take some time to load...");
    }
  }
  return (
    <div className="  w-full h-full ">
      <h1 className="text-secondary text-center font-semibold">Image Upload</h1>

      {/* upload many images */}
      <div className="flex items-center justify-center gap-4 mt-2">
        {/* <label
          htmlFor="file-upload"
          className="cursor-pointer bg-secondary space-x-2 relative bottom-0 right-0 w-8 h-8  text-white flex items-center justify-center rounded-full"
        >
          <AddIcon className="w-6 h-6 fill-white relative bottom-0 left-0" />
        </label> */}
        <input
          className="file-input file-input-bordered file-input-secondary w-1/3 max-w-xs"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const files = e.target.files;
            if (imagesVerify(files)) {
              setFiles(Array.from(files as FileList));
            }
          }}
          multiple
        />

        <button
          onClick={() => {
            console.log(files);
            handleUpload();
          }}
          className="btn btn-primary "
        >
          Upload
        </button>
      </div>

      <div className="w-[80%] h-[80%] overflow-y-auto mt-5 flex items-center justify-center ">
        <div className="images w-full h-[90%] flex flex-wrap overflow-y-auto items-center justify-center  ">
          {files &&
            files.map((image, index) => {
              return (
                <div
                  key={index}
                  className="h-36 w-36 ml-2 mt-2 rounded-md border-2 border-secondary relative"
                  style={{
                    backgroundImage: `url(${files
                        ? URL.createObjectURL(files[index])
                        : "https://drive.google.com/uc?id=1469PGeDEgnK5caEumLfGGUufCI0MY133"
                      })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* <img src={image.name} height="200" alt="upload" /> */}

                  <p>{index + 1}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default createGallery;
