import {
    AddManyCandidatesDocument,
    AddManyCandidatesMutation,
    AddManyCandidatesMutationVariables,
    CreateCandidateInput,
    Mode,
    Candidate,
    Type,
  } from "@/gql/graphql";
  import React from "react";
  import { OperationResult, useMutation } from "urql";
  import * as XLSX from "xlsx";
  
  interface Props {
    isExcelUpload: boolean;
    setIsExcelUpload: React.Dispatch<React.SetStateAction<boolean>>;
    data: Candidate[];
    setData: React.Dispatch<React.SetStateAction<Candidate[]>>;
  }
  
  const ExcelUploadCandidate = (props : Props) => {
  
    const [finalizedData, setFinalizedData] = React.useState<CreateCandidateInput[]>([]);
  
    const [state, UploadManyCandidateExicute] = useMutation(
      AddManyCandidatesDocument
    );
  
    // function to handle file upload
    async function handleFileUpload(e: any) {
      const file = e.target.files[0];
      if (file) {
        if (verifyFile(file)) {
          console.log(file);
        }
  
        // verify file content
        const fIleData = verifyFileContent(file);
  
        console.log(fIleData);
        
  
        if (finalizedData.length > 0 ) {
          console.log("file data");
          const datas : OperationResult<
            AddManyCandidatesMutation,
            AddManyCandidatesMutationVariables
          > = await UploadManyCandidateExicute({
            inputs: finalizedData as CreateCandidateInput[],
          });
  
          if (datas.data?.createManyCandidates) {
            console.log(datas.data?.createManyCandidates);
              
            // alert("Candidate Added");
            // props.setData([
            //   ...props.data,
            //   finalizedData as unknown as Candidate,
            // ]);
          }
        }
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
          console.log("setting");
          
          setFinalizedData(fileData);
          return fileData;
        }
      };
  
     reader.readAsBinaryString(file);
  
     return fileData;
  
    }
  
    return (
      <div>
        <p>Upload you Excel File</p>
  
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
          onChange={handleFileUpload}
        />
      </div>
    );
  };
  
  export default ExcelUploadCandidate;
  