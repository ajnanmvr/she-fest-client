"use client";
import { AddProgrammeDocument, AddProgrammeMutation, AddProgrammeMutationVariables, GetDetailedCandidateDocument, GetDetailedProgrammeDocument, GetDetailedProgrammeQuery, GetDetailedProgrammeQueryVariables, Mode, Model, Programme, Type } from "@/gql/graphql";
import React from "react";
import { OperationResult, useMutation, useQuery } from "urql";

interface Props {
    data: Programme[]
    setData: React.Dispatch<React.SetStateAction<Programme[]>>
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedProgramme: Programme;
}

const ViewResult = (props: Props) => {

    console.log(props.selectedProgramme?.id);

    const [{ fetching, data }] = useQuery<
        GetDetailedProgrammeQuery,
        GetDetailedProgrammeQueryVariables
    >({
        query: GetDetailedProgrammeDocument,
        variables: {
            id: props.selectedProgramme?.id as number,
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
                            <label className="text-gray-500">Skill</label>
                            <label className="text-gray-500">Mode</label>
                            <label className="text-gray-500">Model</label>
                            <label className="text-gray-500">Program Code</label>
                            <label className="text-gray-500">Candidate Count</label>
                            <label className="text-gray-500">Group Count</label>
                            <label className="text-gray-500">Duration</label>
                            <label className="text-gray-500">Concept Note</label>
                            <label className="text-gray-500">Type</label>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-500">{props.selectedProgramme?.name}</label>
                            <label className="text-gray-500">{props.selectedProgramme?.category?.name}</label>
                            <label className="text-gray-500">{props.selectedProgramme?.skill?.name}</label>
                            <label className="text-gray-500">{props.selectedProgramme?.mode}</label>
                            <label className="text-gray-500">{data?.programme?.model}</label>
                            <label className="text-gray-500">{data?.programme?.programCode}</label>
                            <label className="text-gray-500">{props.selectedProgramme?.candidateCount}</label>
                            <label className="text-gray-500">{props.selectedProgramme?.groupCount ? props.selectedProgramme.groupCount : 'Nil'}</label>
                            <label className="text-gray-500">{props.selectedProgramme?.duration}</label>
                            <label className="text-gray-500">{props.selectedProgramme?.conceptNote}</label>
                            <label className="text-gray-500">{props.selectedProgramme?.type}</label>
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
                            {data?.programme?.candidateProgramme?.map((value, index) => {
                                return (
                                    <div key={index} className="flex flex-row">
                                        <label className="text-gray-500">{value.candidate?.chestNO}</label>
                                        <label className="text-gray-500">{value.candidate?.name}</label>
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

export default ViewResult;
