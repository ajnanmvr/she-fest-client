"use client";
import Alert from "@/components/Alert";
import { AddProgrammeDocument, AddProgrammeMutation, AddProgrammeMutationVariables, Category, Mode, Model, Programme, Skill, Type } from "@/gql/graphql";
import React from "react";
import { toast } from "react-toastify";
import { OperationResult, useMutation } from "urql";

interface Props {
  data: Programme[]
  setData: React.Dispatch<React.SetStateAction<Programme[]>>
  categories: Category[];
  skills: Skill[];
}

const CreateProgramme = (props: Props) => {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>('');
  const [candidateCount, setCandidateCount] = React.useState<number>();
  const [category, setCategory] = React.useState<string>('');
  const [conceptNote, setConceptNote] = React.useState<string>('');
  const [duration, setDuration] = React.useState<number>();
  const [groupCount, setGroupCount] = React.useState<number>();
  const [mode, setMode] = React.useState<Mode>(Mode.NonStage);
  const [model, setModel] = React.useState<Model>(Model.Arts);
  const [programCode, setProgramCode] = React.useState<string>('');
  const [skill, setSkill] = React.useState<string>('')
  const [type, setType] = React.useState<Type>(Type.Single)
  const [state, CreateProgrammeExecute] = useMutation(AddProgrammeDocument);


  const HandleSubmit = async (data: any) => {
    const datas: OperationResult<AddProgrammeMutation, AddProgrammeMutationVariables> = await CreateProgrammeExecute({
      name: data.name,
      candidateCount: data.candidateCount,
      category: data.category,
      conceptNote: data.conceptNote,
      duration: data.duration,
      groupCount: data.groupCount,
      mode: data.mode,
      model: data.model,
      programCode: data.programCode,
      skill: data.skill,
      type: data.type
    });

    console.log(datas);


    if (datas.data?.createProgramme) {
      toast.success("Programme Added");
      props.setData([...props.data, datas.data?.createProgramme as Programme]);
    } else {
      datas.error?.message.split("]")[1].startsWith(" target") ? toast.error("server error") : toast.error(datas.error?.message.split("]")[1]);
    }
  };

  return (
    
    <div className="h-full w-full">
      <form
        className="h-full w-full flex flex-col items-center justify-between "
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit({ name, candidateCount, category, conceptNote, duration, groupCount, mode, model, programCode, skill, type });
        }}
      >
        <div className="mt-4 ">
          <p>Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
          />
          <p>candidateCount</p>
          <input type="number"
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
            value={candidateCount}
            onChange={(e) => setCandidateCount(parseInt(e.target.value))}
            placeholder="candidateCount" />
          <p>category</p>
          <select name="" id=""
            className="select select-secondary w-full max-w-xs h-8"

            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {props.categories.map((value, index) => {
              return <option value={value.name as string}>{value.name}</option>
            })}
          </select>
              <p>conceptNote</p>
          <textarea 
            className="input input-bordered input-secondary w-full max-w-xs mt-1 min-h-[8rem]"
            value={conceptNote}
            onChange={(e) => setConceptNote(e.target.value)}
            placeholder="conceptNote" />
          <p>duration</p>
          <input type="number"
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            placeholder="duration" />
          <p>groupCount</p>
          <input type="number"
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
            value={groupCount}
            onChange={(e) => setGroupCount(parseInt(e.target.value))}
            placeholder="groupCount" />
          <p>mode</p>
          <select name="" id=""
            className="select select-secondary w-full max-w-xs h-8"

            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
          >
            <option value={Mode.NonStage}>Non Stage</option>
            <option value={Mode.Stage}>Stage</option>
            <option value={Mode.OutdoorStage}>Outdoor Stage</option>
          </select>
          <p>model</p>
          <select name="" id=""
          className="select select-secondary w-full max-w-xs h-8"
            value={model}
            onChange={(e) => setModel(e.target.value as Model)}
          >
            <option value={Model.Arts}>Arts</option>
            <option value={Model.Sports}>Sports</option>
          </select>
          <p>programCode</p>
          <input type="text"
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
            value={programCode}
            onChange={(e) => setProgramCode(e.target.value)}
            placeholder="programCode" />
          <p>skill</p>
          <select name="" id=""
          className="select select-secondary w-full max-w-xs h-8"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          >
            {props.skills.map((value, index) => {
              return <option value={value.name as string}>{value.name}</option>
            }
            )}
          </select>
          <p>type</p>
          <select name="" id=""
          className="select select-secondary w-full max-w-xs h-8"
            value={Type.Single}
            onChange={(e) => setType(e.target.value as Type)}
          >
            <option value={Type.Group}>Group</option>
            <option value={Type.House}>House</option>
            <option value={Type.Single}>Single</option>
          </select>
        </div>
        <div className="w-full mt-4 flex items-center justify-between">
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
      <Alert isError={isError} setError={setIsError} isSuccess={isSuccess}>

      </Alert>

    </div>

  );
};

export default CreateProgramme;
