import { collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import Post from './Post'
import Moment from 'react-moment'

function Posts() {
    const [posts,setPosts]=useState([]);

    useEffect(
        ()=>

     onSnapshot(
            collection(db,'posts'),orderBy("timestamp","desc"),
            (snapshot)=>{
            setPosts(snapshot.docs);
        }
        ),
        [db]
    );
        
    return (
        <div>
           {posts.map((post) =>(
                <Post 
                key={post.id} 
                id={post.id}
                username={post.data().username}
                userImg={post.data().profileImg}
                img={post.data().image}
                caption={post.data().caption}
                time={serverTimestamp}
                />
                
           ))}
          
            
        </div>
    );
}

export default Posts
