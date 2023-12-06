import { CandidateProgramme, Programme } from "@/gql/graphql";
import { useEffect, useState } from "react";

interface Props {
  programme: Programme;
}

export default function TabResults(props: Props) {
  const { programme } = props;

  const [resultedCandidates, setResultedCandidates] = useState<
    CandidateProgramme[]
  >([]);

  useEffect(() => {
    let candidateResults: CandidateProgramme[] = [];
    programme?.candidateProgramme?.map((candidate) => {
      console.log(candidate);
      (candidate?.position !== null || candidate?.grade !== null) &&
        candidateResults.push(candidate);
    });
    setResultedCandidates(candidateResults);
    console.log(candidateResults);
  }, []);

  const active = {
    div: "rounded-xl text-sm h-6 bg-primary border border-primary flex items-center",
    button: "px-2 text-white text-sm",
  };
  const inactive = {
    div: "rounded-xl text-sm h-6 border border-primary flex items-center",
    button: "px-2 text-primary text-sm",
  };

  const [allOrSingleTeam, setAllOrSingleTeam] = useState("all");

  const allCandidatesResult = resultedCandidates?.sort((a, b) => {
    return Number(b.point) - Number(a.point);
  });
  const chronicleCandidatesResult = allCandidatesResult?.filter((candidate) => {
    return candidate?.candidate?.team?.name === "Chronicle";
  });
  const gazetteCandidatesResult = allCandidatesResult?.filter((candidate) => {
    return candidate?.candidate?.team?.name === "Gazette";
  });
  const heraldCandidatesResult = allCandidatesResult?.filter((candidate) => {
    return candidate?.candidate?.team?.name === "Herald";
  });
  const tribuneCandidatesResult = allCandidatesResult?.filter((candidate) => {
    return candidate?.candidate?.team?.name === "Tribune";
  });

  return (
    <>
      <div className="flex h-10 items-center px-10 gap-3">
        <div
          className={`${allOrSingleTeam === "all" ? active.div : inactive.div}`}
        >
          <button
            onClick={() => setAllOrSingleTeam("all")}
            className={`${
              allOrSingleTeam === "all" ? active.button : inactive.button
            }`}
          >
            All
          </button>
        </div>
        <div
          className={`${
            allOrSingleTeam === "chronicle" ? active.div : inactive.div
          }`}
        >
          <button
            onClick={() => setAllOrSingleTeam("chronicle")}
            className={`${
              allOrSingleTeam === "chronicle" ? active.button : inactive.button
            }`}
          >
            Chronicle
          </button>
        </div>
        <div
          className={`${
            allOrSingleTeam === "tribune" ? active.div : inactive.div
          }`}
        >
          <button
            onClick={() => setAllOrSingleTeam("tribune")}
            className={`${
              allOrSingleTeam === "tribune" ? active.button : inactive.button
            }`}
          >
            Tribune
          </button>
        </div>
        <div
          className={`${
            allOrSingleTeam === "gazette" ? active.div : inactive.div
          }`}
        >
          <button
            onClick={() => setAllOrSingleTeam("gazette")}
            className={`${
              allOrSingleTeam === "gazette" ? active.button : inactive.button
            }`}
          >
            Gazette
          </button>
        </div>
        <div
          className={`${
            allOrSingleTeam === "herald" ? active.div : inactive.div
          }`}
        >
          <button
            onClick={() => setAllOrSingleTeam("herald")}
            className={`${
              allOrSingleTeam === "herald" ? active.button : inactive.button
            }`}
          >
            Herald
          </button>
        </div>
      </div>
      <hr className="border" />
      {/* table */}
      <div className="flex flex-col h-full items-center pt-5 mt-5 gap-5 overflow-y-auto">
        {resultedCandidates.length > 0 ? (
          allOrSingleTeam === "all" ? (
            allCandidatesResult?.map((candidate) => (
              <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                <div className="flex h-8 w-1/2 text-sm items-center pl-2 gap-3 justify-start">
                  <p>
                    {candidate?.position?.name
                      ? candidate?.position?.name
                      : "Nil"}
                  </p>
                  <p>{candidate?.programme?.programCode}</p>
                  <p>{candidate?.candidate?.name}</p>
                </div>
                <div className="flex h-8 w-1/2 text-sm items-center pr-2 gap-3 justify-end">
                  <p>{candidate?.candidate?.team?.name}</p>
                  <p>
                    {candidate?.grade?.name ? candidate?.grade?.name : `Nil`}
                  </p>
                  <p>{candidate?.point}pts</p>
                </div>
              </div>
            ))
          ) : allOrSingleTeam === "chronicle" ? (
            chronicleCandidatesResult?.map((candidate) => (
              <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                <div className="flex h-8 w-1/2 text-sm items-center pl-2 gap-3 justify-start">
                  <p>
                    {candidate?.position?.name
                      ? candidate?.position?.name
                      : "Nil"}
                  </p>
                  <p>{candidate?.programme?.programCode}</p>
                  <p>{candidate?.candidate?.name}</p>
                </div>
                <div className="flex h-8 w-1/2 text-sm items-center pr-2 gap-3 justify-end">
                  <p>{candidate?.candidate?.team?.name}</p>
                  <p>
                    {candidate?.grade?.name ? candidate?.grade?.name : `Nil`}
                  </p>
                  <p>{candidate?.point}pts</p>
                </div>
              </div>
            ))
          ) : allOrSingleTeam === "gazette" ? (
            gazetteCandidatesResult?.map((candidate) => (
              <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                <div className="flex h-8 w-1/2 text-sm items-center pl-2 gap-3 justify-start">
                  <p>
                    {candidate?.position?.name
                      ? candidate?.position?.name
                      : "Nil"}
                  </p>
                  <p>{candidate?.programme?.programCode}</p>
                  <p>{candidate?.candidate?.name}</p>
                </div>
                <div className="flex h-8 w-1/2 text-sm items-center pr-2 gap-3 justify-end">
                  <p>{candidate?.candidate?.team?.name}</p>
                  <p>
                    {candidate?.grade?.name ? candidate?.grade?.name : `Nil`}
                  </p>
                  <p>{candidate?.point}pts</p>
                </div>
              </div>
            ))
          ) : allOrSingleTeam === "herald" ? (
            heraldCandidatesResult?.map((candidate) => (
              <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                <div className="flex h-8 w-1/2 text-sm items-center pl-2 gap-3 justify-start">
                  <p>
                    {candidate?.position?.name
                      ? candidate?.position?.name
                      : "Nil"}
                  </p>
                  <p>{candidate?.programme?.programCode}</p>
                  <p>{candidate?.candidate?.name}</p>
                </div>
                <div className="flex h-8 w-1/2 text-sm items-center pr-2 gap-3 justify-end">
                  <p>{candidate?.candidate?.team?.name}</p>
                  <p>
                    {candidate?.grade?.name ? candidate?.grade?.name : `Nil`}
                  </p>
                  <p>{candidate?.point}pts</p>
                </div>
              </div>
            ))
          ) : allOrSingleTeam === "tribune" ? (
            tribuneCandidatesResult?.map((candidate) => (
              <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                <div className="flex h-8 w-1/2 text-sm items-center pl-2 gap-3 justify-start">
                  <p>
                    {candidate?.position?.name
                      ? candidate?.position?.name
                      : "Nil"}
                  </p>
                  <p>{candidate?.programme?.programCode}</p>
                  <p>{candidate?.candidate?.name}</p>
                </div>
                <div className="flex h-8 w-1/2 text-sm items-center pr-2 gap-3 justify-end">
                  <p>{candidate?.candidate?.team?.name}</p>
                  <p>
                    {candidate?.grade?.name ? candidate?.grade?.name : `Nil`}
                  </p>
                  <p>{candidate?.point}pts</p>
                </div>
              </div>
            ))
          ) : null
        ) : (
          <p>No Results Found</p>
        )}
      </div>
    </>
  );
}
