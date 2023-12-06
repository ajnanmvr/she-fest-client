"use client";
import Modal from "@/components/Modal";
import {
  Position,
  DeletePositionDocument,
  DeletePositionMutation,
  DeletePositionMutationVariables,
  GetOnePositionDocument,
  GetOnePositionQuery,
  GetOnePositionQueryVariables,
} from "@/gql/graphql";
import { useState } from "react";
import { OperationResult, useMutation, useQuery } from "urql";
import EditPosition from "./EditPosition";
import CreatePosition from "./CreatePosition";
import { DeleteIcon, EditIcon } from "@/icons/action";
import { API_KEY } from "@/lib/env";

interface Props {
  id: number;
  name: string;
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Position[];
  setData: React.Dispatch<React.SetStateAction<Position[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OnePosition = (props: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [{ fetching, data }] = useQuery<
    GetOnePositionQuery,
    GetOnePositionQueryVariables
  >({
    query: GetOnePositionDocument,
    variables: {
      id: props.id,
      api_key : API_KEY
    },

    pause: props.isCreate || props.isEdit,
  });


  const [state, DeletePositionExecute] = useMutation(DeletePositionDocument);


  const HandleDelete = async () => {

    const deletedData: OperationResult<DeletePositionMutation, DeletePositionMutationVariables> = await DeletePositionExecute({
      id: props.id
    });

    if (deletedData.data?.removePosition?.__typename) {
      const deleted = props.data.filter((value, index) => {
        return value.id !== props.id;
      })

      props.setData(deleted)
      props.setIsOpen(false)
    }
    setModalOpen(false)
  }

  const Position = data?.position;

  return (
    <div className="w-full h-full">
      {props.isEdit ? (
        <EditPosition
        isOpen={props.isEdit}
          pointGroup={Position?.pointGroup as number}
          pointHouse={Position?.pointHouse as number}
          pointSingle={Position?.pointSingle as number}
          value={Position?.value as number}
          key={1}
          setIsEdit={props.setIsEdit}
          isEdit={props.isEdit}
          name={Position?.name as string}
          id={Position?.id as number}
          data={props.data}
          setData={props.setData}
        />
      ) : props.isCreate ? (
        <CreatePosition isOpen={props.isEdit} key={2} data={props.data} setData={props.setData} />
      ) : (
        <div className="w-full h-full">
          {fetching ? (
            <p> loading... </p>
          ) : (
            <div className="w-full h-full flex flex-col justify-between">

              {/* <p className="font-bold text-2xl leading-7 mt-2 text-center"><span className="font-normal">Name:</span>{Position?.name}</p>
              <p className="font-bold text-2xl leading-7 mt-2 text-center"><span className="font-normal">Value:</span>{Position?.value}</p>
              <p className="font-bold text-2xl leading-7 mt-2 text-center"><span className="font-normal">Point Group:</span>{Position?.pointGroup}</p>
              <p className="font-bold text-2xl leading-7 mt-2 text-center"><span className="font-normal">Point House:</span>{Position?.pointHouse}</p>
              <p className="font-bold text-2xl leading-7 mt-2 text-center"><span className="font-normal">Point Single:</span>{Position?.pointSingle}</p> */}


              <div className="relative top-15 flex flex-col items-center justify-center gap-4">


                <div className="flex flex-col gap-1 w-full">
                  <p className="text-base text-[#8D8D8D]" >Name</p>
                  <span className="input input-bordered input-secondary w-full max-w-xs pt-2 text-[#3F127A] border-none">{Position?.name}</span>
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <p className="text-base text-[#8D8D8D]" >Value</p>
                  <span className="input input-bordered input-secondary w-full max-w-xs pt-2 text-[#3F127A] border-none">{Position?.value}</span>
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <p className="text-base text-[#8D8D8D]" >Point Group</p>
                  <span className="input input-bordered input-secondary w-full max-w-xs pt-2 text-[#3F127A] border-none">{Position?.pointGroup}</span>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-base text-[#8D8D8D]" >Point House</p>
                  <span className="input input-bordered input-secondary w-full max-w-xs pt-2 text-[#3F127A] border-none">{Position?.pointHouse}</span>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-base text-[#8D8D8D]" >Point Single</p>
                  <span className="input input-bordered input-secondary w-full max-w-xs pt-2 text-[#3F127A] border-none ">{Position?.pointSingle}</span>
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

export default OnePosition;
