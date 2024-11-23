import { Button } from '@/components/ui/button'
import Link from 'next/link'

import React from 'react'

const Hero = () => {
  return (
     <div className='flex flex-col justify-center items-center my-20'>
         <div className='justify-center text-center max-w-3xl'>
        <h2 className='font-bold text-[60px] text-slate-500'>Easy Meeting scheduling App</h2>
        <h2 className='text-xl mt-5 text-slate-500'>Calendly is your scheduling automation platform for eliminating the back- and-forth emails to find the perfect time and so much more.
        </h2>
        <div className='flex  gap-4 flex-col mt-5'>
            <h3>Sign up free from Google and Facebook</h3>
            <div className='flex justify-center gap-8'>
                <Button>Sign Up with Goggle</Button>
                <Button>Sign Up with Facebook</Button>
            </div>
             <hr />
            <h2><Link href='' className='text-primary'>Sign Up free With Email</Link>   No Money reqired </h2>
        </div>
    </div>
     </div>
  )
}

export default Hero