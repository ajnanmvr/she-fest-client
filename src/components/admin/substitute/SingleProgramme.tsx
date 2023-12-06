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
} from "@/gql/graphql";
import { useState } from "react";
import { OperationResult, useMutation, useQuery } from "urql";
import EditProgramme from "./EditProgramme";
import CreateProgramme from "./CreateProgramme";
import ViewProgramme from "./ViewProgramme";
import ExcelUploadProgramme from "./ExcelUploadProgramme";
import { API_KEY } from "@/lib/env";
import { DeleteIcon, EditIcon } from "@/icons/action";

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
}

const OneProgramme = (props: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isViewOpen, setIsViewOpen] = useState<boolean>(false);


  const [{ fetching, data }] = useQuery<
    GetOneProgrammeQuery,
    GetOneProgrammeQueryVariables
  >({
    query: GetOneProgrammeDocument,
    variables: {
      id: props.id,
      api_key: API_KEY
    },
    pause: props.isCreate || props.isEdit,
  });

  const [state, DeleteProgrammeExecute] = useMutation(DeleteProgrammeDocument);


  const HandleDelete = async () => {

    const deletedData: OperationResult<DeleteProgrammeMutation, DeleteProgrammeMutationVariables> = await DeleteProgrammeExecute({
      id: props.id
    });

    if (deletedData.data?.removeProgramme?.__typename) {
      const deleted = props.data.filter((value, index) => {
        return value.id !== props.id;
      })

      props.setData(deleted)
      props.setIsOpen(false)
    }
    console.log(deletedData);

    setModalOpen(false)
  }

  const Programme = data?.programme;

  return (
    // <div>

    //   { props.isEdit ?

    //    (
    //     <EditProgramme
    //       key={1}
    //       setIsEdit={props.setIsEdit}
    //       isEdit={props.isEdit}
    //       name={Programme?.name as string}
    //       id={Programme?.id as number}
    //       data={props.data}
    //       setData={props.setData}
    //       category={props.category}
    //       skill={props.skill}
    //       programeCode={Programme?.programCode as string}
    //       candiateCount={Programme?.candidateCount as number}
    //       groupCount={Programme?.groupCount as number}
    //       duration={Programme?.duration as number}
    //       conceptNote={Programme?.conceptNote as string}
    //       mode={Programme?.mode as unknown as Mode}
    //       model={Programme?.model as Model}
    //       type={Programme?.type as string}
    //       selectedProgramme={Programme as Programme}
    //       categories={props.categories}
    //       skills={props.skills}
    //     />
    //   ) : props.isCreate ? (
    //     <CreateProgramme key={2} data={props.data} setData={props.setData}  categories={props.categories}
    //     skills={props.skills} />
    //   ) 

    //     : props.isExcelUpload ?
    //     (
    //       <ExcelUploadProgramme
    //         data={props.data}
    //         setData={props.setData}
    //         isExcelUpload={props.isExcelUpload}
    //         setIsExcelUpload={props.setIsExcelUpload}
    //         key={1}
    //       />
    //     ) : (
    //       <div>
    //         {fetching ? (
    //           <p> loading... </p>
    //         ) : (
    //           <div className="flex flex-col gap-2 w-full">
    // <p>name</p>
    // <p className="text-blue-400">{Programme?.name}</p>
    // <p>id</p>
    // <p className="text-blue-400">{Programme?.id}</p>
    // <p>programCode</p>
    // <p className="text-blue-400">{Programme?.programCode}</p>
    // <p>candidateCount</p>
    // <p className="text-blue-400">{Programme?.candidateCount}</p>
    // <p>category</p>
    // <p className="text-blue-400">{Programme?.category?.name}</p>
    // <p>conceptNote</p>
    // <p className="text-blue-400">{Programme?.conceptNote}</p>
    // <p>duration</p>
    // <p className="text-blue-400">{Programme?.duration}</p>
    // <p>groupCount</p>
    // <p className="text-blue-400">{Programme?.groupCount}</p>
    // <p>mode</p>
    // <p className="text-blue-400">{Programme?.mode}</p>
    // <p>model</p>
    // <p className="text-blue-400">{Programme?.model}</p>
    // <p>skill</p>
    // <p className="text-blue-400">{Programme?.skill?.name}</p>
    // <p>type</p>
    // <p className="text-blue-400">{Programme?.type}</p>
    // <button
    //               className="bg-blue-500"
    //               onClick={() => {
    //                 props.setIsEdit(true);
    //                 props.setIsCreate(false);
    //               }}
    //             >
    //               Edit
    //             </button>
    //             <button className="bg-red-600" onClick={() => setModalOpen(true)}>
    //               Delete
    //             </button>
    //             <button className="bg-green-600" onClick={() => setIsViewOpen(true)}>
    //               View More
    //             </button>
    //           </div>
    //         )}
    //       </div>
    //     )}

    //   <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} key={3}>
    //     <p>Are you sure Do you want to Delete ?</p>
    //     <button className="bg-red-600" onClick={HandleDelete}>Delete</button>
    //     <button className="bg-blue-500" onClick={() => setModalOpen(false)}>
    //       Cancel
    //     </button>
    //   </Modal>

    //   <ViewProgramme
    //     data={props.data}
    //     setData={props.setData}
    //     modalOpen={isViewOpen} setModalOpen={setIsViewOpen}
    //     selectedProgramme={Programme as Programme}
    //   />
    // </div>
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
        <CreateProgramme key={2} data={props.data} setData={props.setData} categories={props.categories}
          skills={props.skills} />
      )

        : props.isExcelUpload ?
          (
            <ExcelUploadProgramme
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
                      <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">{Programme?.name}</p>
                      <p className="text-base text-[#8D8D8D]">id</p>
                      <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">{Programme?.id}</p>
                      <p className="text-base text-[#8D8D8D]">programCode</p>
                      <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">{Programme?.programCode}</p>
                      <p className="text-base text-[#8D8D8D]">candidateCount</p>
                      <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">{Programme?.candidateCount}</p>
                      <p className="text-base text-[#8D8D8D]">category</p>
                      <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">{Programme?.category?.name}</p>
                      <p className="text-base text-[#8D8D8D]">conceptNote</p>
                      <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">{Programme?.conceptNote}</p>
                      <p className="text-base text-[#8D8D8D]">duration</p>
                      <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">{Programme?.duration}</p>
                      <p className="text-base text-[#8D8D8D]">groupCount</p>
                      <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">{Programme?.groupCount}</p>
                      <p className="text-base text-[#8D8D8D]">mode</p>
                      <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">{Programme?.mode}</p>
                      <p className="text-base text-[#8D8D8D]">model</p>
                      <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">{Programme?.model}</p>
                      <p className="text-base text-[#8D8D8D]">skill</p>
                      <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">{Programme?.skill?.name}</p>
                      <p className="text-base text-[#8D8D8D]">type</p>
                      <p className="bg-[#FFFFFF] rounded-lg px-3 py-3  w-full text-[#3F127A] ">{Programme?.type}</p>




                    </div>






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

export default OneProgramme;
