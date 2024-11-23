"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Image } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LocationOption from '@/app/_utils/LocationOption';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '@/config/FirebaseConfig';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const MeetingForm = ({setFormValue}) => {
  const [eventName, setEventName] = useState();
  const [duration, setDuration] = useState(30);
  const [locationType, setLocationType] = useState();
  const [locationUrl, setLocationUrl] = useState();
  const {user}=useKindeBrowserClient();
   const db=getFirestore(app);
   const router=useRouter();

  useEffect(()=>{
     setFormValue({
        eventName:eventName,
        duration:duration,
        locationType:locationType,
        locationUrl:locationUrl
     })
  },[eventName,duration,locationType,locationUrl])
  const onCreateClick= async()=>{
       const id=Date.now().toString();
              await setDoc(doc(db,'MeetingEvent',id),{
                id:id,
                eventName:eventName,
                duration:duration,
                locationType:locationType,
                locationUrl:locationUrl,
                businessId:doc(db,'Business',user?.email),
                createdBy:user?.email

              }).then(resp=>{
                toast('New Meeting Event Created!');
                router.replace('/dashboard/meeting-type')
              })
  }
  return (
    <div className="p-8">
      <h2 className="flex gap-2">
        <ChevronLeft />
        Cancel
      </h2>
      <div className="mt-4">
        <h2 className="font-bold text-2xl my-4">Create New Event</h2>
        <hr />
      </div>
      <div className="flex flex-col gap-3 my-4">
        <h2 className="font-bold">Event Name *</h2>
        <Input
          placeholder="Name of your Meeting Event"
          onChange={(event) => setEventName(event.target.value)}
        />

        <h2>Duration *</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button varient="outline" className="max-w-40">
              {duration} Min
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setDuration(30)}>30 Min</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(45)}>45 Min</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(60)}>60 Min</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(90)}>90 Min</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <h2 className="font-bold">Location *</h2>
        <div className="grid grid-cols-4 gap-3">
          {LocationOption.map((option, index) => (
            <div
              key={index}
              className={`border flex flex-col justify-center items-center p-3 rounded-lg hover:bg-green-500 hover:border-primary cursor-pointer ${
                locationType?.name === option.name && 'bg-green-500 border-primary'
              }`}
              onClick={() => setLocationType(option)}
            >
              <img src={option.icon} width={30} height={30} alt={option.name} />
              <h2>{option.name}</h2>
            </div>
          ))}
        </div>
        {locationType && (
          <>
            <h2 className="font-bold">Add {locationType.name} Url *</h2>
            <Input
              placeholder="Add URL"
              onChange={(event) => setLocationUrl(event.target.value)}
            />
          </>
        )}
      </div>
      <Button
        className="w-full mt-9"
        disabled={!eventName || !duration || !locationType || !locationUrl}
      onClick={()=>onCreateClick()}>
        Create
      </Button>
    </div>
  );
};

export default MeetingForm;
