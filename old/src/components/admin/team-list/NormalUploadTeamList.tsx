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


const NormalUploadTeamList = (props: Props) => {
  return (
    <div className="flex">
      <div className={`grid grid-4 gap-4 w-full transition-all ${props.IsRightSideBarOpen ? "grid-cols-1 lg:grid-cols-3" : " grid-cols-1 lg:grid-cols-4"
        }`} >
        {props.currentData?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="transition-all bg-[#EEEEEE] rounded-xl mt-[1%] cursor-pointer flex p-5 gap-3 content-center items-center h-20"
              onClick={() => {
                props.setIsRightSideBarOpen(true);
                props.setSelectedProgramme(item);
                props.setIsEdit(false);
                props.setIsCreate(false);
                props.setIsExcelUpload(false);
              }}
            >



              <div className="text-white font-bold bg-secondary px-3 py-1 text-xl rounded-xl flex justify-center content-center items-center">
                <p> {item.programCode}</p>
              </div>

              <p className="text-black leading-5 pr-[10%]">
                {item.name}
              </p>
            </div>

          );
        })}
      </div>
    </div>
  )
}

export default NormalUploadTeamList