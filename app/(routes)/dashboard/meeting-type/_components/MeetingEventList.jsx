"use client";

import { Button } from "@/components/ui/button";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { 
  collection, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  getFirestore, 
  query, 
  where 
} from "firebase/firestore";
import { Clock, Copy, MapPin, Pen, Settings, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MeetingEventList = () => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [eventList, setEventList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [businessInfo,setBusinessInfo]=useState();

  useEffect(() => {
    if (user) {
      getEventList();
      BusinessInfo();
    }
  }, [user]);

  const getEventList = async () => {
    try {
      setIsLoading(true);
      const eventsQuery = query(
        collection(db, "MeetingEvent"),
        where("createdBy", "==", user?.email)
      );
      const querySnapshot = await getDocs(eventsQuery);
      const events = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEventList(events);
    } catch (error) {
      console.error("Error fetching event list:", error);
      toast.error("Failed to load events.");
    } finally {
      setIsLoading(false);
    }
  };

  const BusinessInfo = async () => {
   
      const docRef = doc(db, "Business", user.email);
      const docSnap = await getDoc(docRef);
       setBusinessInfo(docSnap.data());
   
  };

  const onDeleteMeetingEvent = async (event) => {
    try {
      await deleteDoc(doc(db, "MeetingEvent", event.id));
      toast("Meeting Event Deleted!");
      getEventList();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event.");
    }
  };

  const onCopyClickHandler = (event) => {
    if (!businessInfo || !event) {
      toast.error("Unable to copy link. Missing information.");
      return;
    }
  
    const meetingEventUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${businessInfo.businessName}/${event.id}`;
    
    try {
      navigator.clipboard.writeText(meetingEventUrl);
      toast("Link Copied!");
    } catch (error) {
      console.error("Error copying link:", error);
      toast.error("Failed to copy link.");
    }
  };
  
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {isLoading ? (
        <h2 className="text-center text-gray-500">Loading events...</h2>
      ) : eventList.length > 0 ? (
        eventList.map((event) => (
          <div
            key={event.id}
            className="border shadow-md border-t-8 rounded-lg p-5 flex flex-col gap-3"
          >
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Settings className="text-gray-500 cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="flex gap-2">
                    <Pen /> Edit
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex gap-2"
                    onClick={() => onDeleteMeetingEvent(event)}
                  >
                    <Trash /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h2 className="font-medium text-xl">{event?.eventName}</h2>
            <div className="flex justify-between text-gray-500">
              <h2 className="flex gap-2 items-center">
                <Clock /> {event.duration || "N/A"} Min
              </h2>
              <h2 className="flex gap-2 items-center">
                <MapPin /> {event.locationType?.name || "N/A"}
              </h2>
            </div>
            <hr />
            <div className="flex justify-between">
              <h2
                className="flex gap-2 items-center text-sm text-primary cursor-pointer"
                onClick={() => 
                  onCopyClickHandler(event)
                 
                }
              >
                <Copy className="h-4 w-4" /> Copy Link
              </h2>
              <Button
                variant="outline"
                className="border-primary rounded-full text-primary"
              >
                Share
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h2 className="text-center text-gray-500">No events found.</h2>
      )}
    </div>
  );
};

export default MeetingEventList;
