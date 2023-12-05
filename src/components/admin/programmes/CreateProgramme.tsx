"use client";
import { AddProgrammeDocument, AddProgrammeMutation, AddProgrammeMutationVariables, Category, Mode, Model, Programme, Skill, Type } from "@/gql/graphql";
import React from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  data: Programme[]
  setData: React.Dispatch<React.SetStateAction<Programme[]>>
  categories : Category[];
  skills : Skill[];
}

const CreateProgramme = (props: Props) => {
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
      alert("Programme Added");
      props.setData([...props.data, datas.data?.createProgramme as Programme]);
    } else {
      alert("Programme Not Added");
    }
  };

  return (
    <div>
      <h1>Create Programme</h1>

      <form
        onSubmit={
          (e) => {
            e.preventDefault();
            HandleSubmit({ name , candidateCount , category , conceptNote , duration , groupCount , mode , model , programCode , skill , type })
          }
        }
      >
        <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name" />
        <input type="number"
          value={candidateCount}
          onChange={(e) => setCandidateCount(parseInt(e.target.value))}
          placeholder="candidateCount" />
        <select name="" id=""
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {props.categories.map((value , index)=>{
            return <option value={value.name as string}>{value.name}</option>
          })}
        </select>

        <input type="text"
          value={conceptNote}
          onChange={(e) => setConceptNote(e.target.value)}
          placeholder="conceptNote" />
        <input type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          placeholder="duration" />
        <input type="number"
          value={groupCount}
          onChange={(e) => setGroupCount(parseInt(e.target.value))}
          placeholder="groupCount" />
        <select name="" id="" 
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
        >
          <option value={Mode.NonStage}>Non Stage</option>
          <option value={Mode.Stage}>Stage</option>
          <option value={Mode.OutdoorStage}>Outdoor Stage</option>
        </select>
        <select name="" id=""
          value={model}
          onChange={(e) => setModel(e.target.value as Model)}
        >
          <option value={Model.Arts}>Arts</option>
          <option value={Model.Sports}>Sports</option>
        </select>

        <input type="text"  
          value={programCode}
          onChange={(e) => setProgramCode(e.target.value)}
          placeholder="programCode" />

          <select name="" id="" 
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          >
            {props.skills.map((value , index)=>{
              return <option value={value.name as string}>{value.name}</option>
            }
            )}
          </select>

        <select name="" id=""
          value={Type.Single}
          onChange={(e) => setType(e.target.value as Type)}
        >
          <option value={Type.Group}>Group</option>
          <option value={Type.House}>House</option>
          <option value={Type.Single}>Single</option>
        </select>

        <button
          className="bg-fuchsia-600"
          type="submit"
          disabled={state.fetching}
        >
          {state.fetching ? "Loading" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateProgramme;
