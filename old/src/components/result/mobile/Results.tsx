export default function Results() {
  return (
    <div className="h-full w-full bg-gray-100 rounded-3xl overflow-hidden">
      <div className="h-1/5 w-full px-5 flex items-center leading-tight justify-between">
        <h1 className="text-2xl bigphone:text-4xl font-bold">Results</h1>
        <button className="p-2 text-white font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-primary h-10 w-10 bigphone:h-14 bigphone:w-14"
            viewBox="0 -960 960 960"
          >
            <path d="m480-320 56-56-64-64h168v-80H472l64-64-56-56-160 160 160 160Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
        </button>
      </div>
      <hr className="border-1 border-primary" />
      <div className="h-10 w-full flex gap-2 items-center px-2">
        <button className="bg-primary h-8 w-16 border border-primary rounded-xl flex items-center justify-center">
          <p className="text-white font-medium text-xs">All</p>
        </button>
        <button className="h-8 w-36 justify-center border border-primary rounded-xl flex items-center">
          <p className="text-xs text-primary">Filter by</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-primary"
            height={24}
            viewBox="0 -960 960 960"
            width={24}
          >
            <path d="M480-360 280-560h400L480-360Z" />
          </svg>
        </button>
        <form className="w-full rounded-xl overflow-hidden h-8 border border-primary flex">
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-2 h-2 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="default-search"
              className="block w-full h-8 pl-10 text-xs text-gray-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for programs..."
            />
          </div>
        </form>
      </div>
      <hr className="border-1 border-primary" />
      <div className="w-full h-[65%] p-2 overflow-y-auto">
        <div className="flex h-14 w-full bg-accent rounded-3xl items-center justify-between pr-2 pl-9 mt-2 relative">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            alt=""
            className="h-8 rounded-full absolute left-0"
          />
          <div className="flex gap-2">
            <p className="font-semibold text-[10px] bigphone:text-xs">1st</p>
            <p className=" text-[10px] bigphone:text-xs">S1234</p>
            <p className="text-[10px] bigphone:text-xs">Muahammed Midlaj Ms</p>
          </div>
          <div className="flex gap-2">
            <p className="text-[10px] bigphone:text-xs">Chronicle</p>
            <p className="text-[10px] bigphone:text-xs">A</p>
          </div>
        </div>
        <div className="flex h-10 w-full bg-accent rounded-3xl items-center justify-between pr-2 pl-9 mt-2 relative">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            alt=""
            className="h-8 rounded-full absolute left-0"
          />
          <div className="flex gap-2">
            <p className="font-semibold text-[10px] bigphone:text-xs">1st</p>
            <p className=" text-[10px] bigphone:text-xs">S1234</p>
            <p className="text-[10px] bigphone:text-xs">Muahammed Midlaj Ms</p>
          </div>
          <div className="flex gap-2">
            <p className="text-[10px] bigphone:text-xs">Chronicle</p>
            <p className="text-[10px] bigphone:text-xs">A</p>
          </div>
        </div>
      </div>
    </div>
  );
}
