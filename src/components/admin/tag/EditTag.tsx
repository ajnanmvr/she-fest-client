import {  EditTagDocument, EditTagMutation, EditTagMutationVariables, Tag } from '@/gql/graphql';
import React from 'react'
import { OperationResult, useMutation } from 'urql';

interface Props {
    name: string;
    id: number;
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    data : Tag[]
    setData : React.Dispatch<React.SetStateAction<Tag[]>>
    }

const EditTag = (props : Props) => {
    const [name, setName] = React.useState<string>(props.name); 
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
  
    const [state, UpdateTagExecute] = useMutation(EditTagDocument);
  
  
    const HandleSubmit = async (data: any) => {
      setIsLoading(true);
      const updatedData : OperationResult<EditTagMutation,EditTagMutationVariables> = await UpdateTagExecute({
        id: props.id,
        name: data.name,
      });
  
      if (updatedData.data?.updateTag) {
        alert("Tag Updated");  
        const updatedDates = props.data.map((value , index)=>{
          if(value.id == updatedData.data?.updateTag?.id){
          return  value = updatedData.data?.updateTag as Tag
          }else{
            return value
          }
        })
  console.log(updatedDates);
  
      props.setData(updatedDates as Tag[]);
      } else if(updatedData.error?.message) {
        alert(updatedData.error?.message.split(']')[1]);
      }
      else {
          alert("Tag Not Updated");
        }
      setIsLoading(false);
      props.setIsEdit(false);
      } 
  
  
    return (
      <div>
        <button className="bg-green-500" onClick={() => props.setIsEdit(false)}>
          Back
        </button>
        <h1>Edit Tag</h1>
  
        <form
          onSubmit={(e)=> {
            e.preventDefault();
            HandleSubmit({name})
          }}
        >
          <p>Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

export default EditTag