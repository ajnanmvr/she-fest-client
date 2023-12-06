import { CandidateProgramme, Type } from "@/gql/graphql";
import { useState } from "react";

interface Props {
  publishedResults: CandidateProgramme[];
}

export default function ResultListPhone(props: Props) {
  const [allOrIndividualOrGroup, setAllOrIndividualOrGroup] = useState("all");
  const allPublishedResults = props.publishedResults;
  const individualPublishedResults = allPublishedResults.filter(
    (result) => result?.programme?.type === (Type.Single as any)
  );
  const groupPublishedResults = allPublishedResults.filter(
    (result) => result?.programme?.type === (Type.Group as any)
  );

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
      <div className="h-59/100 w-full overflow-y-auto">
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
        <div className="h-[80%] w-full flex flex-col items-center gap-2 pt-2">
          {/* resultslist Ipad */}
          {props.publishedResults?.length > 0 ? (
            allOrIndividualOrGroup === "all" ? (
              allPublishedResults?.map((programme) => (
                <div className="h-10 w-[90%] bg-accent rounded-2xl flex justify-between items-center px-3">
                  <p className="text-lt">{programme?.programme?.programCode}</p>
                  <p className="text-lt">{programme?.programme?.name}</p>
                  <div className="flex items-end gap-2">
                    <p className="text-tn">
                      {programme?.position?.name
                        ? programme?.position?.name
                        : `Nil`}
                    </p>
                    <p className="text-tn">
                      {programme?.grade?.name ? programme?.grade?.name : `Nil`}
                    </p>
                    <p className="text-tn">{programme?.point}pts</p>
                  </div>
                </div>
              ))
            ) : allOrIndividualOrGroup === "individual" ? (
              individualPublishedResults?.map((programme) => (
                <div className="h-10 w-[90%] bg-accent rounded-2xl flex justify-between items-center px-3">
                  <p className="text-lt">{programme?.programme?.programCode}</p>
                  <p className="text-lt">{programme?.programme?.name}</p>
                  <div className="flex items-end gap-2">
                    <p className="text-tn">
                      {programme?.position?.name
                        ? programme?.position?.name
                        : `Nil`}
                    </p>
                    <p className="text-tn">
                      {programme?.grade?.name ? programme?.grade?.name : `Nil`}
                    </p>
                    <p className="text-tn">{programme?.point}pts</p>
                  </div>
                </div>
              ))
            ) : allOrIndividualOrGroup === "group" ? (
              groupPublishedResults?.map((programme) => (
                <div className="h-10 w-[90%] bg-accent rounded-2xl flex justify-between items-center px-3">
                  <p className="text-lt">{programme?.programme?.programCode}</p>
                  <p className="text-lt">{programme?.programme?.name}</p>
                  <div className="flex items-end gap-2">
                    <p className="text-tn">
                      {programme?.position?.name
                        ? programme?.position?.name
                        : `Nil`}
                    </p>
                    <p className="text-tn">
                      {programme?.grade?.name ? programme?.grade?.name : `Nil`}
                    </p>
                    <p className="text-tn">{programme?.point}pts</p>
                  </div>
                </div>
              ))
            ) : null
          ) : (
            <p>No Results To View</p>
          )}
        </div>
      </div>
    </>
  );
}
