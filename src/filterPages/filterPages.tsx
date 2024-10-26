
import { useNavigate } from 'react-router-dom'
import { Post as Ipost } from '../homePage/home';

export const FilterPages:React.FC<{zaps:Ipost[]}> = () => {
  
   const navigate = useNavigate();
  
  return (
 
        <ul className="px-2">
        <li><button>
          Recent
        </button></li>

        <li>
          <button onClick={()=>navigate('popular.tsx')}>
            Popular
          </button>
        </li>
        
        <li><button>
          Most Discussed
        </button></li>
       </ul>

  )
}
