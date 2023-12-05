import {
  EditCandidateDocument,
  EditCandidateMutation,
  EditCandidateMutationVariables,
  Candidate,
  Category,
  Team,
} from "@/gql/graphql";
import { EditBoxIcon, EditIcon } from "@/icons/action";
import { ChevronRight } from "@/icons/arrows";
import React from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Candidate[];
  setData: React.Dispatch<React.SetStateAction<Candidate[]>>;
  selectedCandidate: Candidate;
  categories: Category[];
  teams: Team[];
}

const EditCandidate = (props: Props) => {
  const [name, setName] = React.useState<string>(
    props.selectedCandidate.name as string
  );
  const [category, setCategory] = React.useState<string>(
    props.selectedCandidate?.category?.name as string
  );
  const [team, setTeam] = React.useState<string>(
    props.selectedCandidate.team?.name as string
  );
  const [adno, setAdno] = React.useState<number>(
    props.selectedCandidate.adno as number
  );
  const [classs, setClass] = React.useState<string>(
    props.selectedCandidate.class as string
  );
  const [chestNO , setChestNO ] =  React.useState<string>(
    props.selectedCandidate.chestNO as string
  );
  const [image, setImage] = React.useState<File>();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [state, UpdateCandidateExecute] = useMutation(EditCandidateDocument);

  const HandleSubmit = async (data: any) => {
    console.log(data);

    setIsLoading(true);
    const updatedData: OperationResult<
      EditCandidateMutation,
      EditCandidateMutationVariables
    > = await UpdateCandidateExecute({
      id: props.selectedCandidate.id as number,
      name: data.name,
      category: data.category,
      adno: data.adno,
      chestNO: data.chestNO,
      class: data.class,
      team: data.team,
    });

    console.log(updatedData);

    if (updatedData.data?.updateCandidate) {
      alert("Candidate Updated");
      const updatedDates = props.data.map((value, index) => {
        if (value.id == updatedData.data?.updateCandidate?.id) {
          return (value = updatedData.data?.updateCandidate as Candidate);
        } else {
          return value;
        }
      });
      console.log(updatedDates);

      props.setData(updatedDates as Candidate[]);
    } else if (updatedData.error?.message) {
      alert(updatedData.error?.message.split("]")[1]);
    } else {
      alert("Candidate Not Updated");
    }
    setIsLoading(false);
    props.setIsEdit(false);
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
    <div className="">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit({ name, category, team, adno, classs , chestNO });
        }}
      >
        <div className="flex w-full justify-center">
          <div
            className="h-36 w-36 rounded-full border-8 border-secondary relative"
            style={{
              backgroundImage: `url(${
                image
                  ? URL.createObjectURL(image)
                  : `https://drive.google.com/uc?id=${
                      props.selectedCandidate?.imageId
                        ? props.selectedCandidate?.imageId
                        : "1469PGeDEgnK5caEumLfGGUufCI0MY133"
                    } `
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-secondary space-x-2 absolute bottom-0 right-0 w-8 h-8  text-white flex items-center justify-center rounded-full"
            >
              <EditIcon className="w-4 h-4 fill-white" />
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden "
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
            {isLoading ? "Loading..." : "Submit"}
          </button>

          <div
            className="w-1/2 flex items-center justify-center tooltip"
            data-tip="Back"
          >
            <ChevronRight
              className="w-7 h-7 cursor-pointer fill-secondary  transition-all  "
              SetOpen={props.setIsEdit}
              open={props.isEdit}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCandidate;
