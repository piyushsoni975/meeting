"use client"
import { Button } from '@/components/ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div>
         <div className='flex items-center justify-between p-5 shadow-md'>
            <Image src ='/logo.svg' width={100} height={100} alt='logo'
            className='w-[150px] md:w-[200px]'/>
             <ul className='hidden md:flex gap-14 font-medium text-lg' >
                <li className='hover:text-primary transition-all duration-300 cursor-pointer'>product</li>
                <li className='hover:text-primary transition-all duration-300 cursor-pointer'>Price</li>
                <li className='hover:text-primary transition-all duration-300 cursor-pointer'>contact us</li>
                <li className='hover:text-primary transition-all duration-300 cursor-pointer'>About us</li>
             </ul>
             <div className='flex gap-5'>
                <LoginLink><Button variant='ghost'>Login</Button></LoginLink>
                <RegisterLink> <Button>get started</Button></RegisterLink>
               
             </div>
         </div>
    </div>
  )
}

export default Header