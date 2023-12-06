import { Programme } from "@/gql/graphql";

interface Props {
  programs: Programme[]
  count : number
}
export default function QuickOverview(props: Props) {
  return (
    <div className="h-44 bigphone:h-72 mx-auto min-h-14 min-w-6/8 w-[90%] flex bg-gray-100 rounded-2xl flex-col overflow-hidden">
    <div className="h-1/4 w-full flex items-end justify-center">
      <h1 className="text-2xl bigphone:text-4xl font-semibold">
        Quick Overview 
      </h1>
    </div>
    <div className="h-3/4 w-full flex justify-between px-2 gap-2 pt-3">
      <div className="w-2/6 h-5/6 bg-gray-300 rounded-xl flex flex-col items-center justify-center leading-tight">
        <h1 className="text-4xl bigphone:text-8xl font-bold">{props.programs?.length || 0}</h1>
        <h1 className="text-[10px] bigphone:text-lg">Results Published</h1>
      </div>
      <div className="w-2/6 h-5/6 bg-gray-300 rounded-xl flex flex-col items-center justify-center leading-tight">
        <h1 className="text-4xl bigphone:text-8xl font-bold">{props.count}</h1>
        <h1 className="text-[10px] bigphone:text-lg">Total Programs</h1>
      </div>
      <div className="w-2/6 h-5/6 bg-gray-300 rounded-xl flex flex-col items-center justify-center leading-tight">
        <h1 className="text-4xl bigphone:text-8xl font-bold">{ props.count - (props.programs?.length as number) || 0}</h1>
        <h1 className="text-[10px] bigphone:text-lg">To be Published</h1>
      </div>
    </div>
  </div>
  );
}
