import { Candidate, Type } from "@/gql/graphql";
import { useState } from "react";

interface Props {
  candidate: Candidate;
}

export default function ProgramListPhone(props: Props) {
  const [allOrIndividualOrGroup, setAllOrIndividualOrGroup] = useState("all");
  const allPrograms = props?.candidate?.candidateProgrammes;
  const individualPrograms = props?.candidate?.candidateProgrammes?.filter(
    function (programme) {
      return programme?.programme?.type === (Type.Single as any);
    }
  );
  const groupPrograms = props?.candidate?.candidateProgrammes?.filter(function (
    programme
  ) {
    return programme?.programme?.type === (Type.Group as any);
  });

  const specialButton = {
    div: "bg-primary border h-6 flex items-center rounded-2xl",
    button: "px-3 text-sm text-white font-bold",
  };
  const commonButton = {
    div: "bg-transparent border h-6 flex items-center rounded-2xl",
    button: "px-3 text-sm text-primary",
  };

  return (
    <>
      {/* list & buttons */}
      <div className=" w-full overflow-y-auto">
        {/* buttons */}
        <div className="h-[10%]">
          <hr className="mb-1" />
          <div className="h-full w-full">
            <div className="h-full w-full items-center flex gap-5 justify-center">
              <div
                className={`${
                  allOrIndividualOrGroup === "all"
                    ? specialButton.div
                    : commonButton.div
                }`}
              >
                <button
                  onClick={() => {
                    setAllOrIndividualOrGroup("all");
                  }}
                  className={`${
                    allOrIndividualOrGroup === "all"
                      ? specialButton.button
                      : commonButton.button
                  }`}
                >
                  All
                </button>
              </div>
              <div
                className={`${
                  allOrIndividualOrGroup === "individual"
                    ? specialButton.div
                    : commonButton.div
                }`}
              >
                <button
                  onClick={() => {
                    setAllOrIndividualOrGroup("individual");
                  }}
                  className={`${
                    allOrIndividualOrGroup === "individual"
                      ? specialButton.button
                      : commonButton.button
                  }`}
                >
                  Individual
                </button>
              </div>
              <div
                className={`${
                  allOrIndividualOrGroup === "group"
                    ? specialButton.div
                    : commonButton.div
                }`}
              >
                <button
                  onClick={() => {
                    setAllOrIndividualOrGroup("group");
                  }}
                  className={`${
                    allOrIndividualOrGroup === "group"
                      ? specialButton.button
                      : commonButton.button
                  }`}
                >
                  Group
                </button>
              </div>
            </div>
          </div>
          <hr className="mt-1" />
        </div>
        {/* list */}
        <div className="h-[89%] overflow-y-auto w-full flex flex-col items-center gap-2 pt-2">
          {/* Programs */}
          {allOrIndividualOrGroup === "all"
          ? allPrograms?.map((programme) => (
              <div className="h-10 min-h-[2.5rem] w-[90%] bg-accent rounded-2xl flex justify-between items-center px-3">
              <p className="text-lt">{programme?.programme?.programCode}</p>
              <p className="text-lt">{programme?.programme?.name?.toUpperCase()}</p>
              <div className="flex flex-col items-end">
                <p className="text-tn">-</p>
                <p className="text-tn">-</p>
              </div>
            </div>
            ))
          : allOrIndividualOrGroup === "individual"
          ? individualPrograms?.map((programme) => (
              <div className="h-10 min-h-[2.5rem] w-[90%] bg-accent rounded-2xl flex justify-between items-center px-3">
              <p className="text-lt">{programme?.programme?.programCode}</p>
              <p className="text-lt">{programme?.programme?.name?.toUpperCase()}</p>
              <div className="flex flex-col items-end">
                <p className="text-tn">-</p>
                <p className="text-tn">-</p>
              </div>
            </div>
            ))
          : allOrIndividualOrGroup === "group"
          ? groupPrograms?.map((programme) => (
              <div className="h-10 min-h-[2.5rem] w-[90%] bg-accent rounded-2xl flex justify-between items-center px-3">
              <p className="text-lt">{programme?.programme?.programCode}</p>
              <p className="text-lt">{programme?.programme?.name?.toUpperCase()}</p>
              <div className="flex flex-col items-end">
                <p className="text-tn">-</p>
                <p className="text-tn">-</p>
              </div>
            </div>
            ))
          : null}
        </div>
      </div>
    </>
  );
}
