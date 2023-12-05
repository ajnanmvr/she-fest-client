"use client";
import {
  AddCandidateDocument,
  AddCandidateMutation,
  AddCandidateMutationVariables,
  Mode,
  Model,
  Candidate,
  Type,
  Category,
  Team,
} from "@/gql/graphql";
import { AddIcon } from "@/icons/action";
import React from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  data: Candidate[];
  setData: React.Dispatch<React.SetStateAction<Candidate[]>>;
  categories: Category[];
  teams: Team[];
}

const CreateCandidate = (props: Props) => {
  const [name, setName] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [chestNO, setChestNO] = React.useState<string>();
  const [team, setTeam] = React.useState<string>("");
  const [adno, setAdno] = React.useState<number>();
  const [classs, setClass] = React.useState<string>("");
  const [image, setImage] = React.useState<File>();
  const [state, CreateCandidateExecute] = useMutation(AddCandidateDocument);

  const HandleSubmit = async (data: any) => {
    const datas: OperationResult<
      AddCandidateMutation,
      AddCandidateMutationVariables
    > = await CreateCandidateExecute({
      name: data.name,
      category: data.category,
      chestNO: data.chestNO,
      team: data.team,
      adno: data.adno,
      class: data.class,
    });

    console.log(datas);

    if (datas.data?.createCandidate) {
      // upload image to server
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append(
          "chestNo",
          datas.data?.createCandidate.chestNO as string
        );

        console.log(formData.get("chestNo"));

        // upload image to server using axios
        const res = await fetch(
          `https://rms-omega-six.vercel.app/candidates/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        console.log(await res.json());
      }
      alert("Candidate Added");
      props.setData([...props.data, datas.data?.createCandidate as Candidate]);
    } else {
      alert(datas.error?.message.split("]")[1]);
    }
  };

  function imageVerify(file: File) {
    const types = ["image/png", "image/jpeg", "image/jpg"];
    if (types.every((type) => file.type !== type)) {
      alert(`${file.type} is not a supported format`);
      return false;
    }
    return true;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit({ name, category, chestNO, team, adno, classs  });
        }}
      >
        <div className="flex w-full justify-center">
          <div
            className="h-36 w-36 rounded-full border-8 border-secondary relative"
            style={{
              backgroundImage: `url(${
                image
                  ? URL.createObjectURL(image)
                  : "https://drive.google.com/uc?id=1469PGeDEgnK5caEumLfGGUufCI0MY133"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-secondary space-x-2 absolute bottom-0 right-0 w-8 h-8  text-white flex items-center justify-center rounded-full"
            >
              <AddIcon className="w-6 h-6 fill-white" />
            </label>
            <input
              id="file-upload"
              className="hidden"
              type="file"
              onChange={(e) => { 
                if (e.target.files) {
                  const file = e.target.files[0];
                  if (imageVerify(file)) {
                    setImage(file);
                  }
                }
              }}
            />
          </div>
        </div>

        {/* show the uploaded image for verification for user */}

        <p>Chest Nom</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-secondary w-full max-w-xs"
          value={chestNO}
          onChange={(e) => setChestNO(e.target.value)}
        />
        <p>Name</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-secondary w-full max-w-xs"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-secondary w-full max-w-xs h-8"
        >
          {props.categories.map((value, index) => {
            return (
              <option key={index} value={value.name as string}>
                {value.name}
              </option>
            );
          })}
        </select>
        <p>Team</p>
        <select
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="select select-secondary w-full max-w-xs h-8"
        >
          {props.teams.map((value, index) => {
            return (
              <option key={index} value={value.name as string}>
                {value.name}
              </option>
            );
          })}
        </select>
        <p>Adno</p>
        <input
          className="input input-bordered input-secondary w-full max-w-xs"
          type="number"
          value={adno}
          onChange={(e) => setAdno(parseInt(e.target.value))}
          placeholder="adno"
        />
        <p>Class</p>
        <input
          className="input input-bordered input-secondary w-full max-w-xs"
          type="text"
          value={classs}
          onChange={(e) => setClass(e.target.value)}
          placeholder="class"
        />

        <div className="w-full  mt-4 flex items-center justify-between">
          <button
            type="submit"
            className="bg-secondary w-1/2 border-2 text-white px-3 flex-1 py-2 border-secondary rounded-xl font-bold"
          >
            { state.fetching ? "Loading..." : "Submit"}  
          </button>

          <div
            className="w-1/2 flex items-center justify-center tooltip"
            data-tip="Back"
          ></div>
        </div>
      </form>
    </div>
  );
};

export default CreateCandidate;
