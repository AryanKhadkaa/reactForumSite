import React, { useEffect, useState } from 'react'

import { Post as Ipost } from './home'
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


interface Like{
    likeId:string,
    userId:string
  }

export const Likes: React.FC<{ post:Ipost }> = ({post}) => {

const [likes,setLikes] = useState<Like[] | null>(null)
const [user] = useAuthState(auth)

const likesRef = collection(db,'likes');

const likesDoc = query(likesRef,
  where('postId','==',post.id)
)

const getLikes = async ()=>{

  const data = await getDocs(likesDoc)  
  setLikes(
    data.docs.map((doc)=>({
      userId:doc.data().userId,
      likeId:doc.id}))
  );
};

const addLike = async () =>{

try{
  const newDoc = await addDoc(likesRef,({
    postId:post.id,
    userId:user?.uid
   }))
   if(user){
    setLikes(likes
    ?[...likes,{userId:user.uid,likeId:newDoc.id}]
    :[{userId:user.uid,likeId:newDoc.id}]
   )
   updateLikes(likes)
  }}
  catch(err){
    console.log(err)
  }

}

const removeLike = async ()=>{

    try{
    const likeToDeleteQuery = query(likesRef,
      where('postId','==',post.id),
      where('userId','==',user?.uid)
    )
    const likeToDeleteData =await getDocs(likeToDeleteQuery);
    const likeId = likeToDeleteData.docs[0].id;
    await deleteDoc(doc(db,'likes',likeId))

    if(user){
      setLikes((prev)=>
      prev && prev.filter((like)=> like.likeId !== likeId)
      )
      updateLikes(likes)
    };}

   catch(err){
    console.log(err)
 };

}

const hasUserLiked = likes?.find((like)=> like.userId === user?.uid)
console.log(likes)

const updateLikes =async(updatedLikes:Like[] | null)=>{
 await updateDoc(doc(db,'zaps',post.id),({
 likes:updatedLikes?.length
 }))
}

useEffect(()=>{
  getLikes();
},[]);

  return (
    <div className='bg-yellow-400'>
        <span className='text-lg'>{likes && likes?.length > 0 && likes?.length}</span>
        <button className="bg-gray-900 text-white shadow-xl rounded-sm px-2"
            onClick={hasUserLiked? removeLike:addLike}>
            {hasUserLiked ? `Unlike`:`Like`}
        </button>
    </div>
  )
}
