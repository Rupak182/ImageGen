'use client'  //will not make all client side ( just as before)
import {motion} from 'framer-motion'
import { usePathname } from 'next/navigation'

import React, { ReactNode } from 'react'

export default function Template({children}:{children:ReactNode}) {
    const path = usePathname();
  return (
    <motion.div 
    initial={{
        scale:0.95,
        opacity:0,
        filter:'blur(10px)'
    }}

    animate={{
        scale:1,
        opacity:1,
        filter:'blur(0px)',
    }}

    transition={{
        duration:0.35
    }}

    className='border border-violet-500'>
      {children}
    </motion.div>
  )
}
