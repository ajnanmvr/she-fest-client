import { Programme } from "@/gql/graphql";

interface Props {
  programs: Programme[]
  count : number
}
export default function SecondRowSecondCard(props: Props) {
  return (
    <div className="h-[16rem] w-[50%] rounded-3xl bg-[#F7F7F7] px-5">
                {/* title */}
                <div className="w-full h-[20%] flex items-center justify-center">
                  <h1 className="text-4xl font-bold leading-none mt-2">Quick Overview</h1>
                </div>
                {/* small cards */}
                <div className="h-[80%] w-full flex gap-5 items-center justify-center">
                  {/* small card1 */}
                  <div className="h-4/6 w-1/3 2xl:w-1/4 bg-accent rounded-2xl flex flex-col items-center leading-tight pt-5">
                    <h1 className="text-[3rem] 2xl:text-7xl font-bold">{props.programs?.length || 0}</h1>
                    <h1 className="text-xs text-center">Result Published</h1>
                  </div>
                  {/* small card2 */}
                  <div className="h-4/6 w-1/3 2xl:w-1/4 bg-accent rounded-2xl flex flex-col items-center leading-tight pt-5">
                    <h1 className="text-[3rem] 2xl:text-7xl font-bold">{props.count}</h1>
                    <h1 className="text-xs text-center">Total Programs</h1>
                  </div>
                  {/* small card3 */}
                  <div className="h-4/6 w-1/3 2xl:w-1/4 bg-accent rounded-2xl flex flex-col items-center leading-tight pt-5">
                    <h1 className="text-[3rem] 2xl:text-7xl font-bold">{ props.count - (props.programs?.length as number) || 0}</h1>
                    <h1 className="text-xs text-center">To be Published</h1>
                  </div>
                </div>
              </div>
  );
}
