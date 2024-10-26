import React from 'react'

import { Post as Ipost } from './home'
import { Likes } from './postLikes'
import { Comments } from './postComments'

export const PostBlock:React.FC<{post:Ipost}> = ({post}) => {
  
  return (
                //div containing each post box
                <div key={post.id} className="flex flex-col items-start border-b border-b-gray-400 p-5">
          
                <div className="post-block text-left">

                <div className="post-details">
      
                 {/* <img src={post.uImage} alt="" /> */}
                 <h1>{post.uName}</h1>
                 <h2 className="font-bold text-lg">{post.title}</h2>
                 <p>{post.zap}</p>
                 <br/>
      
                 </div>   

                <div className="engagement space-x-3 flex items-center bg-red-400">
                <Likes post={post}/>
                <Comments post={post}/>

                </div>

                </div>

                </div>
  )
}
