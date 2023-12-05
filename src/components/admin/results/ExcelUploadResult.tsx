import {
  AddManyProgrammesDocument,
  AddManyProgrammesMutation,
  AddManyProgrammesMutationVariables,
  CreateProgrammeInput,
  Mode,
  Programme,
  Type,
} from "@/gql/graphql";
import React from "react";
import { OperationResult, useMutation } from "urql";
import * as XLSX from "xlsx";

interface Props {
  isExcelUpload: boolean;
  setIsExcelUpload: React.Dispatch<React.SetStateAction<boolean>>;
  data: Programme[];
  setData: React.Dispatch<React.SetStateAction<Programme[]>>;
}

const ExcelUploadResult = (props: Props) => {

  const [file, setFile] = React.useState<any>(null);
  const [finalizedData, setFinalizedData] = React.useState<CreateProgrammeInput[]>([]);
  const [error , setError] = React.useState<string>("");

  const [state, UploadManyProgrammeExicute] = useMutation(
    AddManyProgrammesDocument
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
    if (file) {
      if (finalizedData.length > 0 ) {
        console.log("file data");
        const datas : OperationResult<
          AddManyProgrammesMutation,
          AddManyProgrammesMutationVariables
        > = await UploadManyProgrammeExicute({
          inputs: finalizedData as CreateProgrammeInput[],
        });

        if (datas.data?.createManyProgrammes) {
          console.log(datas.data?.createManyProgrammes);
            
          alert("Programme Added");
          // to change finalised data to programme type set category and skill to {name : value}

         const finalData : Programme[] = finalizedData.map((value , index) => {
            return {
              ...value as unknown as Programme,
              id : datas.data?.createManyProgrammes?.[index].id as number,
              category: {
                name : value.category as string
              },
              skill: {
                name : value.skill as string
              }
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
      alert("Invalid File Type");
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
        "name",
        "category",
        "skill",
        "mode",
        "model",
        "programCode",
        "candidateCount",
        "groupCount",
        "duration",
        "conceptNote",
        "type",
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
        alert("Invalid File Content");
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
    <div>
      <p>Upload you Excel File</p>

      {
        error && <p className="text-red-500">{error}</p>
      }

      <br />
      <p>Download sample File</p>
      <button
        className="
        bg-blue-500
        text-white
        rounded-md
        p-2"
      >
        Download
      </button>
      <br />

      {/* input field of well designed for upload excel file only */}
      <form 
      onSubmit={(e) => {
        e.preventDefault();
        handleFileUpload();
      }
      } 
      >
      <input
        className="
        border-2 border-gray-300
        rounded-md
        p-2
        w-full
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400
        focus:border-transparent
        "
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


    </div>
  );
};

export default ExcelUploadResult;
