import Profile from "@/components/candidate/Profile";

export default async function page({
  params,
}: {
  params: { chestNo: string };
}) {
  return (
    <main className="h-screen w-screen">
        {/* Phone View */}
        <div className="lg:hidden flex flex-col h-screen w-screen overflow-hidden bg-primary">
          {/* title */}
          <div className="h-1/6 w-full px-2 py-3 flex justify-center items-end">
            <h1 className="text-white font-semibold text-3xl">Program Schedule</h1>
          </div>
          {/* main card */}
          <div className="h-5/6 w-full">
            <div className="bg-white h-full w-full rounded-t-[3.5rem] overflow-hidden">
              {/* UP */}
              <div className="h-1/6 flex flex-wrap justify-center items-center w-[80%] bigphone:w-[50%] mx-auto gap-2 content-center my-2">
                <button className="h-6 bigphone:h-6 bg-primary border border-primary rounded-xl flex items-center">
                  <h1 className="text-xs bigphone:text-sm px-1 text-white font-bold">
                    Bidaya
                  </h1>
                </button>
                <button className="h-6 bigphone:h-6 border-primary border rounded-xl flex items-center">
                  <h1 className="text-xs bigphone:text-sm px-1 text-primary font-bold">
                    Uoola
                  </h1>
                </button>
                <button className="h-6 bigphone:h-6 border-primary border rounded-xl flex items-center">
                  <h1 className="text-xs bigphone:text-sm px-1 text-primary font-bold">
                    Thaniya
                  </h1>
                </button>
                <button className="h-6 bigphone:h-6 border-primary border rounded-xl flex items-center">
                  <h1 className="text-xs bigphone:text-sm px-1 text-primary font-bold">
                    Thanawiyyah
                  </h1>
                </button>
                <button className="h-6 bigphone:h-6 border-primary border rounded-xl flex items-center">
                  <h1 className="text-xs bigphone:text-sm px-1 text-primary font-bold">
                    Aliya
                  </h1>
                </button>
                <input type="text" className="h-6 bigphone:h-6 border-primary border rounded-xl bg-transparent placeholder:text-xs placeholder:px-2 text-xs px-2" placeholder="Search for Programs..." />
              </div>
              <hr className="border-1 border-primary" />
              {/* down */}
              <div className="h-5/6 bigphone:h-[88%] px-5 pt-2 overflow-y-auto">
                {/* first date */}
                <button className="bg-primary rounded-xl text-white font-semibold text-xs bigphone:text-base mb-2">
                  <h1 className="p-2 bigphone:p-3">20-10-2023</h1>
                </button>
                <div className="w-full flex flex-col gap-2">
                  {/* list 1 */}
                  <div className="h-10 bigphone:h-12 w-full bg-accent rounded-xl flex text-[10px] bigphone:text-sm px-3 justify-between">
                    <div className="flex items-center justify-start gap-2">
                      <p>SM1231</p>
                      <p className="font-semibold">No one knows that</p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p>Thanawiyya</p>
                      <p className="font-semibold">07:15-08:15</p>
                      <p className="font-semibold">Venue 4</p>
                    </div>
                  </div>
                  {/* list 2 */}
                </div>
                {/* second date */}
                <button className="bg-primary rounded-xl text-white font-semibold text-xs bigphone:text-base my-2">
                  <h1 className="p-2 bigphone:p-3">21-10-2023</h1>
                </button>
                <div className="w-full flex flex-col gap-2">
                  {/* list 1 */}
                  <div className="h-10 bigphone:h-12 w-full bg-accent rounded-xl flex text-[10px] bigphone:text-sm px-3 justify-between">
                    <div className="flex items-center justify-start gap-2">
                      <p>SM1231</p>
                      <p className="font-semibold">No one knows that</p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p>Thanawiyya</p>
                      <p className="font-semibold">07:15-08:15</p>
                      <p className="font-semibold">Venue 4</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Desktop View */}
        <div className="h-screen w-screen bg-accent hidden lg:flex items-center justify-center">
          <div className="bg-white h-5/6 w-11/12 rounded-3xl overflow-hidden pb-5">
            {/* up */}
            <div className="h-24 w-full px-5 flex items-end">
              <h1 className="text-5xl font-bold text-primary">Program Schedule</h1>
            </div>
            <hr />
            {/* sort keys */}
            <div className="w-full h-10 flex items-center px-5 gap-3">
              <button className="h-6 bg-primary border border-primary rounded-xl flex items-center">
                <h1 className="text-xs px-1 text-white font-bold">Bidaya</h1>
              </button>
              <button className="h-6 border-primary border rounded-xl flex items-center">
                <h1 className="text-xs px-1 text-primary font-bold">Uoola</h1>
              </button>
              <button className="h-6 border-primary border rounded-xl flex items-center">
                <h1 className="text-xs px-1 text-primary font-bold">Thaniya</h1>
              </button>
              <button className="h-6 border-primary border rounded-xl flex items-center">
                <h1 className="text-xs px-1 text-primary font-bold">Thanawiyyah</h1>
              </button>
              <button className="h-6 border-primary border rounded-xl flex items-center">
                <h1 className="text-xs px-1 text-primary font-bold">Aliya</h1>
              </button>
              <input type="text" className="h-6 border-primary border rounded-xl bg-transparent placeholder:text-xs placeholder:px-2 text-xs px-2" placeholder="Search for Programs..." />
            </div>
            <hr />
            {/* down */}
            <div className="flex w-full h-[73%] gap-5 px-5 overflow-y-auto">
              {/* first half */}
              <div className="w-1/2">
                <div className="flex gap-3 items-start">
                  {/* date div */}
                  <div className="h-10 w-[20%] bg-primary rounded-xl text-white font-bold flex items-center justify-center mt-2 text-xs">
                    <h1>12-12-2023</h1>
                  </div>
                  {/* list div */}
                  <div className="flex flex-col w-[80%]">
                    {/* list 2 */}
                    <div className="h-10 w-full bg-accent rounded-xl mt-2 flex px-3 text-[10px] items-center justify-between">
                      <div className="flex gap-3">
                        <p>SM1231</p>
                        <p className="font-semibold">No one knows that</p>
                      </div>
                      <div className="h-full w-[45%] text-[10px] flex items-center justify-end">
                        <div className="flex gap-3">
                          <p>Thanawiyyah</p>
                          <p className="font-semibold">07:00-08:00</p>
                          <p className="font-semibold">Venue 4</p>
                        </div>
                      </div>
                    </div>
                    {/* end of list */}
                  </div>
                </div>
              </div>
              {/* second half */}
              <div className="w-1/2">
                <div className="flex gap-3 items-start">
                  {/* date div */}
                  <div className="h-10 w-[20%] bg-primary rounded-xl text-white font-bold flex items-center justify-center mt-2 text-xs">
                    <h1>12-12-2023</h1>
                  </div>
                  {/* list div */}
                  <div className="flex flex-col w-[80%]">
                    {/* list 1 */}
                    <div className="h-10 w-full bg-accent rounded-xl mt-2 flex px-3 text-[10px] items-center justify-between">
                      <div className="flex gap-3">
                        <p>SM1231</p>
                        <p className="font-semibold">No one knows that</p>
                      </div>
                      <div className="h-full w-[45%] text-[10px] flex items-center justify-end">
                        <div className="flex gap-3">
                          <p>Thanawiyyah</p>
                          <p className="font-semibold">07:00-08:00</p>
                          <p className="font-semibold">Venue 4</p>
                        </div>
                      </div>
                    </div>
                    {/* list 2 */}
                    <div className="h-10 w-full bg-accent rounded-xl mt-2 flex px-3 text-[10px] items-center justify-between">
                      <div className="flex gap-3">
                        <p>SM1231</p>
                        <p className="font-semibold">No one knows that</p>
                      </div>
                      <div className="h-full w-[45%] text-[10px] flex items-center justify-end">
                        <div className="flex gap-3">
                          <p>Thanawiyyah</p>
                          <p className="font-semibold">07:00-08:00</p>
                          <p className="font-semibold">Venue 4</p>
                        </div>
                      </div>
                    </div>
                    {/* list 3 */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}
