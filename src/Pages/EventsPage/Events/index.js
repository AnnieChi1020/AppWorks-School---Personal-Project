import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { getEvents } from "../../../utils/firebase.js";
import { useHistory } from "react-router-dom";
import { Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import eventsBackground from "../../../images/events_header_2.png";
import "react-dropdown/style.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { reformatTimestamp } from "../../../utils/time.js";
import Filter from "./Filter.js";
import NoEvent from "./NoEvent.js";
import Loading from "./Loading.js";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 60px;
  padding: 20px 30px 30px 30px;
  background-color: white;
  @media (max-width: 540px) {
    padding: 20px 10px 30px 10px;
  }
`;

const BannerContainer = styled.div`
  width: 100%;
  padding: 30px 0;
  margin: 0 auto;
  margin-bottom: 10px;
  text-align: center;
  position: relative;
  @media (max-width: 760px) {
  }
  @media (max-width: 540px) {
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  margin: 0 auto;
  border-radius: 10px;
  @media (max-width: 760px) {
    height: 200px;
  }
  @media (max-width: 540px) {
    height: 150px;
  }
`;

const BannerText = styled.div`
  width: 300px;
  font-size: 44px;
  line-height: 48px;
  font-weight: 900;
  color: #6ca68d;
  margin: 0 auto;
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 760px) {
    font-size: 36px;
    line-height: 40px;
    font-weight: 900;
    top: 130px;
  }
  @media (max-width: 540px) {
    font-size: 28px;
    line-height: 32px;
    font-weight: 900;
    top: 100px;
  }
`;

const MainContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 110px); ;
`;

const Events = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px 15px;
  margin: 0 auto;
  padding: 20px 0 80px 0;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCard = styled(Card)`
  cursor: pointer;
`;

const EventTagContianer = styled.div`
  width: 100%;
  margin: 10px 0 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const EventTag = styled.div`
  font-size: 14px;
  line-height: 20px;
  padding: 0 8px;
  border: solid 1px #979797;
  border-radius: 20px;
  margin-right: 5px;
  color: #4f4f4f;
  margin-top: 5px;

  @media (max-width: 1024px) {
    font-size: 12px;
  }
`;

const EventTime = styled.div`
  font-size: 12px;
  line-height: 16px;
  margin-top: 5px;
`;

const EventTitle = styled.div`
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #3e3e3e;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Styles = styled.div`
  .eventCard {
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 10px !important;
  }
  .cardImage {
    object-fit: cover;
    width: 100%;
    height: 150px;
    border-radius: 10px 10px 0 0 !important;
  }
`;

function AllEvents() {
  let selectedTag = useSelector((state) => state.filter.tag);
  let selectedCity = useSelector((state) => state.filter.city);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "ADD_CITY", data: "" });
    // eslint-disable-next-line
  }, []);

  const [rawEvents, setRawEvents] = useState([]);
  const [events, setEvents] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [noEvent, setNoEvent] = useState(false);

  const getAllEvents = async () => {
    const newEvents = await getEvents(0);
    newEvents.forEach((event) => {
      event.startTime = reformatTimestamp(event.startTime);
      event.endTime = reformatTimestamp(event.endTime);
      event.eventAddress = getAdministrativeArea(event);
    });
    setRawEvents(newEvents);
    setEvents(newEvents);
    setIsLoading(false);
  };

  useEffect(() => {
    setNoEvent(false);
    getFilteredEvents(selectedTag, "");
    // eslint-disable-next-line
  }, [rawEvents]);

  useEffect(() => {
    getAllEvents();
    // eslint-disable-next-line
  }, []);

  const history = useHistory();
  const handleEventClick = (id) => {
    history.push(`/events/${id}`);
  };

  useEffect(() => {
    getFilteredEvents(selectedTag, selectedCity);
    // eslint-disable-next-line
  }, [selectedTag, selectedCity]);

  const getFilteredEvents = async (tag, city) => {
    let eventArray = rawEvents;
    let filteredEvents = [];
    setNoEvent(false);

    if (tag && city) {
      eventArray.forEach((event) => {
        if (event.eventTags.includes(tag) && event.eventAddress.match(city)) {
          filteredEvents.push(event);
        }
      });
    } else if (tag) {
      eventArray.forEach((event) => {
        if (event.eventTags.includes(tag)) {
          filteredEvents.push(event);
        }
      });
    } else if (city) {
      eventArray.forEach((event) => {
        if (event.eventAddress.match(city)) {
          filteredEvents.push(event);
        }
      });
    } else {
      filteredEvents = rawEvents;
    }

    if (rawEvents.length > 0 && filteredEvents.length === 0) {
      setNoEvent(true);
    }

    setEvents(filteredEvents);
  };

  const getAdministrativeArea = (event) => {
    let area;
    event.eventAddress.address_components.forEach((e) => {
      if (e.types.includes("administrative_area_level_1")) {
        area = e.long_name;
      } else if (e.types.includes("administrative_area_level_2")) {
        area = e.long_name;
      }
    });
    return area;
  };

  return (
    <Styles>
      <Container>
        <MainContainer>
          <BannerContainer>
            <BannerText>探索志工機會</BannerText>
            <BannerImage src={eventsBackground} />
          </BannerContainer>
          <Filter />

          {isLoading ? (
            <Loading />
          ) : (
            <div>
              {events.length > 0 && (
                <Events>
                  {events.map((event, index) => (
                    <Col className="p-0 " key={index}>
                      <StyledCard
                        className="shadow-sm rounded bg-white h-100 eventCard"
                        onClick={() => handleEventClick(event.eventId)}
                      >
                        <div className="bg-image hover-overlay hover-zoom">
                          <Card.Img
                            variant="top"
                            src={event.eventCoverImage}
                            alt="eventCoverImage"
                            className="cardImage"
                          ></Card.Img>
                        </div>
                        <Card.Body
                          className="py-2 px-3"
                          style={{ position: "relative" }}
                        >
                          <EventTagContianer>
                            {event.eventTags.map((tag, index) => (
                              <EventTag key={index}>{tag}</EventTag>
                            ))}
                            <EventTag>{event.eventAddress}</EventTag>
                          </EventTagContianer>
                          <EventTime>{`${event.startTime} ~ ${event.endTime}`}</EventTime>
                          <EventTitle>{event.eventTitle}</EventTitle>
                        </Card.Body>
                      </StyledCard>
                    </Col>
                  ))}
                </Events>
              )}
            </div>
          )}

          {noEvent && <NoEvent />}
        </MainContainer>
      </Container>
    </Styles>
  );
}

export default AllEvents;
