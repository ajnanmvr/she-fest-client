import { Programme } from '@/gql/graphql';
import React from 'react'

interface Props {   
    currentData: Programme[];
    IsRightSideBarOpen: boolean;
    setIsRightSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedProgramme: React.Dispatch<React.SetStateAction<any>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
    setIsExcelUpload: React.Dispatch<React.SetStateAction<boolean>>;
}


const NormalUploadTeamList = (props:Props) => {
  return (
     <div className="flex">
            <div className={`grid  gap-4 w-full transition-all ${
                props.IsRightSideBarOpen ? "grid-cols-3" : "grid-cols-4"
              }`} >
              {props.currentData?.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="w-full h-full bg-base-100  transition-all rounded-lg mt-[1%] cursor-pointer "
                    onClick={() => {
                      props.setIsRightSideBarOpen(true);
                      props.setSelectedProgramme(item);
                      props.setIsEdit(false);
                      props.setIsCreate(false);
                      props.setIsExcelUpload(false);
                    }}
                  >
                    <div className="w-1/3">
                      <p className="text-base-content">{item.name}</p>
                    </div>
                    <div className="w-1/3 ">
                      <p className="text-base-content">{item.id}</p>
                    </div>
                    <div className="w-1/3 ">
                      <p className="text-base-content">{item.programCode}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div> 
  )
}

export default NormalUploadTeamList