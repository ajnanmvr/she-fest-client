import { Programme } from "@/gql/graphql";
import { useState } from "react";

interface Props {
  programme: Programme;
}

export default function MobileCandidates(props: Props) {
  const { programme } = props;
  const active = {
    button:
      "w-auto bg-[#3D127A] text-white text-xs bigphone:text-base font-semibold rounded-3xl px-1 bigphone:px-2 h-6 bigphone:h-8",
  };
  const inactive = {
    button:
      "w-auto bg-white border border-[#3D127A] text-[#3D127A] text-xs bigphone:text-base font-semibold rounded-3xl px-1 bigphone:px-2 h-6 bigphone:h-8",
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
        <div className="flex flex-col gap-2 px-5 h-[30vh] overflow-y-auto">
          {allOrSingleTeam === "all"
            ? allCandidates?.map((candidate) => (
                <div className="w-full bg-[#E1DEFF] h-8 bigphone:h-16 rounded-lg flex gap-2">
                  <div className="flex h-8 bigphone:h-16 w-2/3 text-tn bigphone:text-sm items-center pl-2 gap-3 justify-start">
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
                  <div className="flex h-8 bigphone:h-16 w-1/3 text-tn bigphone:text-sm items-center pr-2 gap-3 justify-end">
                    <p>{candidate?.candidate?.team?.name}</p>
                  </div>
                </div>
              ))
            : allOrSingleTeam === "chronicle"
            ? chronicleCandidates?.map((candidate) => (
                <div className="w-full bg-[#E1DEFF] h-8 bigphone:h-16 rounded-lg flex gap-2">
                  <div className="flex h-8 bigphone:h-16 w-2/3 text-tn bigphone:text-sm items-center pl-2 gap-3 justify-start">
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
                  <div className="flex h-8 bigphone:h-16 w-1/3 text-tn bigphone:text-sm items-center pr-2 gap-3 justify-end">
                    <p>{candidate?.candidate?.team?.name}</p>
                  </div>
                </div>
              ))
            : allOrSingleTeam === "gazette"
            ? gazetteCandidates?.map((candidate) => (
                <div className="w-full bg-[#E1DEFF] h-8 bigphone:h-16 rounded-lg flex gap-2">
                  <div className="flex h-8 bigphone:h-16 w-2/3 text-tn bigphone:text-sm items-center pl-2 gap-3 justify-start">
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
                  <div className="flex h-8 bigphone:h-16 w-1/3 text-tn bigphone:text-sm items-center pr-2 gap-3 justify-end">
                    <p>{candidate?.candidate?.team?.name}</p>
                  </div>
                </div>
              ))
            : allOrSingleTeam === "herald"
            ? heraldCandidates?.map((candidate) => (
                <div className="w-full bg-[#E1DEFF] h-8 bigphone:h-16 rounded-lg flex gap-2">
                  <div className="flex h-8 bigphone:h-16 w-2/3 text-tn bigphone:text-sm items-center pl-2 gap-3 justify-start">
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
                  <div className="flex h-8 bigphone:h-16 w-1/3 text-tn bigphone:text-sm items-center pr-2 gap-3 justify-end">
                    <p>{candidate?.candidate?.team?.name}</p>
                  </div>
                </div>
              ))
            : allOrSingleTeam === "tribune"
            ? tribuneCandidates?.map((candidate) => (
                <div className="w-full bg-[#E1DEFF] h-8 bigphone:h-16 rounded-lg flex gap-2">
                  <div className="flex h-8 bigphone:h-16 w-2/3 text-tn bigphone:text-sm items-center pl-2 gap-3 justify-start">
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
                  <div className="flex h-8 bigphone:h-16 w-1/3 text-tn bigphone:text-sm items-center pr-2 gap-3 justify-end">
                    <p>{candidate?.candidate?.team?.name}</p>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
