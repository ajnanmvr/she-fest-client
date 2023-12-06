import React from 'react'

const Loader = () => {
  return (
    <main className="bg-[#0e0724] p-5">
  <img
    src="https://www.realia.live/_next/image?url=%2Frealia-txt.png&w=1920&q=75"
    className="h-12 opacity-50"
    alt=""
  />
  <img
    className="h-36 fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
    src="loading.gif"
    alt=""
  />
</main>
  )
}

export default Loader