/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getHosterEvents } from "../../../utils/firebase.js";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Card } from "react-bootstrap";

const EventsContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Events = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin: 0 auto;
  padding: 20px 0;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
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

const EventInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const EventText = styled.div`
  font-size: 12px;
  line-height: 20px;
  margin-top: 5px;
`;

const NoEventText = styled.div`
  width: 100px;
  font-size: 16px;
  line-height: 20px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 80px;
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

function CancelledEvents() {
  const hosterId = useSelector((state) => state.isLogged.userId);
  const [events, setEvents] = useState([]);

  const getHosterEventsData = async () => {
    const newEvents = await getHosterEvents(hosterId, 9);
    setEvents(newEvents);
  };

  useEffect(() => {
    getHosterEventsData();
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

  let history = useHistory();
  const handleEventClick = (e) => {
    history.push(`/events/${e}`);
  };

  return (
    <EventsContainer>
      <Events>
        {events.map((event, index) => (
          <Col className="p-0" style={styles.cardCol} key={index}>
            <Card style={{ height: "100%" }}>
              <CurrentStatus>已取消</CurrentStatus>
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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Events>
      {events.length === 0 ? <NoEventText>沒有活動喔</NoEventText> : <div />}
    </EventsContainer>
  );
}

export default CancelledEvents;
