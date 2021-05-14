import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { getEvents } from "../../utils/firebase.js";
import { useHistory, useParams } from "react-router-dom";

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  padding: 10px 0;
`;

const Event = styled.div`
  width: 33%;
  padding: 5px;
`;

const EventImage = styled.img`
  width: 100%;
  height: 20vw;
  object-fit: cover;
`;

const EventTitle = styled.div`
  font-size: 14px;
  margin-top: 5px;
`;

function Events() {
  const [events, setEvents] = useState([]);
  const getAllEvents = async () => {
    const newEvents = await getEvents();
    setEvents(newEvents);
    console.log(newEvents);
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  let history = useHistory();
  const handleEventClick = (id) => {
    history.push(`/events/${id}`);
  };

  return (
    <Wrapper>
      {events.map((event, eventId) => (
        <Event key={eventId} onClick={() => handleEventClick(event.eventId)}>
          <EventImage src={event.eventCoverImage} />
          <EventTitle>{event.eventTitle}</EventTitle>
        </Event>
      ))}
    </Wrapper>
  );
}

export default Events;
