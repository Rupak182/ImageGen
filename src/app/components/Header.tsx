'use client'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BiLoaderCircle } from "react-icons/bi";

export default function Header() {
  const { data: session, status } = useSession();
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  useEffect(() => {
    if (status !== "loading")
      setInitialLoading(false);
  }, [status, session])

  // console.log(session)
  return (
    <div className='w-full h-[60px] bg-black border-b-2 max-w-7xl z-50  border-white/60 p-3 flex justify-between items-center fixed top-0'>
      <Link href='/'><h2 className='font-bold  text-xl'>Stable Max</h2></Link>
      {initialLoading && status === 'loading' ? (<BiLoaderCircle className='animate-spin ' />)
        : !session ?
          (
            <div className="_menu">
              <Button onClick={() => signIn("google")}>Login</Button>
            </div>
          ) :
          (<div className='flex gap-3 justify-center items-center'>
            <Button variant={'destructive'} onClick={() => signOut()}>Logout</Button>
            <Link href={"/profile"}>
              <Avatar>
                <AvatarImage src={session.user?.image || ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </div>
          )
      }
    </div>


  )
}
