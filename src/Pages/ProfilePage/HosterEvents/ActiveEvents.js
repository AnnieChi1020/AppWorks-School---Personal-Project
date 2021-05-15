import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getHosterEvents } from "../../../utils/firebase.js";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Event = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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

function ActiveEvents() {
  const hosterId = "szKr1hWragbubtIilQnV";
  const [events, setEvents] = useState([]);

  const getHosterEventsData = async () => {
    const newEvents = await getHosterEvents(hosterId, 0);
    console.log(newEvents);
    setEvents(newEvents);
  };

  useEffect(() => {
    getHosterEventsData();
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
          <Button onClick={() => handleParticipantClick(event.eventId)}>
            取消活動
          </Button>
        </Event>
      ))}
    </Wrapper>
  );
}

export default ActiveEvents;
