"use client";
import Modal from "@/components/Modal";
import {
  Grade,
  DeleteGradeDocument,
  DeleteGradeMutation,
  DeleteGradeMutationVariables,
  GetOneGradeDocument,
  GetOneGradeQuery,
  GetOneGradeQueryVariables,
} from "@/gql/graphql";
import React, {  use, useEffect, useState } from "react";
import { OperationResult, useMutation, useQuery } from "urql";
import EditGrade from "./EditGrades";
import CreateGrade from "./CreateGrades";
import { DeleteIcon, EditIcon } from "@/icons/action";
import { API_KEY } from "@/lib/env";

interface Props {
  id: number;
  name: string;
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Grade[];
  setData: React.Dispatch<React.SetStateAction<Grade[]>>;
  isOpen : boolean;
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
}


const OneGrade = (props: Props) => {
  const [{ fetching, data }] = useQuery<
    GetOneGradeQuery,
    GetOneGradeQueryVariables
  >({
    query: GetOneGradeDocument,
    variables: {
      id: props.id,
      api_key : API_KEY
    },
    pause: props.isCreate || props.isEdit,
  });




  const grade  = data?.grade;

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  

  const [state, DeleteGradeExecute] = useMutation(DeleteGradeDocument);


  const HandleDelete =async ()=>{
    
    const deletedData : OperationResult<DeleteGradeMutation,DeleteGradeMutationVariables> = await DeleteGradeExecute({
      id: props.id
    });
    
    if(deletedData.data?.removeGrade?.__typename){
      const deleted = props.data.filter((value , index)=>{
        return value.id !== props.id;
      })

      props.setData(deleted)
      props.setIsOpen(false)
    }
    setModalOpen(false)
}


  return (
    <div className="w-full h-full">
      {props.isEdit ? (
                <EditGrade
                isOpen={props.isEdit}
                key={1}
                setIsEdit={props.setIsEdit}
                isEdit={props.isEdit}
                name={grade?.name as string}
                id={grade?.id as number}
                data={props.data}
                setData={props.setData}
                percentage={grade?.percentage as number}
                pointGroup={grade?.pointGroup as number}
                pointHouse={grade?.pointHouse as number}
                pointSingle={grade?.pointSingle as number}
              />
      ) : props.isCreate ? (
        <CreateGrade isOpen={props.isEdit} key={2} data={props.data} setData={props.setData} />
      ) : (
        <div className="w-full h-full">
          {fetching ? (
            <p> loading... </p>
          ) : (
            <div className="w-full h-full flex flex-col justify-between">
         
            
                
                <div className="relative top-15 flex flex-col items-center justify-center gap-4">
              

              <div  className="flex flex-col gap-1 w-full">
              <p className="text-base text-[#8D8D8D]" >Name</p>
              <span className="input input-bordered input-secondary w-full max-w-xs pt-2 text-[#3F127A] border-none">{grade?.name}</span>
              </div>
             
              <div  className="flex flex-col gap-1 w-full">
              <p className="text-base text-[#8D8D8D]" >Percentage</p>
              <span className="input input-bordered input-secondary w-full max-w-xs pt-2 text-[#3F127A] border-none ">{grade?.percentage}</span>
              </div>
              
              <div  className="flex flex-col gap-1 w-full">
              <p className="text-base text-[#8D8D8D]" >Point Group</p>
              <span className="input input-bordered input-secondary w-full max-w-xs pt-2 text-[#3F127A] border-none ">{grade?.pointGroup}</span>
              </div>
              <div  className="flex flex-col gap-1 w-full">
              <p className="text-base text-[#8D8D8D]" >Point House</p>
              <span className="input input-bordered input-secondary w-full max-w-xs pt-2 text-[#3F127A] border-none">{grade?.pointHouse}</span>
              </div>
              <div  className="flex flex-col gap-1 w-full">
              <p className="text-base text-[#8D8D8D]" >Point Single</p>
              <span className="input input-bordered input-secondary w-full max-w-xs pt-2 text-[#3F127A] border-none">{grade?.pointSingle}</span>
              </div>
            </div>
       
              <div className="w-full mt-4 flex items-center justify-between">
              <div
            className="w-1/2 flex items-center justify-center tooltip"
            data-tip="Back"
          ></div>
                <div className="w-1/2 flex items-center justify-around">
                  <button
                    className=" border-2 text-white px-3 py-2 border-secondary rounded-xl font-bold"
                    onClick={() => {
                      props.setIsEdit(true);
                      props.setIsCreate(false);
                    }}
                  >
                    <EditIcon className="w-6 h-6 cursor-pointer fill-secondary  transition-all" />
                  </button>
                  <button
                    className=" border-2 text-white px-3 py-2 border-secondary rounded-xl font-bold"
                    onClick={() => setModalOpen(true)}
                  >
                    <DeleteIcon className="w-6 h-6 cursor-pointer fill-secondary  transition-all" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} key={3}>
        <p>Are you sure Do you want to Delete ?</p>
        <button className="bg-red-600" onClick={HandleDelete}>
          Delete
        </button>
        <button className="bg-blue-500" onClick={() => setModalOpen(false)}>
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default OneGrade;
