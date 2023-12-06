"use client";
import Modal from "@/components/Modal";
import {
  Credential,
  DeleteCredentialDocument,
  DeleteCredentialMutation,
  DeleteCredentialMutationVariables,
  GetOneCredentialDocument,
  GetOneCredentialQuery,
  GetOneCredentialQueryVariables,
} from "@/gql/graphql";
import React, {  use, useEffect, useState } from "react";
import { OperationResult, useMutation, useQuery } from "urql";
import EditCredential from "./EditCredentials";
import CreateCredential from "./CreateCredentials";

interface Props {
  id: number;
  name: string;
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Credential[];
  setData: React.Dispatch<React.SetStateAction<Credential[]>>;
  isOpen : boolean;
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
}


const OneCredential = (props: Props) => {
  const [{ fetching, data }] = useQuery<
    GetOneCredentialQuery,
    GetOneCredentialQueryVariables
  >({
    query: GetOneCredentialDocument,
    variables: {
      id: props.id,
    },
    pause: props.isCreate || props.isEdit,
  });




  const Credential  = data?.credential;

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  

  const [state, DeleteCredentialExecute] = useMutation(DeleteCredentialDocument);


  const HandleDelete =async ()=>{
    
    const deletedData : OperationResult<DeleteCredentialMutation,DeleteCredentialMutationVariables> = await DeleteCredentialExecute({
      id: props.id
    });
    
    if(deletedData.data?.removeCredential?.__typename){
      const deleted = props.data.filter((value , index)=>{
        return value.id !== props.id;
      })

      props.setData(deleted)
      props.setIsOpen(false)
    }
    setModalOpen(false)
}


  return (
    <div>
      {props.isEdit ? (
        <EditCredential
          key={1}
          setIsEdit={props.setIsEdit}
          isEdit={props.isEdit}
          name={Credential?.username as string}
          id={Credential?.id as number}
          data={props.data}
          setData={props.setData}

        />
      ) : props.isCreate ? (
        <CreateCredential key={2} data={props.data} setData={props.setData} />
      ) : (
        <div>
          {fetching ? (
            <p> loading... </p>
          ) : (
            <div>
              <p onClick={()=>{
                console.log(data);
                
              }}>Name</p>
              <p className="text-teal-500">{Credential?.username}</p>
              <p>Role</p>
              <p className="text-teal-500">{Credential?.roles}</p>
              
              {
                Credential &&
                Credential.categories &&
                Credential?.categories?.length > 0 &&
                 Credential.categories.map((item , index) =>{
                  return (
                      <>
                      {
                        index == 0 &&
                        <p>Categories</p>
                      }
                  <p className="text-teal-500">{item.name}</p>
                  </>
                  )
                })
              }
              
              {
                Credential?.team && 
                <>

                <p>Team</p>
                <p className="text-teal-500">{Credential.team?.name}</p>
                </>
              }
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

export default OneCredential;
