import { Input } from '@/components/ui/input'
import React from 'react'

function UserFormInfo ({setUserName,setUserEmail,setUserNote}) {
  return (
    <div className='p-4 px-8 flex flex-col gap-3'>
        
        <h2 className='font-bold text-xl'>Enter Details</h2>
        <div>
            <h2>Name *</h2>
            <Input onChange={(event)=>setUserName(event.target.value)}/>
        </div>

        <div>
            <h2>Email *</h2>
            <Input onChange={(event)=>setUserEmail(event.target.value)}/>
        </div>

        <div>
            <h2>Shared any Notes </h2>
            <Input onChange={(event)=>setUserNote(event.target.value)}/>
        </div>
        <div>
            <h2 className='text-xs
            text-gray-500'>By Proceeding, you read and agree Piyush terms and condition</h2>
        </div>

        
    </div>
  )
}

export default UserFormInfo