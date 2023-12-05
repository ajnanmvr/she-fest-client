import React from "react";

const ImageUpload = () => {
  const [files, setFiles] = React.useState<File[]>([]);

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
    if (files.length > 0) {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      console.log(formData);

      const res = await fetch(
        `https://rms-omega-six.vercel.app/candidates/uploadMultiple`,
        {
          method: "POST",
          body: formData,
        }
      );

      console.log(res);
    }
  }
  return (
    <div
      className="
    "
    >
      <h1>Image Upload</h1>

      {/* upload many images */}
      <input
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
        className="  bg-blue-500
        text-white
        rounded-md
        p-2 "
      >
        Upload
      </button>
    </div>
  );
};

export default ImageUpload;
