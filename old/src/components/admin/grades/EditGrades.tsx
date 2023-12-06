import Alert from '@/components/Alert';
import { EditGradeDocument, EditGradeMutation, EditGradeMutationVariables, Grade } from '@/gql/graphql';
import { ChevronRight } from '@/icons/arrows';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
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
  isOpen: boolean;
}

const EditGrade = (props: Props) => {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
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
      toast.success("Grade Updated");
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
      updatedData.error?.message.split("]")[1].startsWith(" target") ? toast.error("server error") : toast.error(updatedData.error?.message.split("]")[1]);
    }
    else {
      toast.error("Grade Not Updated");
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
    <Alert isError={isError} setError={setIsError}  isSuccess={isSuccess}>
      </Alert>
  </div>
  );
}

export default EditGrade