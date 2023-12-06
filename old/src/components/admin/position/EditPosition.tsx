import Alert from '@/components/Alert';
import {  EditPositionDocument, EditPositionMutation, EditPositionMutationVariables, Position } from '@/gql/graphql';
import { ChevronRight } from '@/icons/arrows';
import React from 'react'
import { toast } from 'react-toastify';
import { OperationResult, useMutation } from 'urql';

interface Props {
    name: string;
    id: number;
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    data : Position[]
    setData : React.Dispatch<React.SetStateAction<Position[]>>
    pointGroup: number;
    pointHouse: number;
    pointSingle: number;
    value: number;
    isOpen: boolean;
    }

const EditPosition = (props : Props) => {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>(props.name);
    const [pointGroup, setPointGroup] = React.useState<number>(props.pointGroup as number);
    const [pointHouse, setPointHouse] = React.useState<number>(props.pointHouse as number);
    const [pointSingle, setPointSingle] = React.useState<number>(props.pointSingle as number);
    const [value, setValue] = React.useState<number>(props.value as number);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
  
    const [state, UpdatePositionExecute] = useMutation(EditPositionDocument);
  
  
    const HandleSubmit = async (data: any) => {
      setIsLoading(true);
      const updatedData : OperationResult<EditPositionMutation,EditPositionMutationVariables> = await UpdatePositionExecute({
        id: props.id,
        name: data.name,
        pointGroup: data.pointGroup,
        pointHouse: data.pointHouse,
        pointSingle: data.pointSingle,
        value: data.value
      });
  
      if (updatedData.data?.updatePosition) {
        toast.success("Position Updated");
        const updatedDates = props.data.map((value , index)=>{
          if(value.id == updatedData.data?.updatePosition?.id){
          return  value = updatedData.data?.updatePosition as Position
          }else{
            return value
          }
        })
  console.log(updatedDates);
  
      props.setData(updatedDates as Position[]);
      } else if(updatedData.error?.message) {
        updatedData.error?.message.split("]")[1].startsWith(" target") ? toast.error("server error") : toast.error(updatedData.error?.message.split("]")[1]);
      }
      else {
          toast.error("Something went wrong");
        }
      setIsLoading(false);
      props.setIsEdit(false);
      } 
  
  
    return (
      <div className='w-full h-full flex justify-between'>
        
  
        <form
        className='w-full h-full flex justify-between flex-col'
        onSubmit={
          (e) => {
            e.preventDefault();
            HandleSubmit({ name, pointGroup, pointHouse, pointSingle, value })
          }
        }
      >
        <div className="mt-4">
          <p>Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
          />
        <p>Point Group</p>
          <input
            type="number"
            value={pointGroup}
            placeholder="pointGroup"
            onChange={(e) => setPointGroup(parseInt(e.target.value))}
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
  
          />
          <p>Point House</p>
          <input
            type="number"
            placeholder="pointHouse"
            value={pointHouse}
            onChange={(e) => setPointHouse(parseInt(e.target.value))}
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
  
          />
          <p>Point Single</p>
          <input
            type="number"
            value={pointSingle}
            placeholder="pointSingle"
            onChange={(e) => setPointSingle(parseInt(e.target.value))}
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
  
          />
          <p>Value</p>
          <input
            type="number"
            placeholder="value"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value))}
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
  
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
        <Alert  isError={isError} setError={setIsError}  isSuccess={isSuccess}>
          </Alert>
      </div>
    );
}

export default EditPosition