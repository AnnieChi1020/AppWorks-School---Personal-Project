import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { getEvents } from "../../utils/firebase.js";
import { useHistory, useParams } from "react-router-dom";

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 20px;
  padding: 10px 0;
`;

const Event = styled.div`
  height: 30vh;
  flex-grow: 1;
  margin: 5px;
  position: relative;
`;

const EventImage = styled.img`
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
`;

const EventTime = styled.div`
  font-size: 12px;
  margin-top: 5px;
`;

const EventTitle = styled.div`
  font-size: 16px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  padding: 5px 10px;
  background-color: #b3b3b35e;
`;

function PastEvents() {
  const [events, setEvents] = useState([]);
  const getPastEvents = async () => {
    const newEvents = await getEvents(1);
    let eventsArray = [];
    newEvents.map((event) => {
      const pastEvent = {
        id: event.eventId,
        image: event.eventCoverImage,
        title: event.eventTitle,
        startTime: reformatTimestamp(event.startTime),
        endTime: reformatTimestamp(event.endTime),
      };
      eventsArray.push(pastEvent);
      console.log(pastEvent);
    });
    setEvents(eventsArray);
  };

  const getDay = (day) => {
    const dayArray = ["日", "一", "二", "三", "四", "五", "六"];
    return dayArray[day];
  };

  const reformatTimestamp = (timestamp) => {
    const year = timestamp.toDate().getFullYear();
    const month = timestamp.toDate().getMonth() + 1;
    const date = timestamp.toDate().getDate();
    const day = getDay(timestamp.toDate().getDay());
    const time = timestamp.toDate().toTimeString().slice(0, 5);
    const reformatedTime = `${year}-${month}-${date}(${day}) ${time}`;
    return reformatedTime;
  };

  useEffect(() => {
    getPastEvents();
  }, []);

  useEffect(() => {
    console.log(events);
  }, [events]);

  let history = useHistory();
  const handleEventClick = (id) => {
    history.push(`/past-events/${id}`);
  };

  return (
    <Wrapper>
      {events.map((event, index) => (
        <Event key={index}>
          <EventImage src={event.image}></EventImage>
          {/* <EventTitle>{event.startTime}</EventTitle> */}
          <EventTitle>{event.title}</EventTitle>
        </Event>
      ))}
    </Wrapper>
  );
}

export default PastEvents;
