import { Candidate, Programme } from "@/gql/graphql";
import React, { useEffect } from "react";
import CandidatesList from "./CandidatesList";
import { log } from "console";

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
  const [bulkData, setBulkData] = React.useState<any[]>([]
  );
  const [sortedData, setSortedDAta] = React.useState<Programme[]>(props.currentData)
  const [storedData , setStoredDate] = React.useState(null)

  useEffect(() => {

    setSortedDAta(props.currentData.sort((a, b) => (a.id as number) -( b.id as number) )as Programme[]);

    const dt = JSON.parse(localStorage.getItem('list-data') as string)
    setStoredDate(dt)
    return () => {

    }
  }, [])


  const handleInputChange = (index: number , ind : number , event: any,item:any) => {
        
    const {programCode,...others} =item

    const match =  bulkData.find((item) => item.index === ind && item.programCode === programCode)  

    if(match){
      const data = bulkData.map((item) => {
        if(item.index === ind && item.programCode === programCode){
          return  {...item, chestNO : event.target.value}
        }
        return item
      })
      setBulkData(data)
      localStorage.setItem('list-data',JSON.stringify(data))
    }else{
      setBulkData([ ...bulkData , { programCode, chestNO : event.target.value , index: ind }])

    }
  };

  // Needed ------------------------------------------

  // candidates of programme that have already applied 
  // edit option for them 
  // set view only when controller disabled it

  const handleClick=()=>{
    // delete all date which chestNo is empty

    const data = bulkData.filter((item) => item.chestNO !== "")

    const dats = inputValidator()

    localStorage.removeItem('list-data')
    console.log(dats);
  }

  const inputValidator = () => {
    // check all chestNo are 4 letters and first one string and last three numbers

    const valuatedData = bulkData.filter((item)=>{
      const firstLetter = item.chestNO[0]
      const lastThree = item.chestNO.slice(1,4)
      const isNumber = Number(lastThree)
      if(firstLetter && lastThree && isNumber){
        return item
      }
    })

    return valuatedData
  }

  return (
    <div className="flex h-[65vh] overflow-y-scroll overflow-x-hidden">
      <div
        className={`grid  gap-4 w-full transition-all ${props.IsRightSideBarOpen ? "grid-cols-3" : "grid-cols-4"
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

                    [...Array(item.candidateCount)].map((_, i) => (
      
                      <div>
                        <input

                          key={index}
                          type="text"
                          placeholder={`Input ${index + 1}`}
                          name=""
                          onChange={(event) => {
                            handleInputChange(index , i, event,item); 
                            console.log(index, i,);
                            //   console.log(props.currentData);
                            //   console.log(sortedData);

                              

                          }}
                        /> 
                      </div>
                    ))
                  }
                </div>
                
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={handleClick}>done</button>
    </div>
  );
};

export default BulkUploadTeamList;