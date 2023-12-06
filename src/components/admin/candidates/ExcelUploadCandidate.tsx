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
import { toast } from "react-toastify";
import { OperationResult, useMutation } from "urql";
import * as XLSX from "xlsx";

interface Props {
  isExcelUpload: boolean;
  setIsExcelUpload: React.Dispatch<React.SetStateAction<boolean>>;
  data: Candidate[];
  setData: React.Dispatch<React.SetStateAction<Candidate[]>>;
}

const ExcelUploadCandidate = (props: Props) => {
  const [finalizedData, setFinalizedData] = React.useState<
    CreateCandidateInput[]
  >([]);
  const [file, setFile] = React.useState<any>(null);
  const [error, setError] = React.useState<string>("");

  const [state, UploadManyCandidateExicute] = useMutation(
    AddManyCandidatesDocument
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
      if (finalizedData.length > 0) {
        console.log("file data");
        console.log(finalizedData);

        const datas: OperationResult<
          AddManyCandidatesMutation,
          AddManyCandidatesMutationVariables
        > = await UploadManyCandidateExicute({
          inputs: finalizedData as CreateCandidateInput[],
        });

        if (datas.data?.createManyCandidates) {
          console.log(datas.data?.createManyCandidates);

          toast.success("Candidates Added");
          // to change finalised data to Candidate type set category and skill to {name : value}

          const finalData: Candidate[] = finalizedData.map((value, index) => {
            return {
              ...(value as unknown as Candidate),
              id: datas.data?.createManyCandidates?.[index].id as number,
              category: {
                name: value.category as string,
              },
              team: {
                name: value.team as string,
              },
              class: value.class + "",
            };
          });

          console.log(finalData);
          props.setData([
            ...(props.data as Candidate[]),
            ...(finalData as unknown as Candidate[]),
          ]);
        } else {
          console.log(datas.error);

          setError("Something went wrong");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      } else {
        setError("Invalid File Content");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } else {
      setError("File not selected");
      setTimeout(() => {
        setError("");
      }, 3000);
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
      setFile(null);
      return false;
    }

    setFile(file);
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
        "chestNO",
        "class",
        "category",
        "adno",
        "team",
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
        line.class = line.class + "";
        return Object.keys(line).length > requiredKeys.length;
      });

      if (!hasAllKeys || hasMoreKeys) {
        console.log(fileData);
        toast.error("Invalid File Content");  
        setFile(null);
        return null;
      } else {
        console.log("setting");

        setFinalizedData(fileData);
        return fileData;
      }
    };

    reader.readAsBinaryString(file);

    setFinalizedData(fileData);
    return fileData;
  }

  return (
    <div>
      <p>Upload you Excel File</p>

      <br />

      {error && <p className="text-red-500">{error}</p>}

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
        onChange={handleExcelChange}
      />

      <button
        className=" 
          bg-blue-500
          text-white
          rounded-md
          p-2
          mt-2"
        onClick={handleFileUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default ExcelUploadCandidate;
