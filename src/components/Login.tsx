"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const router = useRouter();

  const submitForm = (e: any) => {
    e.preventDefault();

  };

  return (
    <div className="flex w-screen h-screen bg-smoke items-center justify-center bg">
      <form onSubmit={submitForm} className="bg-white flex flex-col h-fit w-96 p-10 rounded-xl gap-3 items-center">
        <div className='w-40'>
          <img onClick={()=>{
            router.push('/')
          }} className='object-contain cursor-pointer' src="/logo/logo-only.jpg" alt="Logo" />
        </div>
        <span className="font-bold text-primary text-2xl">Admin Login</span>
        <p>
          {error && <span className="text-red-500">{error}</span>}
        </p>
        <input
          type="text"
          placeholder="Username"
          onChange={(e: any) => setUsername(e.target.value)}
          className="px-3 py-2 rounded-lg border focus:border-primary text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e: any) => setPassword(e.target.value)}
          className="px-3 py-2 rounded-lg border focus:border-primary text-black"
          required
        />
        <button type="submit" className="hover:bg-light border-primary border rounded-lg text-white px-3 py-1 bg-primary">
          Login
        </button>
      </form>

      <div className="mt-4">
      </div>
    </div>
  );
}