
import { useNavigate } from 'react-router-dom';
import {collection, addDoc, serverTimestamp} from "firebase/firestore";
import { db} from '../firebase';
import {useForm} from 'react-hook-form'
import {auth} from "../firebase"
import {useAuthState} from "react-firebase-hooks/auth"

export const Zaps = () => {

    const navigate = useNavigate();
    const [user] = useAuthState(auth)
    const {register,handleSubmit,reset,formState:{errors}} = useForm();

    const submitPost = async(data:any) =>{
     try{
         await addDoc(collection(db,'zaps'),
       {
        title:data.title,
        zap:data.zap,
        userId:user?.uid,
        userName:user?.displayName,
        userImage:user?.photoURL,
        createdAt:serverTimestamp(),
        likes:0,
       }
    ) 
   
    reset();
    navigate('/')
    console.log(data)
  }
    catch(err){
      console.log(err)    
    }
}
  return (

    <div className='h-[90vh] bg-gray-200 flex items-center'>

     <div className="w-[80%] mx-auto bg-white h-[80%] flex justify-center items-center">

      <form className=" relative w-3/5  p-3 shadow-2xl bg-white shadow-gray-400  flex flex-col items-center" onSubmit={handleSubmit(submitPost)}>
          <button className="absolute right-5 bg-red-600 px-2 text-sm text-white"
           onClick={()=>{
            //setZapState(false);
            navigate('/')
            }}>x</button>
        
        <input className="pl-2 py-2 my-2 border border-gray-400 w-[60%]"  type="text" placeholder="Title" {...register("title",{required:true})} />
        {errors.title && <span>Title is Required</span>}
        <input className="pl-2 py-5 my-2 border border-gray-400 w-[90%] "  type="text" placeholder="Your thoughts" {...register("zap",{required:true})} />
        {errors.zap && <span>You need soemthing to ZAP</span> }
        <button type="submit" className="py-2 px-6 my-4  rounded-md bg-orange-600 text-white textbase">Post</button>
      </form>

  
        </div>
        </div>
  )
}
