import { AddResultDocument, AddResultMutation, AddResultMutationVariables, CandidateProgramme, Programme } from "@/gql/graphql";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { OperationResult, useMutation } from "urql";

interface Props {
  isResultBarOpen: boolean;
  setIsViewResultAndEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Programme: Programme;
  allData : Programme[];
}

interface toUploadFormModel {
  programmeCode: string;
  inputs: {chestNo: string, mark: number}[];
}

function ViewResultAndEdit(props: Props) {
  const [pointsCount, setPointsCount] = useState<number>(1);
  const [toUploadForm , setToUploadForm] = useState<toUploadFormModel>({
    programmeCode : props.Programme?.programCode as string,
    inputs : []
  })
  const [state, AddResultExecute] = useMutation(AddResultDocument);

  const uploadResult = async ()=>{
    const data: OperationResult<AddResultMutation, AddResultMutationVariables> = await AddResultExecute({
      programmeCode : toUploadForm.programmeCode,
      input : toUploadForm.inputs
    });
    console.log(data);
    if (data.data?.addNormalResult) {
      let finalData = data.data?.addNormalResult;
     let editedDate = props.allData.map((data , i)=>{
      if(data.id == props.Programme.id){
        return {
          ...data,
          resultEntered : true,
          anyIssue : finalData[0].programme?.anyIssue,
          candidateProgramme : data.candidateProgramme?.map((itm , ind )=>{
            return {
              ...itm,
              mark : finalData[i]?.mark
            }
          })
        }
      }
      return data
     })
      toast.success("Result Added");
    } else {
      data.error?.message.split("]")[1].startsWith(" target") ? toast.error("server error") : toast.error(data.error?.message.split("]")[1]);
    }
  }


  useEffect(()=>{
    if(toUploadForm.inputs.length < (props.Programme?.candidateProgramme?.length as number)){
      props.Programme.candidateProgramme?.map((item , index)=>{
          console.log(item);
          
          let form = toUploadForm

          form.inputs.push({
            chestNo : item.candidate?.chestNO as string,
            mark : item.mark as number
          })

          

          setToUploadForm(form)

          console.log(form , toUploadForm);
          document.getElementById(`input-${0}-of-${item.candidate?.chestNO}`)
      })
    }
      
  },[])


  const TotalMarkSetter = (i: number, value: string, chestNo: string) => {
    if (!value) {
      value = "0";
    }

    if (parseFloat(value) > 10) {
      value = "10";
    }

    if (parseFloat(value) < 0) {
      value = "0";
    }

    let inputOne =
      (document.getElementById(`input-${0}-of-${chestNo}`) as HTMLInputElement)
        ?.value || "0";
    let inputTwo =
      (document.getElementById(`input-${1}-of-${chestNo}`) as HTMLInputElement)
        ?.value || "0";
    let inputThree =
      (document.getElementById(`input-${2}-of-${chestNo}`) as HTMLInputElement)
        ?.value || "0";

    // if the vaue grteate than 10
    if (parseFloat(inputOne as string) > 10) {
      inputOne = "10";
    }
    if (parseFloat(inputTwo as string) > 10) {
      inputTwo = "10";
    }
    if (parseFloat(inputThree as string) > 10) {
      inputThree = "10";
    }

    // less than 0
    if (parseFloat(inputOne as string) < 0) {
      inputOne = "0";
    }
    if (parseFloat(inputTwo as string) < 0) {
      inputTwo = "0";
    }
    if (parseFloat(inputThree as string) < 0) {
      inputThree = "0";
    }

    console.log(inputOne, inputTwo, inputThree);

    if (i == 0) {
      inputOne = value;
    } else if (i == 1) {
      inputTwo = value;
    } else if (i == 2) {
      inputThree = value;
    }

    let totalMarkOptained =  parseFloat((
      (parseFloat(inputOne as string) +
        parseFloat(inputTwo as string) +
        parseFloat(inputThree as string)) /
      pointsCount
    ).toFixed(2));

    (document.getElementById(`total-${chestNo}`) as any).innerHTML = totalMarkOptained

    let candiateToUpload = toUploadForm.inputs.map((data)=>{
      if(data.chestNo == chestNo){
        return {
          ...data,
          mark : totalMarkOptained 
        }
      }
      return data
    })

    let form = toUploadForm

    form.inputs = candiateToUpload

    setToUploadForm(form)
    
    console.log(toUploadForm);
    
  };

  return (
    <>
      {/* mobile only */}
      <div className="fixed h-screen w-screen bg-white  md:bg-white md:opacity-30 top-0 left-5 md:left-0 hidden">
        <div className="h-full w-[90%]  md:hidden flex flex-col justify-center  relative">
          <button className="absolute bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full bottom-8 right-8">
            Submit
          </button>
          <button className="bg-gray-300 h-10 w-10 rounded-full absolute top-5 left-5 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={24}
              viewBox="0 -960 960 960"
              width={24}
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
          <div className="flex justify-between px-3 h-[80vh]">
            <h1 className="text-xl">Add Points</h1>
            <div className="flex justify-end gap-2 text-[10px] items-center h-6/8 pr-">
              <div className="flex gap-2 items-center">
                <button className="bg-green-500 h-4 w-4 rounded flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    className="fill-white h-3 w-3"
                  >
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                  </svg>
                </button>
                <p>Add Column</p>
              </div>
              <div className="flex gap-2 items-center">
                <button className="bg-red-500 h-4 w-4 rounded flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    className="fill-white h-3 w-3"
                  >
                    <path d="M200-440v-80h560v80H200Z" />
                  </svg>
                </button>
                <p>Add Column</p>
              </div>
            </div>
          </div>
          {props.Programme?.candidateProgramme?.map((item, index) => {
            return (
              <div className="flex flex-col gap-3 h-[70%] overflow-y-auto" key={index}>
                {/* list1 */}
                <div className="flex gap-1 w-full">
                  <div className="bg-accent h-10 rounded-full flex justify-between items-center px-2 text-[10px] gap-2 w-1/3">
                    <p>SM13</p>
                    <p className="text-center">Muhammed Midlaj</p>
                  </div>
                  <div className="bg-accent h-10 w-2/3 rounded-full flex justify-between items-center px-2 text-[10px]">
                    <div className="flex flex-col items-center justify-center">
                      <p className="font-semibold">Points</p>
                      <p className="text-[8px]">(Max.10)</p>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        name=""
                        id=""
                        className="flex items-center justify-center h-5 w-5 bg-white text-center rounded"
                      />
                      <input
                        type="number"
                        name=""
                        id=""
                        className="flex items-center justify-center h-5 w-5 bg-white text-center rounded"
                      />
                      <input
                        type="number"
                        name=""
                        id=""
                        className="flex items-center justify-center h-5 w-5 bg-white text-center rounded"
                      />
                    </div>
                    <div
                      id=""
                      className="flex items-center justify-center h-5 w-5 bg-white text-center rounded"
                    >
                      30
                    </div>
                  </div>
                </div>
                {/* list2 */}
              </div>
            );
          })}
        </div>
      </div>

      {/* desktop only */}
      <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:flex flex-col bg-white h-[80%] w-[80%] rounded-big py-5 overflow-hidden hidden">
        {/* title */}
        <button className="absolute bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full bottom-8 right-8" onClick={uploadResult}>
          Submit
        </button>
        {/* <button className="absolute bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full bottom-8 left-6">
        Sort
      </button> */}
        <div className="flex justify-between px-5">
          <h1 className="text-3xl font-semibold">Add Point</h1>
          <button
            className="bg-gray-300 h-10 w-10 flex items-center justify-center rounded-full"
            onClick={() => {
              props.setIsViewResultAndEditOpen(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={24}
              viewBox="0 -960 960 960"
              width={24}
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
        <hr className="border" />
        {/* + and - button */}
        <div className="h-16 flex items-center justify-between  px-5">
          <div>
            {props.Programme.programCode +
              " - " +
              props.Programme.name +
              " - " +
              props.Programme.category?.name}
          </div>
          <div className="flex items-center gap-6">
            <div
              className="flex items-center gap-2"
              onClick={() => {
                if (pointsCount < 3) {
                  setPointsCount(pointsCount + 1);
                }
              }}
            >
              <button
                className={`h-4 w-4  ${
                  pointsCount == 3 ? "bg-slate-600" : "bg-green-500"
                } rounded`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[90%] w-[90%] fill-white"
                  viewBox="0 -960 960 960"
                >
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
              </button>
              <p className="text-tn">Add Column</p>
            </div>
            <div
              className="flex items-center gap-2"
              onClick={() => {
                if (pointsCount > 1) {
                  setPointsCount(pointsCount - 1);
                }
              }}
            >
              <button
                className={`h-4 w-4  ${
                  pointsCount == 1 ? "bg-slate-600" : "bg-red-500"
                } rounded`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[90%] w-[90%] fill-white"
                  viewBox="0 -960 960 960"
                >
                  <path d="M200-440v-80h560v80H200Z" />
                </svg>
              </button>
              <p className="text-tn">Remove</p>
            </div>
            {/* disble button ; color : #D9D9D9  */}
          </div>
        </div>
        <hr className="border" />
        {/* Judgement List */}
        <div className="h-full flex flex-col pt-5 gap-2 overflow-y-auto">
          {/* 1 */}
          {props.Programme?.candidateProgramme?.map((item, index) => {
            return (
              <div className="flex gap-5 px-5 h-14 w-full" key={index}>
                {/* first */}
                <div className="flex gap-5 bg-accent h-14 w-1/3 rounded-xl px-5 items-center text-xs justify-between">
                  <p>{item.candidate?.chestNO}</p>
                  <p className="text-center">{item.candidate?.name}</p>
                </div>
                {/* second */}
                <div className="flex gap-5 bg-accent h-14 w-2/3 rounded-xl px-5 items-center text-[10px] justify-between">
                  <div className="flex flex-col items-center">
                    <p className="font-semibold text-[10px]">Points</p>
                    <p className="text-[10px]">MAX(10pts)</p>
                  </div>
                  {/* <div className="flex gap-2">
                    {[...Array(pointsCount)].map((_, i) => {
                      return (
                        <input
                        key={index}
                          type="number"
                          className="bg-white h-10 w-10 rounded-lg justify-center flex items-center text-lg font-semibold text-primary text-center"
                          id={`input-${i}-of-${item.candidate?.chestNO}`}
                          onChange={(e) => {
                            // (document.getElementById(`total-${item.candidate?.chestNO}`) as any).innerHTML = +(document.getElementById(`total-${item.candidate?.chestNO}`) as any).innerHTML  + parseFloat(e.target.value )
                            TotalMarkSetter(
                              i,
                              e.target.value,
                              item.candidate?.chestNO as string
                            );
                          }}
                          defaultValue={item.mark as number}
                        />
                        
                      );
                    })}
                  </div> */}
                  <div className="flex gap-5">
                  <div className="bg-white h-10 w-10 rounded-lg justify-center flex items-center text-lg font-semibold text-primary text-center">
                    {item.grade?.name || 'NIL'}
                  </div>
                  <div className="bg-white h-10 w-20 rounded-lg justify-center flex items-center text-lg font-semibold text-primary text-center">
                  {item.position?.name || 'NIL'}
                  </div>
                  </div>
                  {/* <div className="flex gap-5 items-center">
                    <p>total</p>
                    <div
                      id={`total-${item.candidate?.chestNO}`}
                      className="bg-white h-10 w-12 rounded-lg justify-center flex items-center text-lg font-semibold text-primary"
                    >
                      0
                    </div>
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
        <hr />
      </div>
    </>
  );
}

export default ViewResultAndEdit;
