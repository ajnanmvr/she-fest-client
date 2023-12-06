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
  Roles,
  Team,
} from "@/gql/graphql";
import React, { ReactNode, use, useEffect, useState } from "react";
import { OperationResult, useMutation, useQuery } from "urql";
import EditCredential from "./EditCredentials";
import CreateCredential from "./CreateCredentials";
import { DeleteIcon, EditIcon } from "@/icons/action";

interface Props {
  id: number;
  name: string;
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Credential[];
  setData: React.Dispatch<React.SetStateAction<Credential[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  teams: Team[];
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




  const Credential = data?.credential;

  const [modalOpen, setModalOpen] = useState<boolean>(false);



  const [state, DeleteCredentialExecute] = useMutation(DeleteCredentialDocument);


  const HandleDelete = async () => {

    const deletedData: OperationResult<DeleteCredentialMutation, DeleteCredentialMutationVariables> = await DeleteCredentialExecute({
      id: props.id
    });

    if (deletedData.data?.removeCredential?.__typename) {
      const deleted = props.data.filter((value, index) => {
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
        <EditCredential
          key={1}
          setIsEdit={props.setIsEdit}
          isEdit={props.isEdit}
          name={Credential?.username as string}
          id={Credential?.id as number}
          data={props.data}
          setData={props.setData}
          teams={props.teams}
          team={Credential?.team?.name as string}
          roles={Credential?.roles as Roles}
        />
      ) : props.isCreate ? (
        <CreateCredential key={2} data={props.data} setData={props.setData} teams={props.teams} />
      ) : (
        <div className="w-full h-full">
          {fetching ? (
            <p> loading... </p>
          ) : (
            <div className="w-full h-full flex flex-col justify-between">
              {/* <div>
              <p className="font-bold text-2xl leading-7 mt-2 text-center"><span className="font-normal">Name:</span>{Credential?.name}</p>
              <p className="font-bold text-2xl leading-7 mt-2 text-center"><span className="font-normal">Section:</span>{Credential?.section?.name}</p>

            </div> */}
              <div className="relative top-15 flex flex-col items-center justify-center gap-4">


                <div className="flex flex-col gap-2 w-full">
                  
                  <p className="text-base text-[#8D8D8D]" >Name</p>
                  <p className="input input-bordered input-secondary w-full max-w-xs pt-2 text-[#3F127A] border-none">{Credential?.username}</p>
                  {
                  Credential?.roles == (Roles.Admin || Roles.Media) ?

                    "" :
                    <div className="flex flex-col gap-2 w-full">
                      <p className="text-base text-[#8D8D8D]" >Categories</p>
                      {
                        Credential?.categories?.map((value, index) => {
                          return (
                            <span key={index} className="input input-bordered input-secondary w-full max-w-xs pt-2 text-[#3F127A] border-none">{value.name}</span>
                          )
                        })
                      }


                    </div>


                }
                </div>


                <div className="flex flex-col gap-2 w-full">
                  <p className="text-base text-[#8D8D8D]" >Role</p>
                  <span className="input input-bordered input-secondary w-full max-w-xs pt-2 text-[#3F127A] border-none">{Credential?.roles}</span>
                </div>

                {

                  Credential?.roles == Roles.TeamManager &&
                  <div className="flex flex-col gap-2 w-full">
                    <p className="text-base text-[#8D8D8D]" >Team</p>
                    <span className="input input-bordered input-secondary w-full max-w-xs pt-2 text-[#3F127A] border-none">{Credential?.team?.name as string}</span>
                  </div>


                }
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

export default OneCredential;
