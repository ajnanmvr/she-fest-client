import { Candidate, Programme } from "@/gql/graphql";
import React from "react";
import CandidatesList from "./CandidatesList";

interface Props {
  currentData: Programme[];
  IsRightSideBarOpen: boolean;
  setIsRightSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProgramme: React.Dispatch<React.SetStateAction<any>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setIsExcelUpload: React.Dispatch<React.SetStateAction<boolean>>;
  candidates: Candidate[];
}

const BulkUploadTeamList = (props: Props) => {
  const [nameOne, setNameOne] = React.useState<string>("");

  const handleInputChange = (index: number, event: any) => {
    // Handle input changes if needed
  };

  return (
    <div className="flex h-[65vh] overflow-y-scroll overflow-x-hidden">
      <div
        className={`grid  gap-4 w-full transition-all ${
          props.IsRightSideBarOpen ? "grid-cols-3" : "grid-cols-4"
        }`}
      >
        {props.currentData?.map((item: Programme, index: number) => {
          return (
            <div
              key={index}
              className="w-full h-full bg-base-100  transition-all rounded-lg mt-[1%]  "
              onClick={() => {
                // props.setIsRightSideBarOpen(true);
                // props.setSelectedProgramme(item);
                // props.setIsEdit(false);
                // props.setIsCreate(false);
                // props.setIsExcelUpload(false);
              }}
            >
              <div className="flex w-full justify-around">
                <div className="">
                  <p className="text-base-content text-sm">{item.name}</p>
                </div>
                <div className=" ">
                  <p className="text-base-content">{item.programCode}</p>
                </div>
              </div>
              {/* inputs */}
              <div className="flex flex-col gap-2 ">
                <div className="flex flex-col gap-2">
                  {
                    //  create inputs as much as the candidate count the candidate count is the number of inputs get from item.candidateCount

                    [...Array(item.candidateCount)].map((_, index) => (
                      <div>
                        <input
                          key={index}
                          type="text"
                          placeholder={`Input ${index + 1}`}
                          onChange={(event) => {
                            handleInputChange(index, event);
                          }}
                        />
                      </div>
                    // <CandidatesList/>
                    ))
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BulkUploadTeamList;
