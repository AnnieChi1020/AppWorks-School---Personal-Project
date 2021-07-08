import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { getParticipantNumber, getEvents } from "../../utils/firebase.js";
import { useHistory } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import background from "../../images/TP_background_3-min.png";

const TopEventsContainer = styled.div`
  width: 100%;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const MainContentContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: 0 auto;
  padding: 150px 20px 150px 20px;
`;

const TopEventsHeader = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 20px;
  font-size: 32px;
  font-weight: 600;
  line-height: 34px;
  text-align: center;
  font-family: "Noto Sans TC", sans-serif;
  color: white;
  letter-spacing: 2px;
  @media (max-width: 960px) {
    font-size: 30px;
    font-weight: 600;
    line-height: 34px;
  }
  @media (max-width: 540px) {
    font-size: 24px;
    font-weight: 600;
    line-height: 28px;
  }
`;

const EventsContainer = styled.div`
  width: 100%;
  padding: 0 20px;
  margin-top: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 720px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledCard = styled(Card)`
  cursor: pointer;
  border-radius: 10px 10px 10px 10px !important;
`;

const CardImg = styled(Card.Img)`
  object-fit: cover;
  width: 100%;
  height: 150px;
  border-radius: 10px 10px 0px 0px;
`;

const CardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  :hover {
    div {
      color: #54b188;
    }
  }
`;

const EventTitle = styled.div`
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 5px;
  color: #787878;
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
  color: #b6b3b3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #8c8a8a;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  @media (max-width: 966px) {
    font-size: 14px;
  }
`;

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

  let history = useHistory();
  const handleEventClick = (id) => {
    history.push(`/events/${id}`);
  };

  return (
    <TopEventsContainer>
      <MainContentContainer className="container-xl">
        <TopEventsHeader>熱門志工活動</TopEventsHeader>
        <EventsContainer>
          {topEvents.map((event, index) => (
            <Col className="p-1 h-100" key={index}>
              <StyledCard
                className="shadow-sm rounded bg-white h-100"
                onClick={() => handleEventClick(event.id)}
              >
                <div className="bg-image hover-overlay hover-zoom">
                  <CardImg variant="top" src={event.image}></CardImg>
                </div>
                <CardBody className="py-2 px-3">
                  <EventTitle>{event.title}</EventTitle>
                  <EventText>
                    {`${event.number}`}
                    <FontAwesomeIcon icon={faUserFriends} />
                  </EventText>
                </CardBody>
              </StyledCard>
            </Col>
          ))}
        </EventsContainer>
      </MainContentContainer>
    </TopEventsContainer>
  );
}

export default TopEvents;
