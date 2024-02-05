import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getDatabase,
  ref,
  update,
  child,
  push,
  query,
  get,
  remove,
} from "firebase/database";

import SideMenu from "./../components/SideMenu";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function HomePage({ userId }) {
  const [events, setEvents] = useState([]);

  const db = getDatabase();

  useEffect(() => {
    try {
      //initializing events
      const eventsRef = query(ref(db, "events"));
      get(eventsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const events = Object.keys(data).map((key) => ({
              id: key,
              title: data[key].title,
              start: data[key].start,
              end: data[key].end,
              //Todo check this
              userId: data[key].userId,
              //event color for current user is blue and for other users is orange
              backgroundColor:
                userId !== data[key].userId ? "#d97a00" : "#1976d2",
              borderColor: userId !== data[key].userId ? "#d97a00" : "#1976d2",
            }));
            setEvents(events);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleAddEvent = async (event) => {
    const { start, end } = event;
    try {
      let title = await window.prompt("please enter event title");

      // event entry.
      const eventData = {
        userId,
        title,
        start,
        end,
      };

      // Get a key for new event.
      const newEventKey = push(child(ref(db), "events")).key;

      // Write the new event's data simultaneously in the events list and the user's event list.
      const updates = {};
      updates["/events/" + newEventKey] = eventData;
      updates["/user-events/" + userId + "/" + newEventKey] = eventData;

      update(ref(db), updates);
      setEvents((prev) => [
        ...prev,
        { start, end, title, id: newEventKey, userId },
      ]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleDeletClick = async (info) => {
    try {
      //getting selected event from db to check userId
      let databaseRef = ref(db, "events/");
      const uidRef = child(databaseRef, info.event.id);

      let data = null;
      const snapshot = await get(uidRef);

      if (snapshot.exists()) {
        data = snapshot.val();
      }

      //check if user is deleting there events or someone else events, is they are deleting someone else event function will return
      if (!data || data.userId !== userId) return;

      // deleting from events
      databaseRef = ref(db, "events/" + info.event.id);
      await remove(databaseRef);

      //deleting from users events
      const databaseRef2 = ref(
        db,
        "user-events/" + userId + "/" + info.event.id
      );
      await remove(databaseRef2);

      //update events list
      setEvents((prev) => prev.filter((ev) => ev.id != info.event.id));
    } catch (error) {
      console.log(error);
    }
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
          margin: "auto",
        }}
      >
        <FullCalendar
          defaultView="timeGridWeek"
          plugins={[timeGridPlugin, interactionPlugin]}
          events={events}
          selectable={true}
          dateClick={handleAddEvent}
          eventClick={handleDeletClick}
          select={handleAddEvent}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  userId: state.auth.uid,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
