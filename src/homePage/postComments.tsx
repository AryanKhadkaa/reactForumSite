import React, { useEffect, useState } from 'react'

import { Post as Ipost } from './home'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { collection,addDoc, serverTimestamp, query, getDocs, orderBy } from 'firebase/firestore'
import { useForm } from 'react-hook-form'

interface Comment{
    comment:string,
    commentId:string,
    postId:string,
    uName:string,
    uImage:string
  }
  
export const Comments:React.FC<{post:Ipost}> = ({post}) => {

const [user] = useAuthState(auth)

const [comments,setComments] = useState<Comment[]>([])
const {handleSubmit,register,reset} = useForm()
    //Storing comments to DB 
 const storeComment = async(data:any) =>{
    user && 
      await addDoc(collection(db,"comments"),{
        comment:data.comment,
        postId:selectedPostId, //postId provided to commentList so as to recognice the post where comment is made
        uName:user?.displayName,
        uImage:user?.photoURL,
        createdAt:serverTimestamp()
        
    })
    reset();
    fetchComments(); //function call to fetch comment when a new comment is made
  
    }
  
  //Fetching Comment details from the firestore db
  
    const fetchComments= async ()=>{
      const q = query(collection(db,"comments"),orderBy('createdAt','desc'));
      const querySnapshot = await getDocs(q)
      const extractedComments = querySnapshot.docs.map((doc)=>({
        
        comment:doc.data().comment,
        commentId:doc.id,
        postId:doc.data().postId,
        uName:doc.data().uName,
        uImage:doc.data().uImage,
        createdAt:doc.data().createdAt
  
      }))
      setComments(extractedComments)
  
  }
       
  useEffect(()=>{
      fetchComments()
  },[])
  
  const [selectedPostId, setSelectedPostId] = useState<string | null>('') //state for storing Post Id of selected/targeted Post
  //Toggling Comment Bar
  const toggleComment = (currPostId:string)=>{
    setSelectedPostId((prevPostId) => (prevPostId === currPostId ? null : currPostId))
  }

  
  return (
    <>


        <div className="comments-block w-full">
            <div className='bg-gray-300'>
                 <span>{}</span>
                 <button className="bg-gray-900 text-white px-2 rounded-sm shadow-xl"
                   onClick={()=>toggleComment(post.id)}>
                  Rezap
                </button> 
          </div>

        {
          post.id === selectedPostId && 
          
          <form onSubmit={handleSubmit(storeComment)} className="relative bg-white  space-x-4 my-3 p-2">
        
        <input type="text" placeholder="Add a comment" className="px-3 py-2 border rounded-3xl h-[55px] w-[100%]" {...register('comment',{required:true})}/>
        <button type="submit" className="hidden sm:block absolute md:w-[120px] right-4 top-4 bg-sky-600 text-white p-2 rounded-3xl">Add comment</button>
        <button type="submit" className="sm:hidden absolute text-sm md:w-[120px] right-4 top-4 bg-sky-600 text-white p-2 rounded-xl">Add</button>

        </form>
        }
        
        <div className="display-comments">
          {
            comments.map((comment)=>
            comment.postId == selectedPostId &&
                <div key={comment.commentId} className="text-left border-b border-b-gray-400 space-y-2 mx-5 my-2">
                 
                   <h1>{comment.uName}</h1>
                   <p>{comment.comment}</p>
                   <button className=" text-white text-sm bg-sky-600 rounded-sm px-2 mb-2">Like</button>
                </div>
                
            )
          }
          
        </div>
         
       </div>
    </>
  )
}
