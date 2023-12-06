"use client";
import Modal from "@/components/Modal";
import {
  Programme,
  DeleteProgrammeDocument,
  DeleteProgrammeMutation,
  DeleteProgrammeMutationVariables,
  GetOneProgrammeDocument,
  GetOneProgrammeQuery,
  GetOneProgrammeQueryVariables,
  Mode,
  Model,
  Category,
  Skill,
  UploadScheduleMutation,
  UploadScheduleMutationVariables,
  UploadScheduleDocument,
} from "@/gql/graphql";
import { useEffect, useState } from "react";
import { OperationResult, useMutation, useQuery } from "urql";
import EditProgramme from "./EditProgramme";
import CreateProgramme from "./CreateProgramme";
import ExcelUploadProgramme from "./ExcelUploadProgramme";
import { API_KEY } from "@/lib/env";
import {
  AddIcon,
  CalenderIcon,
  DeleteIcon,
  EditIcon,
  MinusIcon,
  SubmitIcon,
} from "@/icons/action";
import CreateSchedule from "./CreateSchedule";

interface Props {
  id: number;
  name: string;
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Programme[];
  setData: React.Dispatch<React.SetStateAction<Programme[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  skill: string;
  category: string;
  isExcelUpload: boolean;
  setIsExcelUpload: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Category[];
  skills: Skill[];
  setIsScheduleUpload: React.Dispatch<React.SetStateAction<boolean>>;
  isScheduleUpload: boolean;
}

const OneProgramme = (props: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [isScheduleCreate, setIsScheduleCreate] = useState<boolean>(false);
  const [venue, setVenue] = useState<number>(0);
  const [date, setDate] = useState<any>();

  const [{ fetching, data }] = useQuery<
    GetOneProgrammeQuery,
    GetOneProgrammeQueryVariables
  >({
    query: GetOneProgrammeDocument,
    variables: {
      id: props.id,
      api_key: API_KEY,
    },
    pause: props.isCreate || props.isEdit,
  });

  const [state, DeleteProgrammeExecute] = useMutation(DeleteProgrammeDocument);
  const [_, UploadScheduleExecute] = useMutation(UploadScheduleDocument);

  const timeFormat12Hour = (date : Date) => {
    let h = date.getHours();
    let m : any = date.getMinutes();
    let ampm = h >= 12 ? "pm" : "am";
 
    h = h % 12; //reminder
    h = h ? h : 12;
 
    m  = m.toString().padStart(2, "0");
   const formatedTimeString = h + ":" + m + " " + ampm;
   return formatedTimeString;
 };
 

  const HandleScheduleUpload = async () => {
    const scheduledProgramme: OperationResult<
      UploadScheduleMutation,
      UploadScheduleMutationVariables
    > = await UploadScheduleExecute({
      date,
      programCode: Programme?.programCode as string,
      venue
    });

    if (scheduledProgramme.data?.setSchedule?.date) {
      const scheduled = props.data.filter((value, index) => {
        if (value.id !== props.id) {
          return value
        } else {
          const ScheduleAddedProgram = {
            ...value,
            date,
            venue
          }

          return ScheduleAddedProgram
        }
      });

      props.setData(scheduled);
    }

    setIsScheduleCreate(false)

  }

  const HandleDelete = async () => {
    const deletedData: OperationResult<
      DeleteProgrammeMutation,
      DeleteProgrammeMutationVariables
    > = await DeleteProgrammeExecute({
      id: props.id,
    });

    if (deletedData.data?.removeProgramme?.__typename) {
      const deleted = props.data.filter((value, index) => {
        return value.id !== props.id;
      });

      props.setData(deleted);
      props.setIsOpen(false);
    }
    console.log(deletedData);

    setModalOpen(false);
  };

  const m = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const Programme = data?.programme;

  useEffect(() => {
    if (Programme?.venue && Programme?.date) {
      setVenue(Programme.venue);
      setDate(Programme.date);
    }
  }, [data]);

  return (
    <div className="w-full h-full">
      {props.isEdit ? (
        <EditProgramme
          key={1}
          setIsEdit={props.setIsEdit}
          isEdit={props.isEdit}
          name={Programme?.name as string}
          id={Programme?.id as number}
          data={props.data}
          setData={props.setData}
          category={props.category}
          skill={props.skill}
          programeCode={Programme?.programCode as string}
          candiateCount={Programme?.candidateCount as number}
          groupCount={Programme?.groupCount as number}
          duration={Programme?.duration as number}
          conceptNote={Programme?.conceptNote as string}
          mode={Programme?.mode as unknown as Mode}
          model={Programme?.model as Model}
          type={Programme?.type as string}
          selectedProgramme={Programme as Programme}
          categories={props.categories}
          skills={props.skills}
        />
      ) : props.isCreate ? (
        <CreateProgramme
          key={2}
          data={props.data}
          setData={props.setData}
          categories={props.categories}
          skills={props.skills}
        />
      ) : props.isExcelUpload ? (
        <ExcelUploadProgramme
          data={props.data}
          setData={props.setData}
          isExcelUpload={props.isExcelUpload}
          setIsExcelUpload={props.setIsExcelUpload}
          key={1}
        />
      ) : props.isScheduleUpload ? (
        <CreateSchedule
          data={props.data}
          setData={props.setData}
          isExcelUpload={props.isExcelUpload}
          setIsExcelUpload={props.setIsExcelUpload}
          key={1}
        />
      ) : (
        <div className="w-full h-full">
          {fetching ? (
            <p> loading... </p>
          ) : (
            <div className="w-full h-full flex flex-col justify-between">
              <div className="relative top-15 flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col gap-1 w-full ">
                  <p className="text-base text-[#8D8D8D]">name</p>
                  <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">
                    {Programme?.name}
                  </p>
                  <p className="text-base text-[#8D8D8D]">id</p>
                  <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">
                    {Programme?.id}
                  </p>
                  <p className="text-base text-[#8D8D8D]">programCode</p>
                  <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">
                    {Programme?.programCode}
                  </p>
                  <p className="text-base text-[#8D8D8D]">candidateCount</p>
                  <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">
                    {Programme?.candidateCount}
                  </p>
                  <p className="text-base text-[#8D8D8D]">category</p>
                  <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">
                    {Programme?.category?.name}
                  </p>
                  <p className="text-base text-[#8D8D8D]">conceptNote</p>
                  <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">
                    {Programme?.conceptNote}
                  </p>
                  <p className="text-base text-[#8D8D8D]">duration</p>
                  <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">
                    {Programme?.duration}
                  </p>
                  <p className="text-base text-[#8D8D8D]">groupCount</p>
                  <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">
                    {Programme?.groupCount}
                  </p>
                  <p className="text-base text-[#8D8D8D]">mode</p>
                  <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">
                    {Programme?.mode}
                  </p>
                  <p className="text-base text-[#8D8D8D]">model</p>
                  <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">
                    {Programme?.model}
                  </p>
                  <p className="text-base text-[#8D8D8D]">skill</p>
                  <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">
                    {Programme?.skill?.name}
                  </p>
                  <p className="text-base text-[#8D8D8D]">type</p>
                  <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">
                    {Programme?.type}
                  </p>
                  {Programme?.venue && Programme.date && !isScheduleCreate && (
                    <>
                      <p className="text-base text-[#8D8D8D]">Venue</p>
                      <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">
                        {Programme?.venue}
                      </p>
                      <p className="text-base text-[#8D8D8D]">Schedule</p>
                      <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">
                        {new Date(Programme?.date).getDay() + " " + m[new Date(Programme?.date).getMonth()] + ' ' + new Date(Programme?.date).getFullYear() + " - " + new Date(Programme?.date).getUTCHours() + ":" + new Date(Programme?.date).getUTCMinutes()  }
                      </p>
                    </>
                  )}

                  {isScheduleCreate && (
                    <div className="bg-slate-50 p-2 rounded-lg mt-2">
                      <p>Venue</p>
                      <input
                        type="text"
                        value={venue}
                        onChange={(e) => setVenue(+e.target.value)}
                        placeholder="name"
                        className="input input-bordered input-secondary w-full max-w-xs mt-1"
                      />
                      <p>Date</p>
                      <input
                        type="datetime-local"
                        className="input input-bordered input-secondary w-full max-w-xs mt-1"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="candidateCount"
                      />

                      <div className="w-full flex justify-end mt-2 gap-2 ">
                        <div className="bg-secondary p-1 rounded-md cursor-pointer" onClick={async () => {
                          await HandleScheduleUpload()
                        }}>
                          <SubmitIcon className="w-6 h-6 text-white " />
                        </div>

                        <div
                          onClick={() => {
                            setIsScheduleCreate(false);
                          }}
                          className="bg-white p-1 rounded-md shadow-md shadow-slate-200 cursor-pointer"
                        >
                          <MinusIcon className="w-6 h-6 text-secondary " />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full mt-4 flex items-center justify-between">
                <div className=" flex items-center justify-center"></div>
                <div className="w-full flex items-center justify-around">
                  <button
                    className=" border-2 text-white px-2 py-2 border-secondary rounded-xl font-bold tooltip"
                    data-tip={`${Programme?.venue && Programme.date ? "Edit" : "Add"
                      } Schedule`}
                    onClick={() => {
                      // props.setIsEdit(true);
                      // props.setIsCreate(false);

                      setIsScheduleCreate(true);
                    }}
                  >
                    <CalenderIcon className="w-4 h-4 cursor-pointer  text-secondary transition-all" />
                  </button>
                  <button
                    className=" border-2 text-white px-2 py-2 border-secondary rounded-xl font-bold"
                    onClick={() => {
                      props.setIsEdit(true);
                      props.setIsCreate(false);
                    }}
                  >
                    <EditIcon className="w-4 h-4 cursor-pointer fill-secondary  transition-all" />
                  </button>
                  <button
                    className=" border-2 text-white px-2 py-2 border-secondary rounded-xl font-bold"
                    onClick={() => setModalOpen(true)}
                  >
                    <DeleteIcon className="w-4 h-4 cursor-pointer fill-secondary  transition-all" />
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

export default OneProgramme;
