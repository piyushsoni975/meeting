"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SheduledMeetingList from "./_components/SheduledMeetingList";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { format, isFuture, parseISO } from "date-fns";

const ScheduledMeetings = () => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [meetingList, setMeetingList] = useState([]); // Initialize as an empty array

  useEffect(() => {
    if (user) getScheduledMeetings();
  }, [user]);

  const getScheduledMeetings = async () => {
    try {
      const q = query(
        collection(db, "ScheduledMeetings"),
        where("businessEmail", "==", user.email)
      );
      const querySnapshot = await getDocs(q);

      const meetings = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Ensure timestamps are parsed into valid Date objects
        data.formatedTimeStamp = parseISO(data.formatedTimeStamp);
        meetings.push(data);
      });

      setMeetingList(meetings);
    } catch (error) {
      console.error("Error fetching scheduled meetings:", error);
    }
  };

  const filterMeetingList = (type) => {
    if (type === "upcoming") {
      return meetingList.filter((item) => isFuture(item.formatedTimeStamp));
    }
    if (type === "expire") {
      return meetingList.filter((item) => !isFuture(item.formatedTimeStamp));
    }
    return [];
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Scheduled Meetings</h2>
      <hr className="my-5" />
      <Tabs defaultValue="upcoming" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expire">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <SheduledMeetingList meetingList={filterMeetingList("upcoming")} />
        </TabsContent>
        <TabsContent value="expire">
          <SheduledMeetingList meetingList={filterMeetingList("expire")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScheduledMeetings;
