import { EditGradeDocument, EditGradeMutation, EditGradeMutationVariables, Grade } from '@/gql/graphql';
import React, { useState } from 'react'
import { OperationResult, useMutation } from 'urql';

interface Props {
  name: string;
  id: number;
  percentage: number;
  pointGroup: number;
  pointHouse: number;
  pointSingle: number;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Grade[]
  setData: React.Dispatch<React.SetStateAction<Grade[]>>
}

const EditGrade = (props: Props) => {
   const [name, setName] = useState<string>(props.name);
  const [percentage, setPercentage] = useState<number>(props.percentage as number);
  const [pointGroup, setPointGroup] = useState<number>(props.pointGroup as number);
  const [pointHouse, setPointHouse] = useState<number>(props.pointHouse as number);
  const [pointSingle, setPointSingle] = useState<number>(props.pointSingle as number);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [state, UpdateGradeExecute] = useMutation(EditGradeDocument);


  const HandleSubmit = async (data: any) => {
    setIsLoading(true);
    console.log(data);

    const updatedData: OperationResult<EditGradeMutation, EditGradeMutationVariables> = await UpdateGradeExecute({
      id: props.id,
      name,
      percentage,
      pointGroup,
      pointHouse,
      pointSingle
    });

    if (updatedData.data?.updateGrade) {
      alert("Grade Updated");
      const updatedDates = props.data.map((value, index) => {
        if (value.id == updatedData.data?.updateGrade?.id) {
          return value = updatedData.data?.updateGrade as Grade
        } else {
          return value
        }
      })
      console.log(updatedDates);

      props.setData(updatedDates as Grade[]);
    } else if (updatedData.error?.message) {
      alert(updatedData.error?.message.split(']')[1]);
    }
    else {
      alert("Grade Not Updated");
    }
    setIsLoading(false);
    props.setIsEdit(false);
  }


  return (
    <div>
      <button className="bg-green-500" onClick={() => props.setIsEdit(false)}>
        Back
      </button>
      <h1>Edit Grade</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit({
            name,  
            percentage,
            pointGroup,
            pointHouse,
            pointSingle

          })
        }}
      >
        <p>Name</p>
        <input
          type="text"
          defaultValue={name}
          onChange={(e) => setName(e.target.value) }
        />
        <p>Percentage</p>
        <input
          type="number"
          defaultValue={percentage}
          onChange={(e) => setPercentage(parseInt(e.target.value))}
        />
        <p>PointGroup</p>
        <input
          type="number"
          defaultValue={pointGroup}
          onChange={(e) => setPointGroup(parseInt(e.target.value))}
        />
        <p>PointHouse</p>
        <input
          type="number"
          defaultValue={pointHouse}
          onChange={(e) => setPointHouse(parseInt(e.target.value))}
        />
        <p>PointSingle</p>
        <input
          type="number"
          defaultValue={pointSingle}
          onChange={(e) => setPointSingle(parseInt(e.target.value))}
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

export default EditGrade