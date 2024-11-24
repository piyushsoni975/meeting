"use client";
import DaysList from '@/app/_utils/DaysList';
import React, { useEffect, useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '@/config/FirebaseConfig';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { toast } from 'sonner';

const Availability = () => {
  const [daysAvailable, setDaysAvailable] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    if (user) {
      getBusinessInfo();
    }
  }, [user]);

  const getBusinessInfo = async () => {
    const docRef = doc(db, 'Business', user.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const result = docSnap.data();
      setDaysAvailable(result.daysAvailable);
      setStartTime(result.startTime);
      setEndTime(result.endTime);
    } else {
      toast.error('No business info found.');
    }
  };

  const onHandleChange = (day, value) => {
    setDaysAvailable((prev) => ({
      ...prev,
      [day]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'Business', user?.email);
      await updateDoc(docRef, {
        daysAvailable,
        startTime,
        endTime,
      });
      toast.success('Changes updated!');
    } catch (error) {
      toast.error('Error saving changes!');
      console.error(error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Availability</h2>
      <hr className="my-7" />
      <div>
        <h2 className="font-bold">Availability Days</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-3">
          {DaysList.map((item, index) => (
            <div key={index} className="flex items-center gap-2 my-2">
              <Checkbox
                checked={daysAvailable[item.day]}
                onCheckedChange={(e) => onHandleChange(item.day, e)}
              />
              {item.day}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-bold mt-10">Availability Time</h2>
        <div className="flex gap-10">
          <div className="mt-3">
            <h2>Start Time</h2>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h2>End Time</h2>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Button className="mt-10" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default Availability;
