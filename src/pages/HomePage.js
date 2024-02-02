import React, { useState } from "react";

// import { db } from "../firebase";
// import { collection, addDoc } from "firebase/firestore";

import SideMenu from "./../components/SideMenu";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function HomePage() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Conference",
      start: "2024-02-01",
      end: "2024-02-03",
    },
    {
      id: 2,
      title: "Meeting",
      start: "2024-02-02T10:30:00+00:00",
      end: "2024-02-02T12:30:00+00:00",
    },
    {
      id: 3,
      title: "Lunch",
      start: "2024-02-02T12:00:00+00:00",
    },
    {
      id: 4,
      title: "Birthday Party",
      start: "2024-02-03T07:00:00+00:00",
    },
    {
      id: 5,
      title: "Meeting",
      start: "2024-02-02T14:30:00+00:00",
    },
    {
      id: 6,
      title: "Happy Hour",
      start: "2024-02-02T17:30:00+00:00",
    },
    {
      id: 7,
      title: "Dinner",
      start: "2024-02-02T20:00:00+00:00",
    },
  ]);

  const handleAddEvent = async (event) => {
    const { start, end } = event;
    let title = window.prompt("please enter event title");

    try {
      // await addDoc(collection(db, "events"), {
      //   start,
      //   end,
      //   title,
      // });
      setEvents((prev) => [...prev, { start, end, title, id: start }]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleEventClick = (info) => {
    setEvents((prev) => prev.filter((ev) => ev.id != info.event.id));
  };

  return (
    <>
      <SideMenu />
      <div
        style={{
          maxWidth: 900,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "100px auto",
        }}
      >
        <FullCalendar
          defaultView="timeGridWeek"
          plugins={[timeGridPlugin, interactionPlugin]}
          events={events}
          selectable={true}
          dateClick={handleAddEvent}
          eventClick={handleEventClick}
          select={handleAddEvent}
        />
      </div>
    </>
  );
}
