import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserEvents, getEventInfo } from "../../../utils/firebase.js";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Title = styled.div`
  width: 90%;
  font-size: 20px;
  line-height: 30px;
  margin: 0 auto;
  margin-top: 10px;
  border-bottom: solid 1px #979797;
`;

const Event = styled.div`
  width: 90%;
  margin: 0 auto;
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

function UserApplyingEvents() {
  const userId = "U0001";
  const [events, setEvents] = useState([]);

  const getUserApplyingData = async () => {
    const applyingEvents = await getUserEvents(userId, 0);
    console.log(applyingEvents);
    let applyingEventArray = [];
    applyingEvents.map(async (eventId) => {
      const eventInfo = await getEventInfo(eventId);
      applyingEventArray.push(eventInfo);
      console.log(applyingEventArray);
    });
    setEvents(applyingEventArray);
    console.log(events);
  };

  useEffect(() => {
    getUserApplyingData();
    console.log(events);
  }, []);

  return (
    <Wrapper className="applying-events">
      <Title>審核中的活動</Title>
      {events.map((event, index) => (
        <Event key={index}>
          <EventImage src={event.eventCoverImage} />
          <EventDetail>
            <EventTitle>{event.eventTitle}</EventTitle>
          </EventDetail>

          {/* <Button onClick={() => handleCancelClick(event.eventId)}>
            取消報名
          </Button> */}
        </Event>
      ))}
    </Wrapper>
  );
}

export default UserApplyingEvents;
