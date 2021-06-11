import styled from "styled-components";
import React, { useEffect, useState } from "react";

import { getParticipantNumber, getEvents } from "../../utils/firebase.js";
import { useHistory } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

const TopEventsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-top: 20px;
`;

const MainContentContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const TopEventsHeader = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 100px;
  padding: 10px 20px;
  font-size: 28px;
  font-weight: 600;
  line-height: 30px;
  text-align: center;
  font-family: "Noto Sans TC", sans-serif;
  color: #848484;
`;

const EventsContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 720px) {
    grid-template-columns: 1fr 1fr;
  }
`;

// const EventCard = styled.div`
//   width: 250px;
//   height: 250px;
//   border: 1px solid #8080801a;
//   align-items: center;
//   background-color: #8080801a;
// `;

const EventTitle = styled.div`
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 5px;
  color: #3e3e3e;
  font-weight: 600;
  @media (max-width: 966px) {
    font-size: 14px;
  }
`;

const EventText = styled.div`
  width: 40px;
  font-size: 12px;
  line-height: 16px;
  margin: 0 auto;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #3e3e3e;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #8c8a8a;

  @media (max-width: 966px) {
    font-size: 14px;
  }
`;

const styles = {
  cardImage: {
    objectFit: "cover",
    width: "100%",
    height: "150px",
  },
  modalBody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
};

function TopEvents() {
  const [topEvents, setTopEvents] = useState([]);

  const getEventParticipants = async () => {
    let eventArray = [];
    const events = await getEvents(0);
    events.forEach(async (event) => {
      const number = await getParticipantNumber(event.eventId);
      const object = {
        id: event.eventId,
        title: event.eventTitle,
        number: number,
        image: event.eventCoverImage,
      };
      eventArray.push(object);
      eventArray = eventArray.sort(function (a, b) {
        return b.number - a.number;
      });
      eventArray = eventArray.slice(0, 4);
      setTopEvents(eventArray);
    });
  };

  useEffect(() => {
    getEventParticipants();
  }, []);

  useEffect(() => {}, [topEvents]);

  let history = useHistory();
  const handleEventClick = (id) => {
    history.push(`/events/${id}`);
  };

  return (
    <TopEventsContainer>
      <MainContentContainer>
        <TopEventsHeader>熱門志工活動</TopEventsHeader>
        <EventsContainer>
          {topEvents.map((event, index) => (
            <Col className="p-1 h-100" style={styles.cardCol} key={index}>
              <Card
                className="shadow-sm rounded bg-white h-100"
                onClick={() => handleEventClick(event.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="bg-image hover-overlay hover-zoom">
                  <Card.Img
                    variant="top"
                    src={event.image}
                    style={styles.cardImage}
                  ></Card.Img>
                </div>
                <Card.Body className="py-2 px-3" style={styles.modalBody}>
                  <EventTitle>{event.title}</EventTitle>
                  <EventText>
                    {`${event.number}`}
                    <FontAwesomeIcon icon={faUserFriends} />
                  </EventText>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </EventsContainer>
      </MainContentContainer>
    </TopEventsContainer>
  );
}

export default TopEvents;
