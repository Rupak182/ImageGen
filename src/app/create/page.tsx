'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  prompt: z.string().min(7,"Prompt must be atleast 7 characters long"),
})


export default function Page() {
  const [outputImg , setOutputImg] = useState<string| null>(null);
  const [inputPrompt ,setInputPrompt] = useState<string>("");
  const [loading,setLoading]= useState<boolean>(false);

  const {toast} = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const response = await fetch("/api/image",{
        method:"POST",
        body:JSON.stringify(values)
      })
      const data = await response.json();

      if(response.status === 200)
      {
        // console.log(data.url)
        setOutputImg(data.url)
      }
      else{
        // console.log(data.error);
        toast({variant:'destructive' ,description:data.error})
      }
    } catch (error) {
      // console.log(error)
    } finally {
      setLoading(false)
    }

  } 
  
  
  return (
    <div className='w-full p-3 flex justify-start items-center h-dvh pt-[72px] flex-col'>
      <div className='w-full border  p-3'>
        <h1 className='text-center font-bold text-4xl'>Create</h1>
        <p className='text-center mt-4'>
          Generate Stunning Images From Text
        </p>

      </div>
      <div className="flex border  w-full gap-3 h-[100dvh-200px] flex-col lg:flex-row ">
        <div className="_form lg:flex-[2] border  flex justify-center items-start flex-col">
            <p className='text-white/80 text-sm '>Type your prompt below to create a image of your imagination</p>
            <div className='flex gap-2  w-full border '>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex gap-2 w-full">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className='w-full min-h-full lg:max-w-[70%]'>
              <FormControl>
              <Input {...field} placeholder="a cat sitting over a sofa..." className='w-full transition-all border-white placeholder:text-white/50'/>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={loading} type="submit">Generate</Button>
      </form>
    </Form>
            </div>
        </div>
        <div className="_output min-h[300px] lg:min-h-full lg:h-full  lg:flex-[1]   bg-white/5 rounded-lg relative overflow-hidden ">
       {outputImg ?
       <Image src={outputImg} className='w-full h-full object-contain' alt='output' width={300} height={300} />:
        <div className='w-full h-full  flex justify-center items-center text-white/70  text-center p-3'>
          Enter your prompt and hit generate
        </div>}
        </div>
      </div>
    </div>
  )
}
