import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getHosterEvents } from "../../../../utils/firebase.js";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Card } from "react-bootstrap";
import NoEvent from "../../components/NoEvent.js";

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

const CardImage = styled(Card.Img)`
  object-fit: cover;
  width: 100%;
  height: 150px;
  cursor: pointer;
`;

const CardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTitle = styled(Card.Title)`
  font-size: 16px;
`;

const CardCol = styled(Col)`
  overflow: hidden;
`;

const StyledCard = styled(Card)`
  border: 1px solid rgba(0, 0, 0, 0.125);
`;

const EVENT_CANCELLED = 9;

function CancelledEvents() {
  const hosterId = useSelector((state) => state.isLogged.userId);
  const [events, setEvents] = useState([]);
  const [noEvent, setNoEvent] = useState(false);

  const getCancelledEvents = async () => {
    const newEvents = await getHosterEvents(hosterId, EVENT_CANCELLED);
    setEvents(newEvents);
    if (newEvents.length === 0) {
      setNoEvent(true);
    }
  };

  useEffect(() => {
    getCancelledEvents();
    // eslint-disable-next-line
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

  const renderNoEventMessage = () => {
    if (noEvent) {
      return <NoEvent />;
    }
  };

  return (
    <EventsContainer>
      {events.length > 0 && (
        <Events>
          {events.map((event, index) => (
            <CardCol className="p-0" key={index}>
              <StyledCard className="h-100 eventCard">
                <CurrentStatus>已取消</CurrentStatus>
                <CardImage
                  variant="top"
                  src={event.eventCoverImage}
                  onClick={() => handleEventClick(event.eventId)}
                />
                <CardBody>
                  <EventInfo>
                    <CardTitle>{event.eventTitle}</CardTitle>
                    <Card.Text>
                      <EventText>{`${reformatTimestamp(
                        event.startTime
                      )} ~ ${reformatTimestamp(event.endTime)}`}</EventText>
                      <EventText>
                        {event.eventAddress.formatted_address}
                      </EventText>
                    </Card.Text>
                  </EventInfo>
                </CardBody>
              </StyledCard>
            </CardCol>
          ))}
        </Events>
      )}
      {renderNoEventMessage()}
    </EventsContainer>
  );
}

export default CancelledEvents;
