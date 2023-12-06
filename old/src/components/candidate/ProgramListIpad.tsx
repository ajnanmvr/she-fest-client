import { Candidate, Type } from "@/gql/graphql";
import { useState } from "react";

interface Props {
  candidate: Candidate;
}

export default function ProgramListIpad(props: Props) {
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
    div: "bg-primary border h-3/5 flex items-center rounded-2xl",
    button: "px-3 text-sm text-white font-bold",
  };
  const commonButton = {
    div: "bg-transparent border h-3/5 flex items-center rounded-2xl",
    button: "px-3 text-sm text-primary",
  };
  return (
    <>
      {/* buttons */}
      <div className="h-10 w-full items-center flex px-5 gap-5">
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
      <hr className="border" />
      {/* lists */}
      <div className="h-full w-full overflow-y-auto flex flex-col items-center py-3 gap-5">
        {/* programslist Ipad */}
        {allOrIndividualOrGroup === "all"
          ? allPrograms?.map((programme) => (
              <div className="h-14 w-11/12 bg-accent rounded-2xl flex items-center justify-between">
                {/* code */}
                <div className="px-3">
                  <p className="">{programme?.programme?.programCode}</p>
                </div>
                {/* name */}
                <div className="px-3">
                  <p className="">{programme?.programme?.name?.toUpperCase()}</p>
                </div>
                {/* time */}
                <div className="px-3 text-lt flex flex-col items-end">
                  <p className="">-</p>
                  <p className="">-</p>
                </div>
              </div>
            ))
          : allOrIndividualOrGroup === "individual"
          ? individualPrograms?.map((programme) => (
              <div className="h-14 w-11/12 bg-accent rounded-2xl flex items-center justify-between">
                {/* code */}
                <div className="px-3">
                  <p className="">{programme?.programme?.programCode}</p>
                </div>
                {/* name */}
                <div className="px-3">
                  <p className="">{programme?.programme?.name?.toUpperCase()}</p>
                </div>
                {/* time */}
                <div className="px-3 text-lt flex flex-col items-end">
                  <p className="">-</p>
                  <p className="">-</p>
                </div>
              </div>
            ))
          : allOrIndividualOrGroup === "group"
          ? groupPrograms?.map((programme) => (
              <div className="h-14 w-11/12 bg-accent rounded-2xl flex items-center justify-between">
                {/* code */}
                <div className="px-3">
                  <p className="">{programme?.programme?.programCode}</p>
                </div>
                {/* name */}
                <div className="px-3">
                  <p className="">{programme?.programme?.name?.toUpperCase()}</p>
                </div>
                {/* time */}
                <div className="px-3 text-lt flex flex-col items-end">
                  <p className="">-</p>
                  <p className="">-</p>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}
