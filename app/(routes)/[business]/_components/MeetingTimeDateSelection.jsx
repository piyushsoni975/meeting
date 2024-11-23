"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Clock, MapPin, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format, formatDate } from "date-fns";
import TimeDateSelection from "./TimeDateSelection";
import UserFormInfo from "./UserFormInfo";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { toast } from "sonner";
import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import { useRouter } from "next/navigation";
import Email from "@/emails";

const MeetingTimeDateSelection = ({ eventInfo, businessInfo }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [enableTimeSlot, setEnableTimeSlot] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userNote, setUserNote] = useState("");
  const [step, setStep] = useState(1);
  const [prevBusinessBooking, setPrevBusinessBooking] = useState([]);
  const db = getFirestore(app);
  const plunk=new Plunk(process.env.NEXT_PUBLIC_PLUNK_API_KEY)

  const router = useRouter();

  useEffect(() => {
    if (eventInfo?.duration) {
      createTimeSlot(eventInfo.duration);
    }
  }, [eventInfo]);

  const createTimeSlot = (interval) => {
    const startTime = 8 * 60; // 8 AM in minutes
    const endTime = 22 * 60; // 10 PM in minutes
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
    });
    setTimeSlots(slots);
  };

  const handleDateChange = async (newDate) => {
    if (!newDate || isNaN(new Date(newDate))) {
      console.error("Invalid date selected:", newDate);
      return;
    }

    setDate(newDate);
    const day = format(newDate, "EEEE"); // Get the day of the week
    if (businessInfo?.daysAvailable?.[day]) {
      await getPrevEventBooking(newDate);
      setEnableTimeSlot(true);
    } else {
      setEnableTimeSlot(false);
    }
  };

  const handleScheduleEvent = async () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(userEmail)) {
      toast("Enter a valid email address!");
      return;
    }

    if (!userName) {
      toast("Please fill in all the fields!");
      return;
    }

    const docId = Date.now().toString();
   
      await setDoc(doc(db, "ScheduledMeetings", docId), {
        businessName: businessInfo?.businessName || "N/A", // Fallback to "N/A" if businessInfo is null
        businessEmail: businessInfo?.businessEmail || "N/A",
        selectedDate: date,
        formatDate:format(date,'PPP'),
        duration: eventInfo?.duration || "N/A",
        locationUrl: eventInfo?.locationUrl || "N/A",
        eventId: eventInfo?.id || "N/A",
        id: docId,
        userEmail: userEmail,
        userName: userName,
        userNote: userNote,
      }).then(resp=>{
        toast("Meeting Scheduled Sussesfully !")
        sendEmail(userName);
      })
      
 
  };

  const sendEmail = async (user) => {
  
      const emailHtml = await render(
        <Email
          businessName={businessInfo?.businessName}
          date={format(date, 'PPP').toString()}
          duration={eventInfo?.duration}
          meetingUrl={eventInfo?.locationUrl}
          userFirstName={user}
        />
      );
  
      plunk.emails.send({
        to:userEmail,
        subject:"Meeting Sheduled Details",
        body :emailHtml
      }).then(resp=>{
        console.log(resp)
        router.replace('/confirmation')
      })

   
  };
  

  const getPrevEventBooking = async (date_) => {
    try {
      const q = query(
        collection(db, "ScheduledMeetings"),
        where("selectedDate", "==", date_),
        where("eventId", "==", eventInfo.id)
      );

      const querySnapshot = await getDocs(q);
      const bookings = [];
      querySnapshot.forEach((doc) => {
        bookings.push(doc.data());
      });
      setPrevBusinessBooking(bookings);
    } catch (error) {
      console.error("Error fetching previous bookings:", error);
    }
  };

  return (
    <div className="p-5 py-10 shadow-lg m-5 border-t-8 mx-10 md:mx-26 lg:mx-56 my-10">
      <Image src="/logo.svg" alt="logo" width={150} height={150} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        <div className="pt-4 border-r">
          <h2>{businessInfo?.businessName || "Business Name"}</h2>
          <h2 className="font-bold text-2xl">
            {eventInfo?.eventName || "Meeting Name"}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock />
              {eventInfo?.duration} Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin />
              {eventInfo?.locationType?.name || "N/A"} Meeting
            </h2>
            <h2 className="flex gap-2">
              <CalendarCheck />
              {format(date, "PPP") || "N/A"}
            </h2>
            {selectedTime && (
              <h2 className="flex gap-2">
                <Timer />
                {selectedTime || "N/A"}
              </h2>
            )}

            <Link
              href={eventInfo?.locationUrl || "#"}
              className="text-primary"
            >
              {eventInfo?.locationUrl || "No URL"}
            </Link>
          </div>
        </div>

        {/* Step Handling */}
        {step === 1 ? (
          <TimeDateSelection
            date={date}
            enableTimeSlot={enableTimeSlot}
            handleDateChange={handleDateChange}
            setSelectedTime={setSelectedTime}
            timeSlots={timeSlots}
            selectedTime={selectedTime}
            prevBusinessBooking={prevBusinessBooking}
          />
        ) : (
          <UserFormInfo
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserNote={setUserNote}
          />
        )}
      </div>
      <div className="flex gap-3 justify-end">
        {step === 2 && (
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
        )}
        {step === 1 ? (
          <Button
            className="mt-10 float-right"
            onClick={() => setStep(step + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            disabled={!userEmail?.trim() || !userName?.trim()}
            onClick={handleScheduleEvent}
          >
            Schedule
          </Button>
        )}
      </div>
    </div>
  );
};

export default MeetingTimeDateSelection;
