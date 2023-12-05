import {  Category, EditProgrammeDocument, EditProgrammeMutation, EditProgrammeMutationVariables, Mode, Model, Programme, Skill, Type } from '@/gql/graphql';
import React from 'react'
import { OperationResult, useMutation } from 'urql';

interface Props {
    name: string;
    id: number;
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    data : Programme[];
    setData : React.Dispatch<React.SetStateAction<Programme[]>>
    selectedProgramme : Programme;
    skill: string;
    category : string;
    programeCode : string;
    candiateCount : number;
    groupCount : number;
    duration : number;
    conceptNote : string;
    mode : Mode;
    model : Model;
    type : string;
    categories : Category[];
    skills : Skill[];
    }

const EditResult = (props : Props) => {
    const [name, setName] = React.useState<string>(props.name); 
    const [category, setCategory] = React.useState<string>(props.category);
    const [skill, setSkill] = React.useState<string>(props.skill);
    const [mode, setMode] = React.useState<Mode>(props.mode);
    const [model, setModel] = React.useState<Model>(props.model);
    const [programCode, setProgramCode] = React.useState<string>(props.programeCode);
    const [candidateCount, setCandidateCount] = React.useState<number>(props.candiateCount);
    const [groupCount, setGroupCount] = React.useState<number>(props.groupCount);
    const [duration, setDuration] = React.useState<number>(props.duration);
    const [conceptNote, setConceptNote] = React.useState<string>(props.conceptNote);
    const [type, setType] = React.useState<string>(props.type);

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
  
    const [state, UpdateProgrammeExecute] = useMutation(EditProgrammeDocument);
  
  
    const HandleSubmit = async (data: any) => {
      console.log(data);
      
      setIsLoading(true);
      const updatedData : OperationResult<EditProgrammeMutation,EditProgrammeMutationVariables> = await UpdateProgrammeExecute({
        id: props.id,
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

      console.log(updatedData);
  
      if (updatedData.data?.updateProgramme) {
        alert("Programme Updated");  
        const updatedDates = props.data.map((value , index)=>{
          if(value.id == updatedData.data?.updateProgramme?.id){
          return  value = updatedData.data?.updateProgramme as Programme
          }else{
            return value
          }
        })
  console.log(updatedDates);
  
      props.setData(updatedDates as Programme[]);
      } else if(updatedData.error?.message) {
        alert(updatedData.error?.message.split(']')[1]);
      }
      else {
          alert("Programme Not Updated");
        }
      setIsLoading(false);
      props.setIsEdit(false);
      } 
  
  
    return (
      <div>
        <button className="bg-green-500" onClick={() => props.setIsEdit(false)}>
          Back
        </button>
        <h1>Edit Programme</h1>
  
        <form
          onSubmit={(e)=> {
            e.preventDefault();
            HandleSubmit({ name , candidateCount , category , conceptNote , duration , groupCount , mode , model , programCode , skill , type})
          }}
        >
          <p>Name</p>
            <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name" />
        <p>candidateCount</p>
        <input type="number"
          value={candidateCount}
          onChange={(e) => setCandidateCount(parseInt(e.target.value))}
          placeholder="candidateCount" />
        <p>category</p>
        
        <select name="" id=""
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {props.categories.map((value , index)=>{
            return <option value={value.name as string}>{value.name}</option>
          }
          )}
        </select>

        <p>conceptNote</p>
        <input type="text"
          value={conceptNote}
          onChange={(e) => setConceptNote(e.target.value)}
          placeholder="conceptNote" />
        <p>duration</p>
        <input type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          placeholder="duration" />
        <p>groupCount</p>
        <input type="number"
          value={groupCount}
          onChange={(e) => setGroupCount(parseInt(e.target.value))}
          placeholder="groupCount" />
        <p>mode</p>
        <select name="" id="" 
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
        >
          <option value={Mode.NonStage}>Non Stage</option>
          <option value={Mode.Stage}>Stage</option>
          <option value={Mode.OutdoorStage}>Outdoor Stage</option>
        </select>
        <p>Model</p>
        <select name="" id=""
          value={model}
          onChange={(e) => setModel(e.target.value as Model)}
        >
          <option value={Model.Arts}>Arts</option>
          <option value={Model.Sports}>Sports</option>
        </select>
          <p>Program code</p>
        <input type="text"  
          value={programCode}
          onChange={(e) => setProgramCode(e.target.value)}
          placeholder="programCode" />
        <p>skill</p>
        <select name="" id=""
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        >
          {props.skills.map((value , index)=>{
            return <option value={value.name as string}>{value.name}</option>
          }
          )}
        </select>
        
          <p>Type</p>
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
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
       
      </div>
    );
}

export default EditResult