import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserEvents,
  getEventInfo,
  getCurrentStatus,
  updateNewStatus,
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

const CancelButton = styled.button`
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

function UserApplyingEvents() {
  const [events, setEvents] = useState([]);

  const userId = useSelector((state) => state.isLogged.userId);

  const getApplyingEventsId = async () => {
    const applyingEvents = await getUserEvents(userId, 0);
    return applyingEvents;
  };

  const getApplyingEventsInfo = async () => {
    const eventIdArray = await getApplyingEventsId();
    let eventInfoArray = [];
    await eventIdArray.map(async (id) => {
      const event = await getEventInfo(id);
      console.log(event);
      eventInfoArray.push(event);
      setEvents([eventInfoArray]);
    });
    return eventInfoArray;
  };

  let history = useHistory();
  const handleEventClick = (e) => {
    console.log(e);
    history.push(`/events/${e}`);
  };

  const handleCancelClick = async (eventId, userId, e) => {
    let currentStatus = await getCurrentStatus(eventId, userId);
    currentStatus.participantInfo.participantStatus = 9;
    updateNewStatus(eventId, userId, currentStatus);
    e.target.textContent = "已取消";
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
    const reformatedTime = `${year}-${month}-${date} (${day})`;
    return reformatedTime;
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
    <EventsContainer>
      <Events>
        {events[0].map((event, index) => (
          <Col className="p-0" style={styles.cardCol} key={index}>
            <Card style={{ height: "100%" }}>
              <CurrentStatus>等待確認</CurrentStatus>
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
                  <CancelButton
                    onClick={(e) => {
                      handleCancelClick(event.eventId, userId, e);
                    }}
                  >
                    取消報名
                  </CancelButton>
                </EventStatus>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Events>
    </EventsContainer>
  );
}

export default UserApplyingEvents;
