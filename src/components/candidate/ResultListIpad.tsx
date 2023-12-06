import { CandidateProgramme, Type } from "@/gql/graphql";
import { useState } from "react";

interface Props {
  publishedResults: CandidateProgramme[];
}

export default function ResultListIpad(props: Props) {
  const [allOrIndividualOrGroup, setAllOrIndividualOrGroup] = useState("all");
  const allPublishedResults = props.publishedResults;
  const individualPublishedResults = allPublishedResults.filter(
    (result) => result?.programme?.type === (Type.Single as any)
  );
  const groupPublishedResults = allPublishedResults.filter(
    (result) => result?.programme?.type === (Type.Group as any)
  );

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
        {/* resultslist Ipad */}
        {props.publishedResults?.length > 0 ? (
          allOrIndividualOrGroup === "all" ? (
            allPublishedResults?.map((programme) => (
              <div className="h-14 w-11/12 bg-accent rounded-2xl flex items-center justify-between">
                {/* code */}
                <div className="px-3">
                  <p className="">{programme?.programme?.programCode}</p>
                </div>
                {/* name */}
                <div className="px-3">
                  <p className="">{programme?.programme?.name?.toUpperCase()}</p>
                </div>
                {/* result */}
                <div className="px-3 text-lt flex items-end gap-5">
                  <p>
                    {programme?.position?.name
                      ? programme?.position?.name
                      : `Nil`}
                  </p>
                  <p>
                    {programme?.grade?.name ? programme?.grade?.name : `Nil`}
                  </p>
                  <p className="">{programme?.point}pts</p>
                </div>
              </div>
            ))
          ) : allOrIndividualOrGroup === "individual" ? (
            individualPublishedResults?.map((programme) => (
              <div className="h-14 w-11/12 bg-accent rounded-2xl flex items-center justify-between">
                {/* code */}
                <div className="px-3">
                  <p className="">{programme?.programme?.programCode}</p>
                </div>
                {/* name */}
                <div className="px-3">
                  <p className="">{programme?.programme?.name?.toUpperCase()}</p>
                </div>
                {/* result */}
                <div className="px-3 text-lt flex items-end gap-5">
                  <p>
                    {programme?.position?.name
                      ? programme?.position?.name
                      : `Nil`}
                  </p>
                  <p>
                    {programme?.grade?.name ? programme?.grade?.name : `Nil`}
                  </p>
                  <p className="">{programme?.point}pts</p>
                </div>
              </div>
            ))
          ) : allOrIndividualOrGroup === "group" ? (
            groupPublishedResults?.map((programme) => (
              <div className="h-14 w-11/12 bg-accent rounded-2xl flex items-center justify-between">
                {/* code */}
                <div className="px-3">
                  <p className="">{programme?.programme?.programCode}</p>
                </div>
                {/* name */}
                <div className="px-3">
                  <p className="">{programme?.programme?.name?.toUpperCase()}</p>
                </div>
                {/* result */}
                <div className="px-3 text-lt flex items-end gap-5">
                  <p>
                    {programme?.position?.name
                      ? programme?.position?.name
                      : `Nil`}
                  </p>
                  <p>
                    {programme?.grade?.name ? programme?.grade?.name : `Nil`}
                  </p>
                  <p className="">{programme?.point}pts</p>
                </div>
              </div>
            ))
          ) : null
        ) : (
          <p>No Results To View</p>
        )}
      </div>
    </>
  );
}
