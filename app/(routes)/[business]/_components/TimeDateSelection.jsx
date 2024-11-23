import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const TimeDateSelection = ({ date, enableTimeSlot, handleDateChange, setSelectedTime, timeSlots, selectedTime }) => {
  return (
    <div className="md:col-span-2 flex px-4">
      <div className="flex flex-col">
        <h2 className="text-lg">Select Date & Time</h2>
        <Calendar
  mode="single"
  selected={date}
  onSelect={(newDate) => {
    console.log("Selected date:", newDate);
    handleDateChange(newDate);
  }}
  className="rounded-md border mt-5"
  disabled={(date) => date <= new Date()}
/>

      </div>
      <div className="flex flex-col w-full overflow-auto gap-4 p-5" style={{ maxHeight: "400px" }}>
        {enableTimeSlot && timeSlots.length > 0 ? (
          timeSlots.map((time, index) => (
            <Button
              key={index}
              className={`border-primary text-primary ${selectedTime === time ? 'bg-primary text-white' : ''}`}
              variant="outline"
              onClick={() => setSelectedTime(time)} // Correct handler for selecting time
            >
              {time}
            </Button>
          ))
        ) : (
          <div>No time slots available.</div>
        )}
      </div>
    </div>
  );
};

export default TimeDateSelection;
