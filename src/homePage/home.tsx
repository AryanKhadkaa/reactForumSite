import { useNavigate } from "react-router-dom"
import {db} from "../firebase"
import { collection,getDocs, orderBy, query} from "firebase/firestore"
import { useEffect, useState } from "react";
import { FilterPages } from "../filterPages/filterPages";
import { PostBlock } from "./postBlock";

export interface Post{
  id:string,
  postId?:string,
  title:string,
  zap:string,
  uName:string,
  uImage:string,
  uId:string

}
export const Home = () => {

  const navigate = useNavigate();
  const [zaps,setZaps] = useState<Post[]>([]) //state for Post list

//Fetching Post details from the firestore DB 
 

    const fetchData = async () =>{
      const q= query(collection(db,'zaps'),orderBy("createdAt","desc"));
      const querySnapshot = await getDocs(q);
      const extractedData = querySnapshot.docs.map(doc=>({
        id:doc.id,
        title:doc.data().title,
        zap:doc.data().zap,
        uName:doc.data().userName,
        uImage:doc.data().userImage,
        uId:doc.data().userId,
        createdAt:doc.data().createdAt,
        
      }))
     setZaps(extractedData) 

  }

useEffect(()=>{

   fetchData()

  },[])

  return (
    <div className="">
     
      <div className="space-y-2 border-b border-b-gray-400  py-5">
      {/* <h1 className="text-2xl ">Zap your thoughts!</h1> */}
      <button className="py-2 px-3 rounded-md bg-[#F3E4C2] text-[#212412] textbase"
       onClick={()=>navigate('createZaps.tsx')}>
        Create new Zap +
      </button>
      </div>

      <div className=" flex ">
       
       <div className="filter-pages w-[25%] border-r-[1px] border-r-gray-400">
       <FilterPages zaps={zaps}/>
       </div>

        <div className="posts space-y-2 w-full pl-12 pr-6">
        {
          zaps?.map((zap)=>
          <PostBlock post={zap}/> 
          )
        }
        </div>

        <div className="hidden lg:block tags w-[30%]">
          Tag field
        </div>
      </div>

    </div>
  )
}
