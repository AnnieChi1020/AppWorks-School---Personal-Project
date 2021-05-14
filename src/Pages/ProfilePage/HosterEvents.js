import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getHosterEvents } from "../../utils/firebase.js";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 8px;
  border: solid 1px #979797;
`;

const Event = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const EventImage = styled.img`
  width: 20%;
  height: 15vh;
  object-fit: cover;
  margin-right: 10px;
`;

const EventDetail = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const EventTitle = styled.div`
  font-size: 14px;
  font-height: 20px;
`;

const Button = styled.button`
  padding: 3px 5px;
  margin: 0 5px;
`;

function HosterEvents() {
  const hosterId = "H0001";
  const [events, setEvents] = useState([]);

  const getHosterEventsData = async () => {
    const newEvents = await getHosterEvents(hosterId);
    setEvents(newEvents);
    console.log(newEvents);
  };

  useEffect(() => {
    getHosterEventsData();
    console.log(events);
  }, []);

  let history = useHistory();
  const handleParticipantClick = (id) => {
    history.push(`profile/manage-participants/${id}`);
  };

  return (
    <Wrapper>
      {events.map((event, index) => (
        <Event key={index}>
          <EventImage src={event.eventCoverImage} />
          <EventDetail>
            <EventTitle>{event.eventTitle}</EventTitle>
          </EventDetail>
          <Button>編輯活動</Button>
          <Button onClick={() => handleParticipantClick(event.eventId)}>
            管理參加者
          </Button>
        </Event>
      ))}
    </Wrapper>
  );
}

export default HosterEvents;
