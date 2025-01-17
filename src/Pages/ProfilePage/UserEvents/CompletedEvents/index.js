import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserEvents,
  getEventInfo,
  getParticipantInfo,
} from "../../../../utils/firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { Col, Card, Modal, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NoEvent from "../../components/NoEvent.js";
import Comments from "./Comments.js";
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
  background-color: #67aeca;
  color: white;
  margin: 0 auto;
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

const StyledModal = styled(Modal)`
  margin-top: 70px;
`;

const ModalHeader = styled(Modal.Header)`
  border: none;
`;

const ModalBody = styled(Modal.Body)`
  padding: 0 40px 40px 40px;
`;

const Styles = styled.div`
  .rate-tooltip {
    position: absolute;
    will-change: transform;
    top: 0px;
    left: 0px;
    transform: translate3d(563px, 60px, 0px);
  }
`;

function UserCompletedEvents() {
  const userId = useSelector((state) => state.isLogged.userId);
  const [events, setEvents] = useState([]);
  const [noEvent, setNoEvent] = useState(false);
  const showFeedbackModal = useSelector((state) => state.modal.feedback);
  const feedbackCompleted = useSelector(
    (state) => state.modal.feedbackCompleted
  );
  const selectedEventId = useSelector((state) => state.modal.eventId);

  useEffect(() => {
    if (feedbackCompleted) {
      let currentEventsArray = events;
      currentEventsArray.map((event) => {
        if (event.eventId === selectedEventId) {
          event.userRate = 5;
          return event;
        } else {
          return event;
        }
      });
      setEvents(currentEventsArray);
      dispatch({ type: "SET_FEEDBACKCOMPLETED", data: false });
      dispatch({ type: "SET_EVENTID", data: "" });
    }
    // eslint-disable-next-line
  }, [feedbackCompleted]);

  const dispatch = useDispatch();

  const getCompletedEventIds = async () => {
    const applyingEvents = await getUserEvents(userId, 1);
    return applyingEvents;
  };

  const getCompletedEventsInfo = async () => {
    const eventIdArray = await getCompletedEventIds();
    if (eventIdArray.length === 0) {
      setNoEvent(true);
    }
    let eventInfoArray = [];
    await Promise.all(
      eventIdArray.map(async (id) => {
        const event = await getEventInfo(id);
        if (event.eventStatus === 1) {
          const userDetail = await getParticipantInfo(id, userId);
          const userRate = userDetail.participantInfo.participantRating;
          const userAttend = userDetail.participantInfo.participantAttended;
          event.userRate = userRate;
          event.userAttend = userAttend;
          eventInfoArray.push(event);
        }
        setEvents([...eventInfoArray]);
        return eventInfoArray;
      })
    );
    if (eventInfoArray.length === 0) {
      setNoEvent(true);
    }
  };

  useEffect(() => {
    getCompletedEventsInfo();
    // eslint-disable-next-line
  }, []);

  let history = useHistory();
  const handleEventClick = (e) => {
    history.push(`/events/${e}`);
  };

  const handleClose = () => dispatch({ type: "SHOW_FEEDBACK", data: false });
  const handleShow = (eventId) => {
    dispatch({ type: "SHOW_FEEDBACK", data: true });
    dispatch({ type: "SET_EVENTID", data: eventId });
  };

  return (
    <Styles>
      <EventsContainer>
        {events.length > 0 && (
          <Events>
            {events.map((event, index) => (
              <CardCol className="p-0" key={index}>
                <StyledCard className="h-100 ">
                  {!event.userAttend ? (
                    <CurrentStatus>待確認出席</CurrentStatus>
                  ) : (
                    <CurrentStatus>已確認出席</CurrentStatus>
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
                    <EventStatus>
                      {!event.userAttend && (
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip id={`tooltip-top`}>
                              待確認出席即可評價活動
                            </Tooltip>
                          }
                        >
                          <RateButton disabled style={{ opacity: ".5" }}>
                            評價活動
                          </RateButton>
                        </OverlayTrigger>
                      )}
                      {event.userAttend && event.userRate === 0 && (
                        <RateButton onClick={() => handleShow(event.eventId)}>
                          評價活動
                        </RateButton>
                      )}
                      {event.userAttend && event.userRate !== 0 ? (
                        <RateButton disabled style={{ opacity: ".5" }}>
                          已評價活動
                        </RateButton>
                      ) : (
                        <div />
                      )}
                    </EventStatus>
                  </CardBody>
                </StyledCard>
              </CardCol>
            ))}
          </Events>
        )}
        {noEvent && <NoEvent />}
        <StyledModal show={showFeedbackModal} onHide={handleClose}>
          <ModalHeader closeButton></ModalHeader>
          <ModalBody>
            <Comments />
          </ModalBody>
        </StyledModal>
      </EventsContainer>
    </Styles>
  );
}

export default UserCompletedEvents;
