import NOT_AV from "@/components/NOT_AV";
import ProgramAndResultDesktop from "@/components/candidate/Profile";
import {
  Candidate,
  GetCandidateByChestNoDocument,
  GetCandidateByChestNoQuery,
  GetCandidateByChestNoQueryVariables,
  Model,
  Type,
  Types,
} from "@/gql/graphql";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";

export default async function page({
  params,
}: {
  params: { chestNo: string };
}) {
  const { client } = getUrqlClient();
  const result = await client.query<
    GetCandidateByChestNoQuery,
    GetCandidateByChestNoQueryVariables
  >(GetCandidateByChestNoDocument, {
    api_key: API_KEY,
    chestNO: params.chestNo,
  });

  const candidate: Candidate = result?.data?.candidateByChestNo as Candidate;

  let candidateArtsPoint = 0;

   candidate?.candidateProgrammes?.map((prg , i)=>{
    console.log(prg);
    
    if((prg.programme?.type as Types) == (Types.Single as Types) && (prg.programme?.model as Model) == (Model.Arts as Model)  && prg.programme?.resultPublished ){
      console.log("Daaaaaa");
      
      candidateArtsPoint += prg.point ? prg.point : 0 
    } 
  })

  let candidateSportsPoint = 0;

  candidate?.candidateProgrammes?.map((prg , i)=>{
   console.log(prg);
   
   if((prg.programme?.type as Types) == (Types.Single as Types) && (prg.programme?.model as Model) == (Model.Sports as Model)  && prg.programme?.resultPublished ){
     console.log("Daaaaaa");
     
     candidateSportsPoint += prg.point ? prg.point : 0 
   } 
 })

  return (
    <main className="font-sans h-screen overflow-hidden flex overflow-y-auto">
      {/* Student */}
      <div className="h-screen md:w-72 md:min-w-72 lg:w-96 lg:min-w-96 w-screen bg-primary overflow-hidden md:flex md:flex-col md:justify-between md:items-center hidden">
        <div className="h-64 w-40 md:bg-white bg-transparent md:flex md:flex-col md:items-center flex flex-col items-center mx-auto pt-44 md:pt-0">
          <div className="text-2xl md:mx-5 md:pt-24 pt-28 text-primary relative z-40">
            <h1 className="text-transparent md:text-primary">Team</h1>
            <h1 className="font-bold hidden md:block text-primary -mt-2">
              {candidate?.team?.name}
            </h1>
          </div>

          <div
            className="md:min-h-[12rem] md:h-48 md:min-w-48 md:w-48 lg:min-h-[13rem] lg:h-52 lg:min-w-52 lg:w-52 min-h-28 min-w-28 bg-white md:mt-8 -mt-44 rounded-full relative z-20 hidden md:block bg-cover border-2 border-white"
            style={{
              backgroundImage: `url(${
                candidate?.imageId
                  ? `https://drive.google.com/uc?id=${candidate?.imageId}`
                  : "https://banner2.cleanpng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg"
              })`,
            }}
          >
            {/* <img
              src={`${candidate?.imageId ? `https://drive.google.com/uc?id=${candidate?.imageId}` : 'https://banner2.cleanpng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg'}`}
              alt="Student's Photo"
              className="rounded-full h-full object-cover outline outline-3 outline-white"
            /> */}
            <div className="bg-white h-5 w-16 mx-auto relative z-40 md:-mt-2 -mt-4 rounded  outline outline-1">
              <h1 className="text-center font-black text-primary text-sm">
                {candidate?.chestNO}
              </h1>
            </div>
          </div>

          <div className="w-full h-96 md:block text-white mt-8 hidden">
            <h1 className="text-center text-xl font-bold -mt-2 capitalize">
              {candidate?.name}
            </h1>
            <h2 className="text-center text-lg">{candidate?.category?.name}</h2>
          </div>
        </div>
        <div className="">
          {/* current */}
          <div className="bg-white md:w-48 md:h-36 h-full w-full mx-auto md:rounded-t-3xl rounded-t-xlarge relative z-0 -mt-0 md:mt-0 hidden md:block">
            <div className="">
              <div className="flex md:flex-col md:items-center">
                <div className="bg-primary w-32 h-8 rounded-full mt-5 hidden md:block">
                  <h1 className="text-white font-bold text-center text-sm mt-2">
                    Current Status
                  </h1>
                </div>
              </div>
              <div className=" flex flex-row justify-around md:-mt-0 -mt-20 bigphone:-mt-32 float-right md:float-none grid-row gap-5 mr-6 md:grid-row-none md:mr-0">
                <div className="md:bg-transparent bg-secondary md:h-16 md:w-16 bigphone:h-20 h-16 bigphone:w-20 w-16 rounded-xl">
                  <h1 className="font-bold text-center md:text-5xl text-3xl bigphone:text-4xl mt-1">
                    {/* {candidate?.individualPoint || 0} */}
                    {candidateArtsPoint}
                  </h1>
                  <p className="text-lt text-center -mt-2">Arts</p>
                </div>
                <div className="md:bg-transparent bg-secondary md:h-16 md:w-16 bigphone:h-20 w-16 bigphone:w-20 h-16 rounded-xl">
                  <h1 className="font-bold text-center md:text-5xl text-3xl bigphone:text-4xl mt-1">
                    {candidateSportsPoint}
                  </h1>
                  <p className="text-lt text-center -mt-2">Sports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <ProgramAndResultDesktop candidate={candidate} candidateArtsPoint={candidateArtsPoint} candidateSportsPoint={candidateSportsPoint} />
    </main>
    // <NOT_AV/>
  );
}
