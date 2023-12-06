import {  EditTagDocument, EditTagMutation, EditTagMutationVariables, Tag } from '@/gql/graphql';
import { ChevronRight } from '@/icons/arrows';
import React from 'react'
import { toast } from 'react-toastify';
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
        toast.success("Tag Updated");
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
        updatedData.error?.message.split("]")[1].startsWith(" target") ? toast.error("server error") : toast.error(updatedData.error?.message.split("]")[1]);      }
      else {
          toast.error("Tag Not Updated");
        }
      setIsLoading(false);
      props.setIsEdit(false);
      } 
  
  
    return (
      <div className='w-full h-full flex justify-between'>
        
  
      <form
      className='w-full h-full flex justify-between flex-col'
        onSubmit={(e)=> {
          e.preventDefault();
          HandleSubmit({name})
        }}
      >
        <div>

        <input
        className='input input-bordered input-secondary w-full max-w-xs'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </div>
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
}

export default EditTag