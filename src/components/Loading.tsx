


const Alert: React.FC = () => {
    return (
        <>
            <div className="w-full h-full">
                {/* <InfoBar data={props.data} /> */}
                <div className="w-full h-screen lg:h-[90%] flex mt-[3%] ">
                    <div className="flex-1 w-full">
                        <div className="h-10 cursor-pointer flex justify-between mb-4">
                            {/* search bar */}
                            <input
                                className="w-1/3 lg:w-1/4 rounded-full bg-[#EEEEEE] px-5 text-xl border-secondary"
                                type="text"
                                placeholder="Search"

                            />
                            <div>
                                <button
                                    className="inline-flex bg-secondary text-white rounded-full px-5 py-2 font-bold"

                                >
                                    Create
                                </button>
                                <button
                                    className="ml-1 bg-secondary text-white rounded-full px-5 py-2 font-bold"

                                >
                                    Export
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col w-full overflow-y-auto h-full">
                            <div
                                className={`grid gap-4 w-full transition-all grid-cols-1 
                  "lg:grid-cols-3" : "lg:grid-cols-4"
                }`}
                            >

                                <div

                                    className="transition-all bg-[#EEEEEE] rounded-xl mt-[1%] cursor-pointer flex p-5 gap-3 content-center items-center h-20"

                                >
                                    <div className="text-white font-bold bg-secondary px-3 py-1 text-xl rounded-xl flex justify-center content-center items-center">

                                    </div>

                                    <p className="text-black leading-5 pr-[10%]">

                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* </div> */}
                    {/* <RightSideBar
              isCreate={isCreate}
              isEdit={isEdit}
              key={1}
              isOpen={IsRightSideBarOpen}
              setIsOpen={setIsRightSideBarOpen}
            >
              <SinglePosition
                isOpen={IsRightSideBarOpen}
                setIsOpen={setIsRightSideBarOpen}
                key={3}
                name={SelectedPosition.name}
                id={SelectedPosition.id}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                isCreate={isCreate}
                setIsCreate={setIsCreate}
                data={data}
                setData={setData}
              />
            </RightSideBar> */}
                </div>
            </div>
        </>
    );
};




export default Alert;