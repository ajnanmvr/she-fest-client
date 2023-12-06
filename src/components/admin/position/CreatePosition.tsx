"use client";
import Alert from "@/components/Alert";
import { AddPositionDocument, AddPositionMutation, AddPositionMutationVariables, Position } from "@/gql/graphql";
import React from "react";
import { toast } from "react-toastify";
import { start } from "repl";
import { OperationResult, useMutation } from "urql";

interface Props {
  data: Position[]
  setData: React.Dispatch<React.SetStateAction<Position[]>>
  isOpen: boolean;
}

const CreatePosition = (props: Props) => {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
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
      toast.success("Position Added");
      props.setData([...props.data, datas.data?.createPosition as Position]);
    } else {
      datas.error?.message.split("]")[1].startsWith(" target") ? toast.error("server error") : toast.error(datas.error?.message.split("]")[1]);

    }
  };

  return (
    <div className="h-full w-full">
      <form
        className="h-full w-full flex flex-col items-center justify-between "
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

export default CreatePosition;
