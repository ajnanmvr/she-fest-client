import {  EditPositionDocument, EditPositionMutation, EditPositionMutationVariables, Position } from '@/gql/graphql';
import React from 'react'
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
    }

const EditPosition = (props : Props) => {
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
        alert("Position Updated");  
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
        alert(updatedData.error?.message.split(']')[1]);
      }
      else {
          alert("Position Not Updated");
        }
      setIsLoading(false);
      props.setIsEdit(false);
      } 
  
  
    return (
      <div>
        <button className="bg-green-500" onClick={() => props.setIsEdit(false)}>
          Back
        </button>
        <h1>Edit Position</h1>
  
        <form
          onSubmit={(e)=> {
            e.preventDefault();
            HandleSubmit({
              name,
              pointGroup,
              pointHouse,
              pointSingle,
              value 
            })
          }}
        >
          <p>Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Point Group</p>
          <input
            type="number"
            value={pointGroup}
            onChange={(e) => setPointGroup(parseInt(e.target.value))}
          />
          <p>Point House</p>
          <input
            type="number"
            value={pointHouse}
            onChange={(e) => setPointHouse(parseInt(e.target.value))}
          />
          <p>Point Single</p>
          <input
            type="number"
            value={pointSingle}
            onChange={(e) => setPointSingle(parseInt(e.target.value))}
          />
          <p>Value</p>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value))}
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

export default EditPosition