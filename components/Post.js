import { async } from '@firebase/util';
import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon as HeartIconFilled, PaperAirplaneIcon} from '@heroicons/react/solid'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { HeartIcon} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'

import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import Moment from 'react-moment'


function Post({id,username,userImg,img,caption,time}) {
    const {data:session}=useSession();
    const[comments,setComments]=useState([]);
    const[comment,setComment]=useState([]);
    const[Likes,setLikes]=useState([]);
    const[hasLiked,setHasLiked]=useState(false);

    useEffect(()=>
        onSnapshot(
        query(collection(db,'posts',id,'comments'), 
            orderBy('timeStamp','desc')),
            (snapshot)=>
            setComment(snapshot.docs)
            ),
[db,id]);
useEffect(()=>{
    setHasLiked(Likes.findIndex((like)=> like.id===session?.user?.uid )!==-1)
},[Likes])

useEffect(()=>
onSnapshot(
   collection(db,'posts',id,'Likes'),
        (snapshot)=>
        setLikes(snapshot.docs)
        ),
[db,id]);


    const sendComment= async(e)=>{
        e.preventDefault();

        const commentToSend=comments;
        setComments('');

        await addDoc(collection(db,'posts',id,'comments'),{
            comments:commentToSend,
            username:session.user.name,
            userImg:session.user.image,
            timeStamp:serverTimestamp(),
        })
        
    }
    const likepost= async()=>{
        if(hasLiked){
            await deleteDoc(doc(db,'posts',id,'Likes',session.user.uid));
        }else{
            await setDoc(doc(db,'posts',id,'Likes',session.user.uid),{
            username:session.user.name


        });
        }
        
    };

   

    return (
        <div className=' bg-gray-50 my-7 border rounded-sm '>
           <div className='flex items-center p-5'>
               <img className='rounded-full h-10 w-10 border p-1 mr-3' src={userImg}/>
               <p className='flex font-bold'>{username}
               <DotsHorizontalIcon className='h-5 ml-80 mx-auto'/>
               </p>
                   </div>
                   <img src={img} className="object-cover w-full" alt='' />
           
            <div className='flex justify-between mb-1 p-3'>
                <div className='flex p-3 space-x-4  '>
                    {
                        hasLiked ?(
                            <HeartIconFilled onClick={likepost} className='btn text-red-600'/>
                        ):(
                            <HeartIcon onClick={likepost} className='btn ' />
                        )
                    }
                
                <ChatIcon  className='btn'/>
                <PaperAirplaneIcon className='btn rotate-90'/>
            </div>
            <BookmarkIcon className='btn'/>
            </div>
           {/*captions*/}
           <div>
               <p className='p-5 truncate'>
                   {Likes.length>0 &&(
                       <p className='font-bold mb-1 '> {Likes.length} likes </p>
                   )

                   }
                   <span className='font-bold mr-1'>{username} : </span>{caption}
               </p>
               
           </div>
           {/*comments*/}
            {comment.length>0&&(
                <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                    {comment.map(comments=>(
                        <div key={comments.id} className='flex items-center space-x-2 mb-3'>
                            <img className='h-6 rounded-full' src={comments.data().userImg} alt=''/>
                            <p className='text-sm flex-1'><span className='font-bold'>{comments.data().username }</span> : {comments.data().comments}</p>
                            <Moment fromNow className='pr-5 text-xs'>
                   {comments.data().timeStamp?.toDate()}
                            </Moment>
                            </div>
                    ))}
                    </div>
            )}
            {/*input bx*/}
            <form className='flex items-centerp-4'>
            <EmojiHappyIcon className='h-7 -mb-1'  />
            <input type="text"  onChange={e=>setComments(e.target.value)} placeholder='comment...' className='border-none flex-1 focus:ring-0 outline-none'/>
            <button type='submit'   onClick={sendComment} className=' btn font-semibold text-blue-400 outline-none'>POST</button>
            
            
            </form>
            <div>
            <Moment className='pr-5 text-xs'>
                   {time.timeStamp?.toDate()}
                            </Moment>
                            </div>
            
            
        </div>
        
    )
}

export default Post
