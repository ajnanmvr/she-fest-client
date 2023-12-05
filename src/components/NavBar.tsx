"use client"
import { useGlobalContext } from "@/context/context";
import { useRouter } from "next/navigation"


export default function Navbar() {

  const { data , setData } = useGlobalContext();

  const router = useRouter()

    return (
        <div className="navbar bg-slate-200 rounded-2xl w-11/12 absolute left-1/2 right-1/2 -translate-x-1/2 top-4 justify-between">
        <div className="navbar-start ">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Item 1</a></li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl"  onClick={()=>router.push('/')} >daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Item 1</a></li>
            <li tabIndex={0}>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
            {
              data.admin ? <li><a onClick={()=>router.push('/admin')}>Dashoard</a></li> :  <li><a onClick={()=>router.push('/login')}>Login</a></li>
            }
           
          </ul>
        </div>
      </div>
      
    )
  }