import React from 'react'

const NotFound = () => {
  return (
    <div className="p-8 h-52 w-96 fixed top-1/2 -translate-y-1/2 bg-white rounded-xl left-1/2 shadow-2xl -translate-x-1/2 flex flex-col items-center gap-5">
  <button
    type="button"
    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
    data-modal-hide="popup-modal"
  >
    <svg
      className="w-3 h-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
      />
    </svg>
    <span className="sr-only">Close modal</span>
  </button>
  <h1 className="fixed top-1/2 -translate-y-1/2 text-xl font-semibold">
    Candidate Not Found!
  </h1>
</div>

  )
}

export default NotFound