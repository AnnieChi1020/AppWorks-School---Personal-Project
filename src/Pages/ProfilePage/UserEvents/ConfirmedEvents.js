import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserEvents,
  getEventInfo,
  getCurrentStatus,
  updateNewStatus,
} from "../../../utils/firebase.js";
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
  font-size: 16px;
  font-height: 20px;
`;

const EventTime = styled.div`
  font-size: 14px;
  font-height: 20px;
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 3px 5px;
  margin: 0 5px;
`;

function UserConfirmedEvents() {
  const userId = "RQwkmO7Byk5YsOGfvp8D";
  const [events, setEvents] = useState([]);

  const getApplyingEventsId = async () => {
    const applyingEvents = await getUserEvents(userId, 1);
    return applyingEvents;
  };

  const getApplyingEventsInfo = async () => {
    const eventIdArray = await getApplyingEventsId();
    let eventInfoArray = [];
    await eventIdArray.map(async (id) => {
      const event = await getEventInfo(id);
      eventInfoArray.push(event);
      setEvents([eventInfoArray]);
    });
    return eventInfoArray;
  };

  useEffect(() => {
    getApplyingEventsInfo();
  }, []);

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

  const handleCancelClick = async (eventId, userId) => {
    let currentStatus = await getCurrentStatus(eventId, userId);
    currentStatus.participantInfo.participantStatus = 9;
    updateNewStatus(eventId, userId, currentStatus);
  };

  if (events.length === 0) {
    return null;
  }

  return (
    <Wrapper className="applying-events">
      {events[0].map((event, index) => (
        <Event key={index}>
          <EventImage src={event.eventCoverImage} />
          <EventDetail>
            <EventTitle>{event.eventTitle}</EventTitle>
            <EventTime>{`${reformatTimestamp(
              event.startTime
            )} ~ ${reformatTimestamp(event.endTime)}`}</EventTime>
          </EventDetail>
          <Button
            onClick={(e) => {
              handleCancelClick(event.eventId, userId);
              e.target.textContent = "已取消";
            }}
          >
            取消報名
          </Button>
        </Event>
      ))}
    </Wrapper>
  );
}

export default UserConfirmedEvents;
