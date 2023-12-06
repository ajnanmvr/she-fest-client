import { Programme, Team } from "@/gql/graphql";

interface Props {
  program: Programme
  teams: Team[]
}
export default function FirstRowSecondCard(props: Props) {
  return (
    <div className="h-[43rem] w-[50%] 2xl:w-[50%] rounded-3xl bg-[#F7F7F7]">
    {/* heading */}
    <div className="h-12">
      <h1 className="text-3xl font-semibold px-5 my-4">Programs</h1>
      <hr className="border" />
    </div>
    {/* sort buttons */}
    <div className="flex items-center gap-1 pl-5 pr-10 h-16 flex-wrap">
      {/* All */}
      <button className="bg-primary h-6 border border-primary rounded-xl flex items-center justify-center">
        <p className="text-white px-2 font-medium text-sm">All</p>
      </button>
      {/* Tribune */}
      <button className="h-6 border border-primary rounded-xl flex items-center justify-center">
        <p className="text-primary px-2 font-medium text-sm">Tribune</p>
      </button>
      {/* Chronicle */}
      <button className="h-6 border border-primary rounded-xl flex items-center justify-center">
        <p className="text-primary px-2 font-medium text-sm">
          Chronicle
        </p>
      </button>
      {/* Gazette */}
      <button className="h-6 border border-primary rounded-xl flex items-center justify-center">
        <p className="text-primary px-2 font-medium text-sm">Gazette</p>
      </button>
      {/* Herald */}
      <button className="h-6 border border-primary rounded-xl flex items-center justify-center">
        <p className="text-primary px-2 font-medium text-sm">Herald</p>
      </button>
      {/* The End */}
    </div>
    <hr className="border" />
    {/* List of programs */}
    <div className="h-[75%] min-h-[75%] overflow-y-auto flex flex-col gap-2 items-center px-5 mt-3">
      {/* list 1 */}
      <div className="flex w-full items-center h-14 relative">
        <img
          src="https://riaindia.co.in/wp-content/uploads/2016/01/tutor-8.jpg"
          alt=""
          className="h-12 w-12 rounded-full absolute border -ml-4"
        />
        <div className="flex items-center h-14 min-h-[3.5rem] w-full text-xs bg-[#F6DEFF] rounded-xl justify-around pl-5">
          <p>1st</p>
          <p>S123</p>
          <p>Muahammed Arshad</p>
          <p>Chronicle</p>
          <p>A</p>
        </div>
      </div>
    </div>
    {/* end of lists */}
  </div>
  );
}
