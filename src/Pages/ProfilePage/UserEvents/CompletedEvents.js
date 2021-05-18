import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserEvents,
  getEventInfo,
  getCurrentStatus,
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

const NoEvent = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 10px 0;
  font-size: 16px;
  font-height: 24px;
  margin-top: 20px;
  text-align: center;
`;

function UserCompletedEvents() {
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
      const startT = event.startTime.seconds * 1000;
      const currentT = new Date().getTime();
      const currentStatus = await getCurrentStatus(id, userId);
      if (startT <= currentT) {
        const eventInfo = {
          id: event.eventId,
          image: event.eventCoverImage,
          title: event.eventTitle,
          startTime: reformatTimestamp(event.startTime),
          endTime: reformatTimestamp(event.endTime),
          address: event.eventAddress,
          userStatus: currentStatus.participantInfo.participantStatus,
          attend: currentStatus.participantInfo.participantAttended,
          rating: currentStatus.participantInfo.participantRating,
        };
        eventInfoArray.push(eventInfo);
      }
      // const eventInfo = {
      //   id: event.eventId,
      //   image: event.eventCoverImage,
      //   title: event.eventTitle,
      //   startTime: reformatTimestamp(event.startTime),
      //   endTime: reformatTimestamp(event.endTime),
      //   address: event.eventAddress,
      //   userStatus: currentStatus.participantInfo.participantStatus,
      //   attend: currentStatus.participantInfo.participantAttended,
      //   rating: currentStatus.participantInfo.participantRating,
      // };
      // eventInfoArray.push(eventInfo);
      setEvents([...eventInfoArray]);
    });
  };

  useEffect(() => {
    getApplyingEventsInfo();
  }, []);

  useEffect(() => {
    console.log(events);
  }, [events]);

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

  let history = useHistory();
  const handleCommentClick = (id) => {
    history.push(`profile/comments/${id}`);
  };

  if (events.length === 0) {
    return (
      <Wrapper>
        <NoEvent>沒有活動喔</NoEvent>
      </Wrapper>
    );
  }
  return (
    <Wrapper className="applying-events">
      {events.map((event, index) => (
        <Event key={index}>
          <EventImage src={event.image} />
          <EventDetail>
            <EventTitle>{event.title}</EventTitle>
            <EventTime>{event.startTime}</EventTime>
            <EventTime>{event.endTime}</EventTime>
          </EventDetail>
          {console.log(event.attend)}
          {event.attend === true && event.rating === 0 && (
            <Button onClick={() => handleCommentClick(event.id)}>
              評價活動
            </Button>
          )}
          {event.attend === true && event.rating !== 0 && (
            <Button>已評價活動</Button>
          )}

          {event.attend === false && <Button>待確認出席</Button>}
        </Event>
      ))}
    </Wrapper>
  );
}

export default UserCompletedEvents;
