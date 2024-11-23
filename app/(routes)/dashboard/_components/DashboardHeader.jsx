"use client"
import { LoginLink, LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DashboardHeader = () => {
  const {user}=useKindeBrowserClient();

  return (
    <div className='p-4 px-10'>
      
        <div className='flex items-center float-right'>
        <ChevronDown/>
        <DropdownMenu>
  <DropdownMenuTrigger>Detail</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>
      <LogoutLink>Logout</LogoutLink>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

        </div>
    </div>
  )
}

export default DashboardHeader