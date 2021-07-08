import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserEvents, getEventInfo } from "../../../../utils/firebase.js";
import { useSelector } from "react-redux";
import { Col, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NoEvent from "../../components/NoEvent.js";
import { reformatTimestamp } from "../../../../utils/time.js";

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
  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
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

function UserCancelledEvents() {
  const [events, setEvents] = useState("");
  const [noEvent, setNoEvent] = useState(false);

  const userId = useSelector((state) => state.isLogged.userId);

  const checkEventPassed = (event) => {
    const startT = event.startTime.seconds * 1000;
    const currentT = new Date().getTime();
    const eventPassed = startT < currentT;
    return eventPassed;
  };

  const getCancelledEventsId = async () => {
    const applyingEvents = await getUserEvents(userId, 9);
    return applyingEvents;
  };

  const getApplyingEventsId = async () => {
    const applyingEvents = await getUserEvents(userId, 0);
    return applyingEvents;
  };

  const getApplyingEventsInfo = async () => {
    const applyingIdArray = await getApplyingEventsId();
    let eventInfoArray = [];
    await Promise.all(
      await applyingIdArray.map(async (id) => {
        const event = await getEventInfo(id);
        const eventPassed = checkEventPassed(event);
        if (eventPassed) {
          event.passed = true;
          eventInfoArray.push(event);
          setEvents([eventInfoArray]);
        }
      })
    );
    const cancelledIdArray = await getCancelledEventsId();
    if (cancelledIdArray.length > 0) {
      await Promise.all(
        await cancelledIdArray.map(async (id) => {
          const event = await getEventInfo(id);
          eventInfoArray.push(event);
          setEvents([eventInfoArray]);
        })
      );
    }
    if (eventInfoArray.length === 0) {
      setNoEvent(true);
    }
  };

  let history = useHistory();
  const handleEventClick = (e) => {
    history.push(`/events/${e}`);
  };

  useEffect(() => {
    getApplyingEventsInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <EventsContainer className="applying-events">
        {events.length > 0 && (
          <Events>
            {events[0].map((event, index) => (
              <CardCol className="p-0" key={index}>
                <StyledCard className="h-100">
                  {event.passed ? (
                    <CurrentStatus>未報名成功</CurrentStatus>
                  ) : (
                    <CurrentStatus>已取消報名</CurrentStatus>
                  )}
                  <CardImage
                    variant="top"
                    src={event.eventCoverImage}
                    alt="eventCoverImage"
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
        {noEvent && <NoEvent />}
      </EventsContainer>
    </div>
  );
}

export default UserCancelledEvents;
