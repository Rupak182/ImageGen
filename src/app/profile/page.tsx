'use client'
import { Post } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { motion } from "framer-motion";

export default function Page() {
    const  [loading,setLoading] = useState<boolean>(true);
    const [posts,setPosts] = useState<Post[]>([]);
    const fetchPosts = async ()=>{
        setLoading(true)
        try {
            const response = await fetch("/api/image");
            const data = await response.json();
            // console.log(data);
            setPosts(data)
        } catch (error) {
            // console.log(error)
        } finally{
            setLoading(false)
        }
    };

    
    useEffect(()=>{
        fetchPosts();

    },[])
  return (
    <div className="w-full min-h-dvh justify-center gap-3 items-center p-3 pt-[72px] grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {loading ?<div className="col-span-full  flex justify-center items-center"><BiLoaderCircle className='animate-spin'/></div> :
        <AnimatePresence mode="wait">
        {posts.map((post,index)=>(
          <motion.div  key={post.id}
          initial={{
            opacity:0,
            scale:0.9,
            filter:"blur(10px)"
          }}
          animate={{
            opacity:1,
            scale:1,
            filter:"blur(0px)"
          }}
          transition={
            {
              duration:0.2,
              delay:index*0.1
            }
          }

          
          className="w-full h-full  border rounded-md p-2.5">
               <Image src={post.url} key={post.id} width={250} height={250} alt={post.prompt} className="object-cover w-full "/>
            <p className="text-white/60">{post.prompt}</p>
          </motion.div>
        ))
      }
        </AnimatePresence>
        
        }
      
      
    </div>
  )
}
