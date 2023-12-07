import { Candidate, Category, EditCandidateDocument, EditCandidateMutation, EditCandidateMutationVariables, Team } from '@/gql/graphql';
import React from 'react'
import { OperationResult, useMutation } from 'urql';
interface Props {
  isUpdate : boolean
  setIsUpdate : React.Dispatch<React.SetStateAction<boolean>>;
  candidates : Candidate[];
  setCandidates : React.Dispatch<React.SetStateAction<Candidate[]>>;
  selected : Candidate | null;
  categories: Category[];
  teams: Team[];
}
const UpdateCandidate = (props:Props) => {
  const [state, UpdateCandidateExecute] = useMutation(EditCandidateDocument);
  const [name, setName] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [chestNO, setChestNO] = React.useState<string>("");
  const [team, setTeam] = React.useState<string>("");

  const HandleSubmit = async () => {
    const datas: OperationResult<
      EditCandidateMutation,
      EditCandidateMutationVariables
    > = await UpdateCandidateExecute({
      id: props.selected?.id as number,
      name: name,
      category: category,
      chestNO: chestNO,
      team: team,
    });
    console.log(datas);

    if (datas.data?.updateCandidate) {
      props.setCandidates([...props.candidates, datas.data.updateCandidate]);
      props.setIsUpdate(false);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit();
        }}
        className={
          ` ${props.isUpdate ? "block" : "hidden"} ` 
        }
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
}

export default UpdateCandidate