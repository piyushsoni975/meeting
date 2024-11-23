"use client";
import React, { useEffect, useState } from "react";
import MeetingTimeDateSelection from "../_components/MeetingTimeDateSelection";
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";

const SharedMeetingEvent = ({ params: rawParams }) => {
  const db = getFirestore(app);
  const [params, setParams] = useState(null);
  const [businessInfo, setBusinessInfo] = useState(null);
  const [eventInfo, setEventInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await rawParams; // Unwrap the promise
      setParams(resolvedParams);
    }
    resolveParams();
  }, [rawParams]);

  useEffect(() => {
    if (params?.business && params?.meetingEventId) {
      getMeetingBusinessAndEventDetails();
    }
  }, [params]);

  const getMeetingBusinessAndEventDetails = async () => {
    try {
      setLoading(true);

      // Fetch Business Info
      const businessQuery = query(
        collection(db, "Business"),
        where("businessName", "==", params.business)
      );
      const businessSnapshot = await getDocs(businessQuery);

      if (!businessSnapshot.empty) {
        const businessData = businessSnapshot.docs[0].data(); // Assuming only one match
        setBusinessInfo(businessData);
      }

      // Fetch Meeting Event Info
      const eventRef = doc(db, "MeetingEvent", params.meetingEventId);
      const eventSnapshot = await getDoc(eventRef);

      if (eventSnapshot.exists()) {
        setEventInfo(eventSnapshot.data());
      }
    } catch (error) {
      console.error("Error fetching meeting event details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      {eventInfo ? (
        <MeetingTimeDateSelection eventInfo={eventInfo} businessInfo={businessInfo}/>
      ) : (
        <div className="text-center text-gray-500">Event information is not available.</div>
      )}
    </div>
  );
};

export default SharedMeetingEvent;
