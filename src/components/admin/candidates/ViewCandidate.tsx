"use client";
import { Candidate, GetDetailedCandidateDocument, GetDetailedCandidateQuery, GetDetailedCandidateQueryVariables } from "@/gql/graphql";
import React from "react";
import { OperationResult, useMutation, useQuery } from "urql";

interface Props {
    data: Candidate[]
    setData: React.Dispatch<React.SetStateAction<Candidate[]>>
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedCandidate: Candidate;
}

const ViewCandidate = (props: Props) => {

    console.log(props.selectedCandidate?.id);

    const [{ fetching, data }] = useQuery<
        GetDetailedCandidateQuery,
        GetDetailedCandidateQueryVariables
    >({
        query: GetDetailedCandidateDocument,
        variables: {
            id: props.selectedCandidate?.id as number,
        }
    });

    console.log(data);


    return (
        <div className={`modal  ${props.modalOpen ? "modal-open" : ""}`}>
            <div className='modal-box relative    '>
                <label
                    onClick={() => props.setModalOpen(false)}
                    className='btn btn-sm btn-circle absolute right-2 top-2 '
                >
                    ✕
                </label>
                <div className="flex flex-row">
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <label className="text-gray-500">Name</label>
                            <label className="text-gray-500">Category</label>
                            
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-500">{props.selectedCandidate?.name}</label>
                            <label className="text-gray-500">{props.selectedCandidate?.category?.name}</label>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <label className="text-gray-500 font-extrabold">Candidates</label>
                        </div>
                        <div className="flex flex-col">
                            
                                    <div  className="flex flex-row">
                                        <label className="text-gray-500 font-bold">Chest NO</label>
                                        <label className="text-gray-500 font-bold">Name</label>
                                    </div>
                              

                        </div>
                        <div className="flex flex-col">
                            {data?.candidate?.candidateProgrammes?.map((value, index) => {
                                return (
                                    <div key={index} className="flex flex-row">
                                        <label className="text-gray-500">{value.programme?.name}</label>
                                        <label className="text-gray-500">{value.programme?.id}</label>
                                    </div>
                                )
                            })}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewCandidate;
