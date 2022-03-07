import React from 'react'
import { signIn,signOut, useSession } from "next-auth/react"

function Miniprofile() {
    const {data:session} =useSession();
    
    return (
        <div className='flex  justify-between items-center '>
            <img className='rounded-full border p-[2px]  ml-5 w-16 h-16 ' src={session?.user?.image} alt=''/>
        
        <div>
            <h4 className='font-bold mx-4 flex-1'>{session?.user?.name}</h4>
            <h6 className='text-sm text-gray-400 '>welcome to instagram as nasusa</h6>
        </div>
        <button onClick={signOut} className=' btn text-blue-400 text-sm font-semibold'>Sign out</button>
        
        
        </div>
    );
}

export default Miniprofile
