import { Link } from "react-router-dom"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import {useAuthState} from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"

export const NavBar:React.FC<{}> = () => {

  const [user,loading,errors] = useAuthState(auth);

  const navigate = useNavigate();
    
    const logOut  = ()=>{
        signOut(auth)
        .then(()=>
           alert("Signed Out")
       )
       .catch((err)=>alert(err))
       navigate('/')
       }
       
  return (
    <div className="w-[100%] nav py-3 bg-[#F3E4C2] text-[#212412] flex flex-row-reverse justify-between items-center px-2 sm:px-4">
      
       <div className="flex text-base md:text-lg p-2  space-x-8">
       
        <div className=" space-x-2  px-2">
        <Link to='/'>Home</Link>
        <Link to='login.tsx'>Sign In</Link>
        </div>
        { user && <div className="px-2"><button onClick={logOut} className="">Sign Out</button></div>}
        
        </div>
        {user
        &&
        <div className="userName text-xl md:text-2xl font-bold flex items-center space-x-5">
           {user.photoURL && <img className="w-[45px] border-2 border-white rounded-[50%]" src={user.photoURL} alt="" />}
          <h1>{user.displayName}</h1>
          </div>
        }  
          
    </div>
  )
}
