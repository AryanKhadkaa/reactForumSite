import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "../firebase"
import { useEffect, useState } from "react"
import { Post as Ipost } from "../homePage/home"
import { PostBlock } from "../homePage/postBlock"


export const Popular = () => {

  const [popZaps, setPopZaps] = useState<Ipost[] | null>(null)

  const getPopularPosts =async()=>{

   const q = query(collection(db,'zaps'),orderBy('likes','desc'));
   const querySnapshot = await getDocs(q);
  
   const extractedData = querySnapshot.docs.map((doc)=>({ 
        id:doc.id,
        title:doc.data().title,
        zap:doc.data().zap,
        uName:doc.data().userName,
        uImage:doc.data().userImage,
        uId:doc.data().userId,
        createdAt:doc.data().createdAt,
    
   }))
   setPopZaps(extractedData)
   console.log(querySnapshot)
  }
  useEffect(()=>{
    getPopularPosts();
  },[])

  return (
    <div className="posts space-y-2 w-full pl-12 pr-6">
    {
      popZaps?.map((zap)=>
        <PostBlock post={zap}/>
     )}
     </div>
  )
  }

   
