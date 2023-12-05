"use client";
import { AddGradeDocument, AddGradeMutation, AddGradeMutationVariables, Grade } from "@/gql/graphql";
import React, { useState } from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  data : Grade[]
  setData : React.Dispatch<React.SetStateAction<Grade[]>>
}

const CreateGrade = (props: Props) => {
  const [name, setName] = useState<string>('');
  const [percentage, setPercentage] = useState<number>();
  const [pointGroup, setPointGroup] = useState<number>();
  const [pointHouse, setPointHouse] = useState<number>();
  const [pointSingle, setPointSingle] = useState<number>();

  const [state, CreateGradeExecute] = useMutation(AddGradeDocument);


  const HandleSubmit = async (data: any) => {
    const datas: OperationResult<AddGradeMutation,AddGradeMutationVariables> = await CreateGradeExecute({
      name: data.name,
      percentage: data.percentage,
      pointGroup: data.pointGroup,
      pointHouse: data.pointHouse,
      pointSingle : data.pointSingle
    });

    if (datas.data?.createGrade) {
      alert("Grade Added");
    props.setData([...props.data, datas.data?.createGrade as Grade]);
    } else {
      console.log(datas.error?.message);
      
      alert("Grade Not Added");
    }
  };

  return (
    <div>
      <h1>Create Grade</h1>

      <form
        onSubmit={
          (e) => {
            e.preventDefault();
            HandleSubmit({ name, percentage, pointGroup, pointHouse, pointSingle })
          }
        }
      >
        <input type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
         placeholder="name" />
        <input
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(parseInt(e.target.value))}
          placeholder="percentage"
        />
        <input
          type="number"
          value={pointGroup}
          onChange={(e) => setPointGroup(parseInt(e.target.value))}
          placeholder="pointGroup"
        />
        <input
          type="number"
          value={pointHouse}
          onChange={(e) => setPointHouse(parseInt(e.target.value))}
          placeholder="pointHouse"
        />
        <input
          type="number"
          value={pointSingle}
          onChange={(e) => setPointSingle(parseInt(e.target.value))}
          placeholder="pointSingle"
        />
        <br />
        <button
          className="bg-fuchsia-600"
          type="submit"
          disabled={state.fetching}
        >
           {state.fetching ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateGrade;
