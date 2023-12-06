import { Programme } from "@/gql/graphql";
import { useState } from "react";

interface Props {
  programme: Programme;
}

export default function TabCandidates(props: Props) {
  const { programme } = props;
  const active = {
    div: "rounded-xl text-sm h-6 bg-primary border border-primary flex items-center",
    button: "px-2 text-white text-sm",
  };
  const inactive = {
    div: "rounded-xl text-sm h-6 border border-primary flex items-center",
    button: "px-2 text-primary text-sm",
  };

  const [allOrSingleTeam, setAllOrSingleTeam] = useState("all");

  const allCandidates = programme?.candidateProgramme;
  const chronicleCandidates = allCandidates?.filter((candidate) => {
    return candidate?.candidate?.team?.name === "Chronicle";
  });
  const gazetteCandidates = allCandidates?.filter((candidate) => {
    return candidate?.candidate?.team?.name === "Gazette";
  });
  const heraldCandidates = allCandidates?.filter((candidate) => {
    return candidate?.candidate?.team?.name === "Herald";
  });
  const tribuneCandidates = allCandidates?.filter((candidate) => {
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
        {allOrSingleTeam === "all"
          ? allCandidates?.map((candidate) => (
              <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                <div className="flex h-8 w-1/2 text-sm items-center pl-2 gap-3 justify-start">
                  <img
                    src={`${
                      `https://drive.google.com/uc?id=${candidate?.candidate?.imageId}` ||
                      "https://banner2.cleanpng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg"
                    }`}
                    className="rounded-full h-10 border"
                    alt=""
                  />
                  <p>{candidate?.candidate?.chestNO}</p>
                  <p>{candidate?.candidate?.name}</p>
                </div>
                <div className="flex h-8 w-1/2 text-sm items-center pr-2 gap-3 justify-end">
                  <p>{candidate?.candidate?.team?.name}</p>
                </div>
              </div>
            ))
          : allOrSingleTeam === "chronicle"
          ? chronicleCandidates?.map((candidate) => (
              <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                <div className="flex h-8 w-1/2 text-sm items-center pl-2 gap-3 justify-start">
                  <img
                    src={`${
                      `https://drive.google.com/uc?id=${candidate?.candidate?.imageId}` ||
                      "https://banner2.cleanpng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg"
                    }`}
                    className="rounded-full h-10 border"
                    alt=""
                  />
                  <p>{candidate?.candidate?.chestNO}</p>
                  <p>{candidate?.candidate?.name}</p>
                </div>
                <div className="flex h-8 w-1/2 text-sm items-center pr-2 gap-3 justify-end">
                  <p>{candidate?.candidate?.team?.name}</p>
                </div>
              </div>
            ))
          : allOrSingleTeam === "gazette"
          ? gazetteCandidates?.map((candidate) => (
              <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                <div className="flex h-8 w-1/2 text-sm items-center pl-2 gap-3 justify-start">
                  <img
                    src={`${
                      `https://drive.google.com/uc?id=${candidate?.candidate?.imageId}` ||
                      "https://banner2.cleanpng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg"
                    }`}
                    className="rounded-full h-10 border"
                    alt=""
                  />
                  <p>{candidate?.candidate?.chestNO}</p>
                  <p>{candidate?.candidate?.name}</p>
                </div>
                <div className="flex h-8 w-1/2 text-sm items-center pr-2 gap-3 justify-end">
                  <p>{candidate?.candidate?.team?.name}</p>
                </div>
              </div>
            ))
          : allOrSingleTeam === "herald"
          ? heraldCandidates?.map((candidate) => (
              <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                <div className="flex h-8 w-1/2 text-sm items-center pl-2 gap-3 justify-start">
                  <img
                    src={`${
                      `https://drive.google.com/uc?id=${candidate?.candidate?.imageId}` ||
                      "https://banner2.cleanpng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg"
                    }`}
                    className="rounded-full h-10 border"
                    alt=""
                  />
                  <p>{candidate?.candidate?.chestNO}</p>
                  <p>{candidate?.candidate?.name}</p>
                </div>
                <div className="flex h-8 w-1/2 text-sm items-center pr-2 gap-3 justify-end">
                  <p>{candidate?.candidate?.team?.name}</p>
                </div>
              </div>
            ))
          : allOrSingleTeam === "tribune"
          ? tribuneCandidates?.map((candidate) => (
              <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                <div className="flex h-8 w-1/2 text-sm items-center pl-2 gap-3 justify-start">
                  <img
                    src={`${
                      `https://drive.google.com/uc?id=${candidate?.candidate?.imageId}` ||
                      "https://banner2.cleanpng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg"
                    }`}
                    className="rounded-full h-10 border"
                    alt=""
                  />
                  <p>{candidate?.candidate?.chestNO}</p>
                  <p>{candidate?.candidate?.name}</p>
                </div>
                <div className="flex h-8 w-1/2 text-sm items-center pr-2 gap-3 justify-end">
                  <p>{candidate?.candidate?.team?.name}</p>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}
