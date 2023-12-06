"use client";
import Alert from "@/components/Alert";
import { AddGradeDocument, AddGradeMutation, AddGradeMutationVariables, Grade } from "@/gql/graphql";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { OperationResult, useMutation } from "urql";

interface Props {
  data: Grade[]
  setData: React.Dispatch<React.SetStateAction<Grade[]>>
  isOpen: boolean;
}

const CreateGrade = (props: Props) => {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [percentage, setPercentage] = useState<number>();
  const [pointGroup, setPointGroup] = useState<number>();
  const [pointHouse, setPointHouse] = useState<number>();
  const [pointSingle, setPointSingle] = useState<number>();

  const [state, CreateGradeExecute] = useMutation(AddGradeDocument);


  const HandleSubmit = async (data: any) => {
    const datas: OperationResult<AddGradeMutation, AddGradeMutationVariables> = await CreateGradeExecute({
      name: data.name,
      percentage: data.percentage,
      pointGroup: data.pointGroup,
      pointHouse: data.pointHouse,
      pointSingle: data.pointSingle
    });

    if (datas.data?.createGrade) {
      toast.success("Grade Added");
      props.setData([...props.data, datas.data?.createGrade as Grade]);
    } else {
      console.log(datas.error?.message);

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
            HandleSubmit({ name, percentage, pointGroup, pointHouse, pointSingle })
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

          <p>Percentage</p>
          <input
             className="input input-bordered input-secondary w-full max-w-xs mt-1"
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(parseInt(e.target.value))}
            placeholder="percentage"
          />
          <p>Point</p>
          <input
             className="input input-bordered input-secondary w-full max-w-xs mt-1"
            type="number"
            value={pointGroup}
            onChange={(e) => setPointGroup(parseInt(e.target.value))}
            placeholder="pointGroup"
          />
          <p>pointHouse</p>
          <input
             className="input input-bordered input-secondary w-full max-w-xs mt-1"
            type="number"
            value={pointHouse}
            onChange={(e) => setPointHouse(parseInt(e.target.value))}
            placeholder="pointHouse"
          />
          <p>pointSingle</p>
          
          <input
             className="input input-bordered input-secondary w-full max-w-xs mt-1"
            type="number"
            value={pointSingle}
            onChange={(e) => setPointSingle(parseInt(e.target.value))}
            placeholder="pointSingle"
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
      <Alert isError={isError} setError={setIsError}  isSuccess={isSuccess}>
        </Alert>
    </div>
  );
};

export default CreateGrade;
