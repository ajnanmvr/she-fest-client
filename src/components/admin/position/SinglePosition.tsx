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
import {  useState } from "react";
import { OperationResult, useMutation, useQuery } from "urql";
import EditPosition from "./EditPosition";
import CreatePosition from "./CreatePosition";

interface Props {
  id: number;
  name: string;
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Position[];
  setData: React.Dispatch<React.SetStateAction<Position[]>>;
  isOpen : boolean;
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
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
    },

    pause: props.isCreate || props.isEdit,
  });
  

  const [state, DeletePositionExecute] = useMutation(DeletePositionDocument);


  const HandleDelete =async ()=>{
    
    const deletedData : OperationResult<DeletePositionMutation,DeletePositionMutationVariables> = await DeletePositionExecute({
      id: props.id
    });
    
    if(deletedData.data?.removePosition?.__typename){
      const deleted = props.data.filter((value , index)=>{
        return value.id !== props.id;
      })

      props.setData(deleted)
      props.setIsOpen(false)
    }
    setModalOpen(false)
}

  const Position = data?.position;

  return (
    <div>
      {props.isEdit ? (
        <EditPosition
          key={1}
          setIsEdit={props.setIsEdit}
          isEdit={props.isEdit}
          name={Position?.name as string}
          id={Position?.id as number}
          data={props.data}
          setData={props.setData}
          pointGroup={Position?.pointGroup as number}
          pointHouse={Position?.pointHouse as number}
          pointSingle={Position?.pointSingle as number}
          value={Position?.value as number}
        />
      ) : props.isCreate ? (
        <CreatePosition key={2} data={props.data} setData={props.setData} />
      ) : (
        <div>
          {fetching ? (
            <p> loading... </p>
          ) : (
            <div>
              <p>Name</p>
              <p>{Position?.name}</p>
              <p>Point Group</p>
              <p>{Position?.pointGroup}</p>
              <p>Point House</p>
              <p>{Position?.pointHouse}</p>
              <p>Point Single</p>
              <p>{Position?.pointSingle}</p>
              <p>Value</p>
              <p>{Position?.value}</p>
              <button
                className="bg-blue-500"
                onClick={() => {
                  props.setIsEdit(true);
                  props.setIsCreate(false);
                }}
              >
                Edit
              </button>
              <button className="bg-red-600" onClick={() => setModalOpen(true)}>
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} key={3}>
        <p>Are you sure Do you want to Delete ?</p>
        <button className="bg-red-600" onClick={HandleDelete}>Delete</button>
        <button className="bg-blue-500" onClick={() => setModalOpen(false)}>
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default OnePosition;
