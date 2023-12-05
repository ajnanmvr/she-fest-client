import {  EditSkillDocument, EditSkillMutation, EditSkillMutationVariables, Skill } from '@/gql/graphql';
import React from 'react'
import { OperationResult, useMutation } from 'urql';

interface Props {
    name: string;
    id: number;
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    data : Skill[]
    setData : React.Dispatch<React.SetStateAction<Skill[]>>
    descriotion : string
    shortName : string
    }

const EditSkill = (props : Props) => {
    const [name, setName] = React.useState<string>(props.name); 
     const [shortName, setShortName] = React.useState<string>(props.shortName);
    const [description, setDescription] = React.useState<string>(props.descriotion);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
  
    const [state, UpdateSkillExecute] = useMutation(EditSkillDocument);
  
  
    const HandleSubmit = async (data: any) => {
      setIsLoading(true);
      const updatedData : OperationResult<EditSkillMutation,EditSkillMutationVariables> = await UpdateSkillExecute({
        id: props.id,
        name: data.name,
        description: data.description,
        shortName: data.shortName
      });
  
      if (updatedData.data?.updateSkill) {
        alert("Skill Updated");  
        const updatedDates = props.data.map((value , index)=>{
          if(value.id == updatedData.data?.updateSkill?.id){
          return  value = updatedData.data?.updateSkill as Skill
          }else{
            return value
          }
        })
  console.log(updatedDates);
  
      props.setData(updatedDates as Skill[]);
      } else if(updatedData.error?.message) {
        alert(updatedData.error?.message.split(']')[1]);
      }
      else {
          alert("Skill Not Updated");
        }
      setIsLoading(false);
      props.setIsEdit(false);
      } 
  
  
    return (
      <div>
        <button className="bg-green-500" onClick={() => props.setIsEdit(false)}>
          Back
        </button>
        <h1>Edit Skill</h1>
  
        <form
          onSubmit={(e)=> {
            e.preventDefault();
            HandleSubmit({name , description , shortName})
          }}
        >
          <p>Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>ShortName</p>
          <input
            type="text"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
          />
          <p>Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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

export default EditSkill