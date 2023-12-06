import React from 'react'
import Header from './Header'

const Nav = () => {
  return (
    <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 ">
        <div className="container px-4 mx-auto w-full flex flex-wrap items-center justify-between">
          <Header nav="" />
        </div>
      </nav>
  )
}

export default Nav