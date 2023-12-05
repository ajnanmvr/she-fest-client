"use client";
import Modal from "@/components/Modal";
import {
  Skill,
  DeleteSkillDocument,
  DeleteSkillMutation,
  DeleteSkillMutationVariables,
  GetOneSkillDocument,
  GetOneSkillQuery,
  GetOneSkillQueryVariables,
} from "@/gql/graphql";
import {  useState } from "react";
import { OperationResult, useMutation, useQuery } from "urql";
import EditSkill from "./EditSkill";
import CreateSkill from "./CreateSkill";

interface Props {
  id: number;
  name: string;
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Skill[];
  setData: React.Dispatch<React.SetStateAction<Skill[]>>;
  isOpen : boolean;
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

const OneSkill = (props: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [{ fetching, data }] = useQuery<
    GetOneSkillQuery,
    GetOneSkillQueryVariables
  >({
    query: GetOneSkillDocument,
    variables: {
      id: props.id,
    },
    pause: props.isCreate || props.isEdit,
  });

  const [state, DeleteSkillExecute] = useMutation(DeleteSkillDocument);


  const HandleDelete =async ()=>{
    
    const deletedData : OperationResult<DeleteSkillMutation,DeleteSkillMutationVariables> = await DeleteSkillExecute({
      id: props.id
    });
    
    if(deletedData.data?.removeSkill?.__typename){
      const deleted = props.data.filter((value , index)=>{
        return value.id !== props.id;
      })

      props.setData(deleted)
      props.setIsOpen(false)
    }
    setModalOpen(false)
}

  const Skill = data?.skill;

  return (
    <div>
      {props.isEdit ? (
        <EditSkill
          key={1}
          setIsEdit={props.setIsEdit}
          isEdit={props.isEdit}
          name={Skill?.name as string}
          id={Skill?.id as number}
          data={props.data}
          setData={props.setData}
          descriotion={Skill?.description as string}
          shortName={Skill?.shortName as string}
        />
      ) : props.isCreate ? (
        <CreateSkill key={2} data={props.data} setData={props.setData} />
      ) : (
        <div>
          {fetching ? (
            <p> loading... </p>
          ) : (
            <div>
              <p>name</p>
              <p className="text-blue-400">{Skill?.name}</p>
              <p>id</p>
              <p className="text-blue-400">{Skill?.id}</p>
              <p>description</p>
              <p className="text-blue-400">{Skill?.description}</p>
              <p>ShortName</p>
              <p className="text-blue-400">{Skill?.shortName}</p>
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

export default OneSkill;
