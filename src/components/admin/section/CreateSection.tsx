"use client";
import Alert from "@/components/Alert";
import {
  AddSectionDocument,
  AddSectionMutation,
  AddSectionMutationVariables,
  Section,
} from "@/gql/graphql";
import { addSectionSchema } from "@/types/section";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { OperationResult, useMutation } from "urql";

interface Props {
  data: Section[];
  setData: React.Dispatch<React.SetStateAction<Section[]>>;
  isOpen: boolean;
}

const CreateSection = (props: Props) => {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [state, CreateSectionExecute] = useMutation(AddSectionDocument);

  const HandleSubmit = async (data: any) => {
    const datas: OperationResult<
      AddSectionMutation,
      AddSectionMutationVariables
    > = await CreateSectionExecute({
      name: data.name,
    });

    if (datas.data?.createSection) {
      toast.success("Section Added");
      props.setData([...props.data, datas.data?.createSection as Section]);
    } else{
      datas.error?.message.split("]")[1].startsWith(" target") ? toast.error("server error") : toast.error(datas.error?.message.split("]")[1]);
    }
  };

  return (
    <div className="h-full w-full">
      <form
        className="h-full w-full flex flex-col items-center justify-between "
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit({ name });
        }}
      >
        <div className="mt-4">
          <p>Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
          />
        </div>
        <div className="w-full mt-4 flex items-center justify-between">
          <button
            type="submit"
            className="bg-secondary w-1/2 border-2 text-white px-3 flex-1 py-2 border-secondary rounded-xl font-bold"
          >
            {state.fetching ? "Loading..." : "Submit"}
          </button>

          <div
            className="w-1/2 flex items-center justify-center tooltip"
            data-tip="Back"
          ></div>
        </div>
      </form>
      <Alert isError={isError} setError={setIsError} isSuccess={isSuccess}>

      </Alert>
    </div>
  );
};

export default CreateSection;
