"use client"
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from '@/config/FirebaseConfig';
import { useRouter } from 'next/navigation';
import MeetingType from './meeting-type/page';

function Page() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // Check if the user is loaded before executing business logic
    if (user) {
      isBusinessRegistered();
    } else {
      setLoading(false); // Set loading to false if no user is found
    }
  }, [user]);

  const isBusinessRegistered = async () => {
    try {
      const docRef = doc(db, "Meeting", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
        //router.replace('/create-business');
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
    <MeetingType/>
    </div>
  );
}

export default Page;
