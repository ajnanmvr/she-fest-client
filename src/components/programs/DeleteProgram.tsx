import {
    Programme,
    DeleteProgrammeDocument,
    DeleteProgrammeMutation,
    DeleteProgrammeMutationVariables,
  } from '@/gql/graphql';
  import React from 'react';
  import { OperationResult, useMutation } from 'urql';
  interface Props {
    isDelete: boolean;
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
    programmes: Programme[];
    setProgrammes: React.Dispatch<React.SetStateAction<Programme[]>>;
    selected: Programme | null;
  }
  
  function DeleteProgramme(props: Props) {
    const [state, DeleteProgrammeExecute] = useMutation(DeleteProgrammeDocument);
  
    const HandleDelete = async () => {
      const deletedData: OperationResult<
        DeleteProgrammeMutation,
        DeleteProgrammeMutationVariables
      > = await DeleteProgrammeExecute({
        id: props.selected?.id as number,
      });
      if (deletedData.data?.removeProgramme?.__typename) {
        const deleted = props.programmes.filter((value, index) => {
          return value.id !== props.selected?.id;
        });
  
        props.setProgrammes(deleted);
        props.setIsDelete(false);
      }
    };
  
    return (
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${
          props.isDelete ? 'block' : 'hidden'
        } `}
      >
        <div className="p-5 bg-white rounded-xl gap-4">
        <p className='text-center text-lg'>
          Are you sure, do you want to delete candidate{' '}
          <span className="font-bold">{props.selected?.name}</span>?
        </p>
        <div className='w-full flex justify-center gap-2 mt-2'>
          <button
            className="bg-brown text-white py-1 px-2 rounded-md text-base"
            onClick={() => props.setIsDelete(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white py-1 px-2 rounded-md text-base"
            onClick={() => HandleDelete()}
          >
            Delete
          </button>
        </div>
        </div>
      </div>
    );
  }
  
  export default DeleteProgramme;
  