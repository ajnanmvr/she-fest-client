import {
  AddCandidateDocument,
  AddCandidateMutation,
  AddCandidateMutationVariables,
  Candidate,
  Category,
  Team,
} from "@/gql/graphql";
import React from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  candidates: Candidate[];
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
  categories: Category[];
  teams: Team[];
}

const CreateCandidate = (props: Props) => {
  const [state, CreateCandidateExecute] = useMutation(AddCandidateDocument);
  const [name, setName] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [chestNO, setChestNO] = React.useState<string>("");
  const [team, setTeam] = React.useState<string>("");

  const HandleSubmit = async () => {
    const datas: OperationResult<
      AddCandidateMutation,
      AddCandidateMutationVariables
    > = await CreateCandidateExecute({
      name: name,
      category: category,
      chestNO: chestNO,
      team: team,
    });
    console.log(datas);

    if (datas.data?.createCandidate) {
      props.setCandidates([...props.candidates, datas.data.createCandidate]);
      props.setIsCreate(false);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit();
        }}
        className={` ${props.isCreate ? "block" : "hidden"} `}
      >
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
          {" "}
          <option value={"none"}>select catogory</option>
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
          <option value={"none"}>select team</option>
          {props.teams.map((value, index) => {
            return (
              <option key={index} value={value.name as string}>
                {value.name}
              </option>
            );
          })}
        </select>

        <div className="w-full  mt-4 flex items-center justify-between">
          <button
            type="submit"
            className="bg-secondary w-1/2 border-2 text-white px-3 flex-1 py-2 border-secondary rounded-xl font-bold"
          >
            {state.fetching ? "Loading..." : "Submit"}
          </button>

          <div
            className="w-1/2 flex items-center justify-center tooltip"
            data-tip="Back"
          ></div>
        </div>
      </form>
    </>
  );
};

export default CreateCandidate;
