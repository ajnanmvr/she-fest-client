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
import { DeleteIcon, EditIcon } from "@/icons/action";
import { API_KEY } from "@/lib/env";

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
      api_key : API_KEY
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
    <div className="w-full h-full">
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
      <div className="w-full h-full">
        {fetching ? (
          <p> loading... </p>
        ) : (
          <div className="w-full h-full flex flex-col justify-between">
            <div>
              <p className="font-bold text-2xl leading-7 mt-2 text-center"><span className="font-normal">Name:</span>{Tag?.name}</p>
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

export default OneTag;
