"use client";
import { AddPositionDocument, AddPositionMutation, AddPositionMutationVariables, Position } from "@/gql/graphql";
import React from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  data: Position[]
  setData: React.Dispatch<React.SetStateAction<Position[]>>
}

const CreatePosition = (props: Props) => {

  const [name, setName] = React.useState<string>('');
  const [pointGroup, setPointGroup] = React.useState<number>();
  const [pointHouse, setPointHouse] = React.useState<number>();
  const [pointSingle, setPointSingle] = React.useState<number>();
  const [value, setValue] = React.useState<number>();

  const [state, CreatePositionExecute] = useMutation(AddPositionDocument);



  const HandleSubmit = async (data: any) => {
    const datas: OperationResult<AddPositionMutation, AddPositionMutationVariables> = await CreatePositionExecute({
      name: data.name,
      pointGroup: data.pointGroup,
      pointHouse: data.pointHouse,
      pointSingle: data.pointSingle,
      value: data.value
    });

    if (datas.data?.createPosition) {
      alert("Position Added");
      props.setData([...props.data, datas.data?.createPosition as Position]);
    } else {
      console.log(datas.error?.message.split(']')[1]);

      alert("Position Not Added");
    }
  };

  return (
    <div>
      <h1>Create Position</h1>

      <form
        onSubmit={
          (e) => {
            e.preventDefault();
            HandleSubmit({ name, pointGroup, pointHouse, pointSingle, value })
          }
        }
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
          disabled={state.fetching}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePosition;
