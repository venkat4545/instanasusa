import Image from "next/image"
import {HeartIcon, HomeIcon, MenuIcon, PaperAirplaneIcon, PlusCircleIcon, SearchIcon, UserGroupIcon} from '@heroicons/react/solid'
import { signIn,signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
function Header() {
    const {data:session} =useSession();
    const [open,setOpen]=useRecoilState(modalState);
    
    const router =useRouter();

    return (
   
        <div className=" shadow-sm border-b bg-red-500 flex justify-between max-w-6xl  lg:mx-auto" >
        {/*   <div className=" bg-gray-500  flex justify-between max-w-6xl mx-5 lg:mx-auto">*/}
       
            

        

           
            {/*left*/}
           
            <div onClick={()=>router.push('/')} className="absolute  inset-y-0 hidden  lg:inline-grid h-24 w-24 flex-shrink-0 cursor-pointer -ml-72">
                <Image src="https://links.papareact.com/OCW" layout="fill" objectFit="contain" />
            </div>
            <div onClick={()=>router.push('/')} className="absolute inset-y-0 h-10 w-10 lg:hidden flex-shrink-0 cursor-pointer -ml-72   ">
            <Image src="https://links.papareact.com/jjm" layout="fill" objectFit="contain" />
            </div>
            
            <div className="absolute  inset-y-1    mt-1 p-3 rounded-md" >
                <div className="absolute  inset-y-0 pr-10 flex-shrink-0 -mr-11 items-center pointer-events-none mt-5 ">
                <SearchIcon className="h-5 w-5 text-gray-500 "/>
                </div>
                <input className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black" type="text" placeholder="search"></input>
                
            </div>
            
            {/*right*/}
         <div className="absolute flex items-center justify-end space-x-4 mx-72 top-5" >
            <HomeIcon onClick={()=>router.push('/')} className="h-8 w-10 navBtn"/>
            <MenuIcon className="h-8 w-10 md:hidden cursor-pointer"/>
           
           {session ? (
   <>
   <PaperAirplaneIcon  className="h-8 w-10 navBtn cursor-pointer rotate-45 "/>
                <PlusCircleIcon onClick={()=>setOpen(true)} className=" h-8 w-10 navBtn"/>
                <UserGroupIcon className="navBtn h-8 w-10" />
                <HeartIcon className="navBtn h-8 w-0" />
               
                <img onClick={signOut} src={session.user.image} className="h-10 rounded-full cursor-pointer" />
                </>
           ):(
                <button onClick={signIn}>Sign in</button>
           )}
           
           
            
           </div>
               {/*right end */}
        
       
        </div>  
    )
}

export default Header
