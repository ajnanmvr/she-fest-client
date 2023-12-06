import { useState } from "react";
import {
  AddCandidateProgrammeDocument,
  AddCandidateProgrammeMutation,
  AddCandidateProgrammeMutationVariables,
  Candidate,
  CandidateProgramme,
  Programme,
} from "@/gql/graphql";
import { OperationResult, useMutation } from "urql";
import { MinusIcon, SubmitIcon } from "@/icons/action";
import { toast } from "react-toastify";

interface Props {
  allCandidates: Candidate[];
  Programme: Programme;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  singleProgramme : Programme;
  setSingleProgramme : React.Dispatch<React.SetStateAction<Programme>>;
}

const CreateGroup = (props: Props) => {
  const [chestNoms, setChestNoms] = useState<string[]>([]);

  const [state, CreateSingleCPExecute] = useMutation(
    AddCandidateProgrammeDocument
  );

  const handleChestNomsChange = (index: number, value: string) => {
    const newChestNomsValues = [...chestNoms];
    newChestNomsValues[index] = value;
    setChestNoms(newChestNomsValues);
  };

  const HandleSubmit = async () => {
    const data: OperationResult<
      AddCandidateProgrammeMutation,
      AddCandidateProgrammeMutationVariables
    > = await CreateSingleCPExecute({
      chestNO: chestNoms[0] ? chestNoms[0] : '',
      programCode: props.Programme?.programCode as string,
      candidatesOfProgramme: chestNoms,
    });

    if (data.data?.createCandidateProgramme) {
        toast.success(
          `${chestNoms[0]} add team added to program ${props.Programme?.programCode as string}`
        );

        const  AddedSingleProgramme = props.singleProgramme ;
    AddedSingleProgramme?.candidateProgramme?.push(data.data?.createCandidateProgramme as CandidateProgramme) 
    props.setSingleProgramme(AddedSingleProgramme as Programme)

    props.setIsCreate(false)
        //   props.setData([...props.data, datas.data?.createTeam as Team]);
      } else {
        data.error?.message.split("]")[1].startsWith(" target")
          ? toast.error("server error")
          : toast.error(data.error?.message.split("]")[1]);
      }
  };

  return (
    <div className="bg-white p-2 rounded-md">
      {[...Array(props.Programme?.candidateCount)].map((_, index) => {
        return (
          <div className="bg-base-200 rounded-md m-1 p-1 ">
            <div className="flex justify-between">
              <div className="flex">
                <input
                  type="text"
                  className="text-lg font-bold w-8/12 border-2 border-secondary rounded-md"
                  onChange={(e) => {
                    handleChestNomsChange(index, e.target.value);

                    console.log(chestNoms);

                    let findedCandiate = props.allCandidates.find(
                      (c: Candidate, index: number) => {
                        return c.chestNO == e.target.value;
                      }
                    );

                    (
                      document.getElementById(`to-add-${index}`) as any
                    ).innerHTML = findedCandiate
                      ? findedCandiate?.name
                      : "Enter valid Chest No";
                  }}
                />
              </div>
            </div>
            <p id={`to-add-${index}`}>Enter valid Chest No</p>
          </div>
        );
      })}
       <div className="w-full h-full flex items-center justify-around">

     
      <div
        onClick={async () => {
          await HandleSubmit();
        }}
      >
        <SubmitIcon className="w-7 h-7 text-secondary cursor-pointer" />
      </div>
      <div
        onClick={() => {
          props.setIsCreate(false);
        }}
        className="mx-2"
      >
        <MinusIcon className="w-7 h-7 text-secondary cursor-pointer" />
      </div>
      </div>
    </div>
  );
};

export default CreateGroup;
