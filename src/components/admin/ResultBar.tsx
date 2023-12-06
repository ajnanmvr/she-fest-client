import React from "react";

interface Props {
  data: {
    name: string
    totalPoint: number;
    currentPoint: number;
    totalSports: number;
    currentSports: number
  }[]
}

const ResultBar = (props: Props) => {
  return (
    <div className="w-full lg:flex flex-wrap md:flex-nowrap gap-10 justify-between hidden ">
      {props.data.map((item, index) => (
        <div key={index} className="bg-accent text-secondary  rounded-2xl w-1/5 flex flex-col items-center py-2 ">
          <h1 className="font-bold text-lg">{item.name}</h1>
          <div className="flex gap-2 w-full px-5">
            <div className="w-1/2 h-full flex flex-col items-center">
              <h1 className="text-3xl font-bold">{item.totalPoint}</h1>
              <h1 className="text-xs">Arts Total</h1>
              <h1 className="text-2xl font-semibold">{item.currentPoint}</h1>
              <h1 className="text-[10px]">Current Points</h1>
            </div>
            <div className="w-1/2 h-full flex flex-col items-center">
              <h1 className="text-3xl font-bold">{item.totalSports}</h1>
              <h1 className="text-xs">Sports Total</h1>
              <h1 className="text-2xl font-semibold">{item.currentSports}</h1>
              <h1 className="text-[10px]">Current Points</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultBar;
