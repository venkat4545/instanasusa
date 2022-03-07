
import { useEffect, useState } from 'react'
import faker from '@faker-js/faker';
import Story from './Story'
import { signIn,signOut, useSession } from "next-auth/react"

function Stories() {
    const {data:session} =useSession();
    const [suggestions,setSuggestions]=useState([]);
useEffect(()=>{
    const suggestions=[...Array(25)].map((_,i)=>({
        ...faker.helpers.contextualCard(),
        id:i,
    }));
    setSuggestions(suggestions);
},[]);

    return (
        <div className=' flex space-x-2  p-6 bg-white border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black '>
            {
                session&&(
                    <Story img={session.user.image}
                    username={session.user.name} />
                )
            }
           {suggestions.map((profile)=>(
               <Story  
               key={profile.id}
               img={profile.avatar}
               username={profile.username}
               />
           
           ))}
        </div>
    )
}

export default Stories;

