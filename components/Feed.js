import React from 'react'
import Posts from './Posts'
import Stories from './Stories'
import MiniProfile from './Miniprofile'
import Suggestions from './Suggestions'
import { signIn,signOut, useSession } from "next-auth/react"
import Modal from './Modal'
function Feed() {
    const {data:session} =useSession();
    return (
        <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto'>
            {/*section left */}
            <section className="col-span-2">
            {/*stories */}
        {session &&(
                <Stories />
        )}
            
          
                 
            {session &&(
                 
                     <Posts />
            )}
            {/*posts */}
           
            <Modal/>
           

            </section>
           



        
            {/*section */}
            {session&&(
                     <section className='hidden xl:inline-grid md:col-span-1'>
                     {/*mini profile */}
                     <div className='fixed top-20'>
                         <MiniProfile />
                     {/*suggestions */}
                     <Suggestions />
                     </div>
                     
                     </section>
            )}
           
           
        </main>
    )
}

export default Feed
