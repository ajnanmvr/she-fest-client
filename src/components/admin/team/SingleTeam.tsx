"use client";
import Modal from "@/components/Modal";
import {
  Team,
  DeleteTeamDocument,
  DeleteTeamMutation,
  DeleteTeamMutationVariables,
  GetOneTeamDocument,
  GetOneTeamQuery,
  GetOneTeamQueryVariables,
} from "@/gql/graphql";
import {  useState } from "react";
import { OperationResult, useMutation, useQuery } from "urql";
import EditTeam from "./EditTeam";
import CreateTeam from "./CreateTeam";

interface Props {
  id: number;
  name: string;
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Team[];
  setData: React.Dispatch<React.SetStateAction<Team[]>>;
  isOpen : boolean;
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

const OneTeam = (props: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [{ fetching, data }] = useQuery<
    GetOneTeamQuery,
    GetOneTeamQueryVariables
  >({
    query: GetOneTeamDocument,
    variables: {
      id: props.id,
    },
    pause: props.isCreate || props.isEdit,
  });

  const [state, DeleteTeamExecute] = useMutation(DeleteTeamDocument);


  const HandleDelete =async ()=>{
    
    const deletedData : OperationResult<DeleteTeamMutation,DeleteTeamMutationVariables> = await DeleteTeamExecute({
      id: props.id
    });
    
    if(deletedData.data?.removeTeam?.__typename){
      const deleted = props.data.filter((value , index)=>{
        return value.id !== props.id;
      })

      props.setData(deleted)
      props.setIsOpen(false)
    }
    setModalOpen(false)
}

  const Team = data?.team;

  return (
    <div>
      {props.isEdit ? (
        <EditTeam
          key={1}
          setIsEdit={props.setIsEdit}
          isEdit={props.isEdit}
          name={Team?.name as string}
          id={Team?.id as number}
          data={props.data}
          setData={props.setData}
          color={Team?.color as string}
          description={Team?.description as string}
          shortName={Team?.shortName as string}
        />
      ) : props.isCreate ? (
        <CreateTeam key={2} data={props.data} setData={props.setData} />
      ) : (
        <div>
          {fetching ? (
            <p> loading... </p>
          ) : (
            <div>
              <p>name</p>
              <p className="text-blue-400">{Team?.name}</p>
              <p>id</p>
              <p className="text-blue-400">{Team?.id}</p>
              <p>color</p>
              <p className="text-blue-400">{Team?.color}</p>
              <p>description</p>
              <p className="text-blue-400">{Team?.description}</p>
              <p>ShortName</p>
              <p className="text-blue-400">{Team?.shortName}</p>
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

export default OneTeam;
