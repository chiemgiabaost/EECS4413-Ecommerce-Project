import Navigate from "@/components/Navigate";
import {useSession,signIn, signOut} from "next-auth/react";
import AdminLogo from "./AdminLogo";
import { useState } from "react";

export default function Layout({children}) {
  const [showNavigate, setShowNavigate] = useState(false);
  const {data: session} = useSession();
  if (!session) {
    return (
      <div className="bg-gradient-to-r from-black to-blue-900 w-screen h-screen flex justify-center items-center">
        <div className="text-blue-900 flex justify-between">
          <a href="/api/auth/signin" className="text-white hover:underline">Sign in</a>
        </div>
      </div>
    )
  }
  return (
   <div className="bg-gradient-to-r from-black to-blue-900 min-h-screen">

    <div className="block md:hidden">
      <button onClick={() => setShowNavigate(true)}> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
      <div className="flex justify-center">
        <AdminLogo/>
      </div>
      
    </div>
    <div className="flex justify-center">
        <Navigate showNavigation = {showNavigate}/>
        <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
        {children}
        </div>
        {/*<button onClick={() => signOut()}>Sign out</button>*/}
      </div>
   </div> 
   
    
  )
}
