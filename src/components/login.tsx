
import {auth, provider} from "../firebase"
import { useNavigate } from "react-router-dom"
import { signInWithPopup } from "firebase/auth"
import {useAuthState} from "react-firebase-hooks/auth"
import { useState } from "react"

export const Login = () => {

    const navigate=useNavigate();
    const [user] = useAuthState(auth);
    const [isSignedIn, setIsSignedIn] =useState<boolean>(false)
   
    const signIn = async ()=>{
    if(!user){  
try{
     const result = await signInWithPopup(auth,provider);
     alert("You're signed in")
     console.log(result)
     navigate('/')
}

catch(err){
     console.log(err)
}
}
     else
     setIsSignedIn(true)
}  


  return (
    <div>
        <h1>Create new account - Sign in with google</h1>
        <button onClick={signIn}>Sign In</button>
        
        {
        isSignedIn && <p>You are already Signed In.</p>          
        }

    </div>
  )
}
