import Alert from "@/components/Alert";
import {
 UploadManyScheduleDocument,
 UploadManyScheduleMutation,
 UploadManyScheduleMutationVariables,
  Programme,
  CreateSchedule,
} from "@/gql/graphql";
import React from "react";
import { toast } from "react-toastify";
import { OperationResult, useMutation } from "urql";
import * as XLSX from "xlsx";

interface Props {
  isExcelUpload: boolean;
  setIsExcelUpload: React.Dispatch<React.SetStateAction<boolean>>;
  data: Programme[];
  setData: React.Dispatch<React.SetStateAction<Programme[]>>;
}

const CreateSchedule = (props: Props) => {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<any>(null);
  const [finalizedData, setFinalizedData] = React.useState<CreateSchedule[]>([]);
  const [error , setError] = React.useState<string>("");

  const [state, UploadManyProgrammeExicute] = useMutation(
   UploadManyScheduleDocument
  );

  function handleExcelChange(e: any) {
    const file = e.target.files[0];
    if (file) {
      if (verifyFile(file)) {
        console.log(file);
      }

      // verify file content
      verifyFileContent(file);
    }
  }

  // function to handle file upload
  async function handleFileUpload() {
    // const file = e.target.files[0];
    console.log(finalizedData);
    
    if (file) {
      if (finalizedData.length > 0 ) {
        console.log("file data");
        const datas : OperationResult<
         UploadManyScheduleMutation,
         UploadManyScheduleMutationVariables
        > = await UploadManyProgrammeExicute({
          inputs: finalizedData as CreateSchedule[],
        });

        if (datas.data?.setManySchedule) {
          console.log(datas.data?.setManySchedule);
            
          toast.success("Schedule Added");
          // to change finalised data to programme type set category and skill to {name : value}

         const finalData : Programme[] = finalizedData.map((value , index) => {
            return {
              ...value as unknown as Programme,
              data : datas.data?.setManySchedule?.[index].date as number,
            }
          }
          )

          console.log(finalData);
          props.setData([
            ...props.data as Programme[],
            ...finalData  as unknown as Programme[],
          ]);
        }else{
          console.log(datas.error);
          
          setError("Something went wrong")
          setTimeout(() => {
            setError("")
          }
          , 3000)
        }
      }else{
        setError("Invalid File Content")
        setTimeout(() => {
          setError("")
        }
        , 3000)
      }
    }else{
      setError("File not selected")
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }

  function verifyFile(file: any) {
    // only accept excel and csv file types
    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    if (validTypes.indexOf(file.type) === -1) {
     toast.error("Invalid File Type");
      return false;
    }

    return true;
  }

  function verifyFileContent(file: any) {
    console.log(file);

    let fileData: any;
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
       fileData = XLSX.utils.sheet_to_json(ws);

      // checking the file data

      // json must include these keys
      const requiredKeys = [
        "code",
        "date",
        "venue"
      ];

      // checking if the file data has all the required keys
      const hasAllKeys = requiredKeys.every((key) => {
        // check every line of the file data
        return fileData.every((line: any) => {
          // check if the line has the key
          return Object.keys(line).includes(key);
        });
      });

      // if the file have more keys than the required keys then it is invalid
      const hasMoreKeys = fileData.some((line: any) => {
        return Object.keys(line).length > requiredKeys.length;
      });

      if (!hasAllKeys || hasMoreKeys) {
        console.log(fileData);
        toast.error("Invalid File Content");
        return null;
      } else {
     
        
        setFinalizedData(fileData);
        console.log("setting");
        return fileData;
      }
    };

   reader.readAsBinaryString(file);

   return fileData;

  }

  return (
    <div className="flex flex-col  gap-2">
      {/* <p className="text-lg text-[#3F127A]">Upload you Excel File</p> */}

      {
        error && <p className="text-red-500">{error}</p>
      }
   
      
      <p className="text-lg text-[#3F127A]">Download sample File</p>
      <button
        className="
        bg-blue-500
        text-white
        rounded-md
        p-2"
      >
        Download
      </button>
     

      {/* input field of well designed for upload excel file only */}
      <form 
      className="h-full w-full flex flex-col  justify-between gap-3 mt-5 "
      onSubmit={(e) => {
        e.preventDefault();
        handleFileUpload();
      }
      } 
      >
      <p className="text-lg text-[#3F127A]">Upload Your Schedule  File</p>
      <input
        className="file-input  file-input-bordered file-input-sm w-full max-w-xs"
        type="file"
        accept=".xlsx"
        title="Upload Excel File"
        placeholder="Upload Excel File"
        onChange={
          (e) => {
            const file = e.target.files ?  e.target.files[0] : null;
            setFile(file)
            handleExcelChange(e)
          }
        }
      />

      <input 
      type="submit" value="submit
      " className="bg-blue-500 text-white rounded-md p-2 cursor-pointer "
        />

      </form>
      <Alert  isError={isError} setError={setIsError}  isSuccess={isSuccess}>
      </Alert>

    </div>
  );
};

export default CreateSchedule;
