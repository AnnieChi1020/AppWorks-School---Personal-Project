import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserEvents,
  getEventInfo,
  getCurrentStatus,
} from "../../../utils/firebase.js";
import { useSelector } from "react-redux";
import { Col, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const EventsContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Events = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  margin: 0 auto;
  padding: 20px 0;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const EventInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const EventStatus = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  padding-top: 15px;
  justify-content: flex-end;
`;

const EventText = styled.div`
  font-size: 12px;
  line-height: 20px;
  margin-top: 5px;
`;

const NoEvent = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 10px 0;
  font-size: 16px;
  line-height: 24px;
  margin-top: 20px;
  text-align: center;
`;

const CurrentStatus = styled.div`
  font-size: 14px;
  line-height: 20px;
  padding: 3px 8px;
  position: absolute;
  top: 10px;
  left: 0px;
  background-color: rgb(251, 251, 251, 0.6);
  color: rgb(0, 0, 0, 0.9);
`;

const RateButton = styled.button`
  width: 100px;
  font-size: 14px;
  line-height: 20px;
  padding: 3px 5px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #ebedef66;
`;

const styles = {
  cardImage: {
    objectFit: "cover",
    width: "100%",
    height: "150px",
    cursor: "pointer",
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: "16px",
  },
  cardCol: {
    overflow: "hidden",
  },
};

function UserCompletedEvents() {
  const userId = useSelector((state) => state.isLogged.userId);
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
      if (event.eventStatus === 1) {
        const userDetail = await getCurrentStatus(id, userId);
        const userRate = userDetail.participantInfo.participantRating;
        const userAttend = userDetail.participantInfo.participantAttended;
        event.userRate = userRate;
        event.userAttend = userAttend;

        console.log(event);
        eventInfoArray.push(event);
      }
      setEvents([eventInfoArray]);
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
    const reformatedTime = `${year}-${month}-${date} (${day})`;
    return reformatedTime;
  };

  let history = useHistory();
  const handleEventClick = (e) => {
    console.log(e);
    history.push(`/events/${e}`);
  };

  const handleCommentClick = (id) => {
    history.push(`profile/comments/${id}`);
  };

  if (events.length === 0) {
    return null;
  }

  // if (events[0].length === 0) {
  //   return (
  //     <EventsContainer>
  //       <NoEvent>沒有活動喔</NoEvent>
  //     </EventsContainer>
  //   );
  // }

  return (
    <EventsContainer className="applying-events">
      <Events>
        {events[0].map((event, index) => (
          <Col className="p-0" style={styles.cardCol} key={index}>
            <Card style={{ height: "100%" }}>
              {event.userAttend === false ? (
                <CurrentStatus>待確認出席</CurrentStatus>
              ) : (
                <CurrentStatus>已確認出席</CurrentStatus>
              )}
              <Card.Img
                variant="top"
                src={event.eventCoverImage}
                style={styles.cardImage}
                onClick={() => handleEventClick(event.eventId)}
              />
              <Card.Body style={styles.cardBody}>
                <EventInfo>
                  <Card.Title style={styles.cardTitle}>
                    {event.eventTitle}
                  </Card.Title>
                  <Card.Text>
                    <EventText>{`${reformatTimestamp(
                      event.startTime
                    )} ~ ${reformatTimestamp(event.endTime)}`}</EventText>
                    <EventText>
                      {event.eventAddress.formatted_address}
                    </EventText>
                  </Card.Text>
                </EventInfo>
                <EventStatus>
                  {event.userAttend === false ? (
                    <RateButton>評價活動</RateButton>
                  ) : (
                    <div />
                  )}
                  {event.userAttend === true && event.userRate === 0 ? (
                    <RateButton
                      disabled
                      onClick={() => handleCommentClick(event.id)}
                    >
                      評價活動
                    </RateButton>
                  ) : (
                    <div />
                  )}
                  {event.userAttend === true && event.userRate !== 0 ? (
                    <RateButton>已評價活動</RateButton>
                  ) : (
                    <div />
                  )}
                </EventStatus>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Events>
    </EventsContainer>
  );
}

export default UserCompletedEvents;
