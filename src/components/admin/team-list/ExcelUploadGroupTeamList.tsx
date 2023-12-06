import {
  AddManyCandidateProgrammesDocument,
  AddManyCandidateProgrammesMutation,
  AddManyCandidateProgrammesMutationVariables,
  Programme,
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

const ExcelUploadGroupTeamList = (props: Props) => {
  const [file, setFile] = React.useState<any>(null);
  const [finalizedData, setFinalizedData] = React.useState<any[]>([]);
  const [error, setError] = React.useState<string>("");

  const [state, UploadManyCandidateProgrammeExecute] = useMutation(
    AddManyCandidateProgrammesDocument
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
      const data = await transformData(finalizedData);
      // console.log(finalizedData);
      console.log(data);
    } else {
      setError("File not selected");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  // Function to validate a candidate string

  function isValidCandidate(candidate: string) {
    return /^[A-Za-z]{1}\d{3}$/.test(candidate);
  }

  async function transformData(excelData: any) {
    const transformedData: any[] = [];

    excelData.forEach((row: any) => {
      console.log(row);

      const { p, ...candidates } = row;

      // Loop through candidate properties dynamically
      for (let i = 1; i <= 3; i++) {
        var allCandidates = [];

        for (let j = 1; j <= 20; j++) {
          const candidateKey = `g${i}c${j}`;
          const candidateValue = candidates[candidateKey];

          console.log(candidateValue);
          console.log(isValidCandidate(candidateValue));

          if (candidateValue) {
            console.log("====================================");
            console.log(`valid candidate`);
            console.log("====================================");
            allCandidates.push(`Z${candidateValue}`);
          }
        }

        if (allCandidates[0]) {
          transformedData.push({
            programme_code: p,
            chestNo: allCandidates[0],
            candidatesOfGroup: allCandidates,
          });
        }
        console.log(allCandidates);
      }
    });

    await uploadCandidateProgrammes(transformedData);

    return transformedData;
  }

  function chunkArray(array: any[], chunkSize: number) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  async function uploadCandidateProgrammes(data: any[]) {
    let errors: any[] = [];
    let allData: any[] = [];

     
    if(data.length <= 0) {
      errors.push('No valid candidates were found')
    }
    // upload by every 50 data

    const chunkedData = chunkArray(data, 50);

    for (let index = 0; index < chunkedData.length; index++) {
      const chunk = chunkedData[index];
      console.log(chunk);
      const datas: OperationResult<
        AddManyCandidateProgrammesMutation,
        AddManyCandidateProgrammesMutationVariables
      > = await UploadManyCandidateProgrammeExecute({
        inputs: chunk,
      });

      if (!datas.data?.createManyCandidateProgramme) {
        errors.push("Error on some operation");
      } else {
        if (
          (datas.data?.createManyCandidateProgramme.errors?.length as number) >
          0
        ) {
          errors.push(datas.data?.createManyCandidateProgramme?.errors);
        } else {
          allData.push(datas);
        }
      }
    }

    if (errors.length > 0) {
      console.log(errors);
      console.log(allData);

      toast.error("Error on some operation");
    } else {
      console.log(allData);

      toast.success("Candidate Programmes Added");
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
      const wsName = wb.SheetNames[0];
      const ws = wb.Sheets[wsName];
      /* Convert array of arrays */
      fileData = XLSX.utils.sheet_to_json(ws);

      // checking the file data

      // json must include these keys
      const requiredKeys = ["p"];

      // checking if the file data has all the required keys
      const hasAllKeys = requiredKeys.every((key) => {
        // check every line of the file data
        return fileData.every((line: any) => {
          // check if the line has the key
          return Object.keys(line).includes(key);
        });
      });

      if (!hasAllKeys) {
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
    <div>
      <p>Upload you group Excel File</p>

      {error && <p className="text-red-500">{error}</p>}

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
        onSubmit={async (e) => {
          e.preventDefault();
          await handleFileUpload();
        }}
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
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            setFile(file);
            handleExcelChange(e);
          }}
        />

        <input
          type="submit"
          value="submit
        "
          className="bg-blue-500 text-white rounded-md p-2 cursor-pointer "
        />
      </form>
    </div>
  );
};

export default ExcelUploadGroupTeamList;
