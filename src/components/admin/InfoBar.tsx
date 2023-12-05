import React from "react";

interface Props {
  data: {
    title: string;
    icon: any;
  }[];
} 

const InfoBar = (props: Props) => {
  return (
    <div className="w-full flex flex-wrap md:flex-nowrap gap-10 justify-between">
      {props.data.map((item, index) => (
        <div
          key={index}
          className="rounded-3xl w-1/4 py-3 bg-accent hidden lg:flex items-center justify-center flex-row "
        >
          <svg
            viewBox={`${item.icon.props.viewBox}`}
            className={`${item.icon.props.className}`}
          >
            {item.icon.props.children}
          </svg>
          <div>
            <p className="text-lg font-light">{item.title}</p>
            <p className="text-4xl font-extrabold	text-secondary ">3650</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoBar;
