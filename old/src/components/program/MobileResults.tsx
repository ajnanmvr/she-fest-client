import { CandidateProgramme, Programme } from "@/gql/graphql";
import { useEffect, useState } from "react";

interface Props {
  programme: Programme;
}

export default function MobileResults(props: Props) {
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
    button:
      "w-auto bg-[#3D127A] text-white text-xs bigphone:text-base font-semibold rounded-3xl px-1 bigphone:px-2 h-6 bigphone:h-8",
  };
  const inactive = {
    button:
      "w-auto bg-white border border-[#3D127A] text-[#3D127A] text-xs bigphone:text-base font-semibold rounded-3xl px-1 bigphone:px-2 h-6 bigphone:h-8",
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
      <div className="flex justify-center gap-1 mt-2">
        <button
          onClick={() => setAllOrSingleTeam("all")}
          className={`${
            allOrSingleTeam === "all" ? active.button : inactive.button
          }`}
        >
          All
        </button>
        <button
          onClick={() => setAllOrSingleTeam("chronicle")}
          className={`${
            allOrSingleTeam === "chronicle" ? active.button : inactive.button
          }`}
        >
          Chronicle
        </button>
        <button
          onClick={() => setAllOrSingleTeam("tribune")}
          className={`${
            allOrSingleTeam === "tribune" ? active.button : inactive.button
          }`}
        >
          Tribune
        </button>
        <button
          onClick={() => setAllOrSingleTeam("gazette")}
          className={`${
            allOrSingleTeam === "gazette" ? active.button : inactive.button
          }`}
        >
          Gazette
        </button>
        <button
          onClick={() => setAllOrSingleTeam("herald")}
          className={`${
            allOrSingleTeam === "herald" ? active.button : inactive.button
          }`}
        >
          Herald
        </button>
      </div>
      <hr className="border mt-2" />
      {/* table */}
      <div className="flex flex-col h-5/6 pt-2">
        <div className="flex flex-col gap-2 px-5 h-[70%] overflow-y-auto">
          {resultedCandidates.length > 0 ? (
            allOrSingleTeam === "all" ? (
              allCandidatesResult?.map((candidate) => (
                <div className="w-full bg-[#E1DEFF] h-8 bigphone:h-16 rounded-lg flex gap-2">
                  <div className="flex h-8 bigphone:h-16 w-1/2 text-tn bigphone:text-sm items-center pl-2 gap-3 justify-start">
                    <p>
                      {candidate?.position?.name
                        ? candidate?.position?.name
                        : "Nil"}
                    </p>
                    <p>{candidate?.programme?.programCode}</p>
                    <p>{candidate?.candidate?.name}</p>
                  </div>
                  <div className="flex h-8 bigphone:h-16 w-1/2 text-tn bigphone:text-sm items-center pr-2 gap-3 justify-end">
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
                <div className="w-full bg-[#E1DEFF] h-8 bigphone:h-16 rounded-lg flex gap-2">
                  <div className="flex h-8 bigphone:h-16 w-1/2 text-tn bigphone:text-sm items-center pl-2 gap-3 justify-start">
                    <p>
                      {candidate?.position?.name
                        ? candidate?.position?.name
                        : "Nil"}
                    </p>
                    <p>{candidate?.programme?.programCode}</p>
                    <p>{candidate?.candidate?.name}</p>
                  </div>
                  <div className="flex h-8 bigphone:h-16 w-1/2 text-tn bigphone:text-sm items-center pr-2 gap-3 justify-end">
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
                <div className="w-full bg-[#E1DEFF] h-8 bigphone:h-16 rounded-lg flex gap-2">
                  <div className="flex h-8 bigphone:h-16 w-1/2 text-tn bigphone:text-sm items-center pl-2 gap-3 justify-start">
                    <p>
                      {candidate?.position?.name
                        ? candidate?.position?.name
                        : "Nil"}
                    </p>
                    <p>{candidate?.programme?.programCode}</p>
                    <p>{candidate?.candidate?.name}</p>
                  </div>
                  <div className="flex h-8 bigphone:h-16 w-1/2 text-tn bigphone:text-sm items-center pr-2 gap-3 justify-end">
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
                <div className="w-full bg-[#E1DEFF] h-8 bigphone:h-16 rounded-lg flex gap-2">
                  <div className="flex h-8 bigphone:h-16 w-1/2 text-tn bigphone:text-sm items-center pl-2 gap-3 justify-start">
                    <p>
                      {candidate?.position?.name
                        ? candidate?.position?.name
                        : "Nil"}
                    </p>
                    <p>{candidate?.programme?.programCode}</p>
                    <p>{candidate?.candidate?.name}</p>
                  </div>
                  <div className="flex h-8 bigphone:h-16 w-1/2 text-tn bigphone:text-sm items-center pr-2 gap-3 justify-end">
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
                <div className="w-full bg-[#E1DEFF] h-8 bigphone:h-16 rounded-lg flex gap-2">
                  <div className="flex h-8 bigphone:h-16 w-1/2 text-tn bigphone:text-sm items-center pl-2 gap-3 justify-start">
                    <p>
                      {candidate?.position?.name
                        ? candidate?.position?.name
                        : "Nil"}
                    </p>
                    <p>{candidate?.programme?.programCode}</p>
                    <p>{candidate?.candidate?.name}</p>
                  </div>
                  <div className="flex h-8 bigphone:h-16 w-1/2 text-tn bigphone:text-sm items-center pr-2 gap-3 justify-end">
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
            <p className="mx-auto">No Results Found</p>
          )}
        </div>
      </div>
    </>
  );
}
