import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SheduledMeetingList = ({ meetingList = [] }) => {
//   if (!meetingList.length) {
//     return <div>No scheduled meetings found.</div>;
//   }

  return (
    <div>
      {meetingList.map((meeting, index) => (
        <Accordion type="single" collapsible key={index}>
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger>{meeting?.formatedDate || "No Date Available"}</AccordionTrigger>
            <AccordionContent>
              <p>
                <strong>Meeting Name:</strong> {meeting?.eventName || "N/A"}
              </p>
              <p>
                <strong>Scheduled Time:</strong> {meeting?.formatedTimeStamp || "N/A"}
              </p>
              <p>
                <strong>Notes:</strong> {meeting?.userNote || "No notes provided"}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default SheduledMeetingList;
