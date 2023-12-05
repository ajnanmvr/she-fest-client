"use client";
import Modal from "@/components/Modal";
import {
  Tag,
  DeleteTagDocument,
  DeleteTagMutation,
  DeleteTagMutationVariables,
  GetOneTagDocument,
  GetOneTagQuery,
  GetOneTagQueryVariables,
} from "@/gql/graphql";
import {  useState } from "react";
import { OperationResult, useMutation, useQuery } from "urql";
import EditTag from "./EditTag";
import CreateTag from "./CreateTag";

interface Props {
  id: number;
  name: string;
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Tag[];
  setData: React.Dispatch<React.SetStateAction<Tag[]>>;
  isOpen : boolean;
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

const OneTag = (props: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [{ fetching, data }] = useQuery<
    GetOneTagQuery,
    GetOneTagQueryVariables
  >({
    query: GetOneTagDocument,
    variables: {
      id: props.id,
    },
    pause: props.isCreate || props.isEdit,
  });

  const [state, DeleteTagExecute] = useMutation(DeleteTagDocument);


  const HandleDelete =async ()=>{
    
    const deletedData : OperationResult<DeleteTagMutation,DeleteTagMutationVariables> = await DeleteTagExecute({
      id: props.id
    });
    
    if(deletedData.data?.removeTag?.__typename){
      const deleted = props.data.filter((value , index)=>{
        return value.id !== props.id;
      })

      props.setData(deleted)
      props.setIsOpen(false)
    }
    setModalOpen(false)
}

  const Tag = data?.tag;

  return (
    <div>
      {props.isEdit ? (
        <EditTag
          key={1}
          setIsEdit={props.setIsEdit}
          isEdit={props.isEdit}
          name={Tag?.name as string}
          id={Tag?.id as number}
          data={props.data}
          setData={props.setData}
        />
      ) : props.isCreate ? (
        <CreateTag key={2} data={props.data} setData={props.setData} />
      ) : (
        <div>
          {fetching ? (
            <p> loading... </p>
          ) : (
            <div>
              <p>name</p>
              <p className="text-blue-400">{Tag?.name}</p>
              <p>id</p>
              <p className="text-blue-400">{Tag?.id}</p>
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

export default OneTag;
