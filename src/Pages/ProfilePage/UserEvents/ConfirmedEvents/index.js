import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserEvents,
  getEventInfo,
  getParticipantInfo,
  updateParticipantStatus,
} from "../../../../utils/firebase.js";
import { useSelector } from "react-redux";
import { Col, Card, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NoEvent from "../../components/NoEvent.js";
import { toast } from "react-toastify";
import { successAlertText } from "../../../../components/Alert.js";
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

const CancelButton = styled.button`
  width: 100px;
  font-size: 14px;
  line-height: 20px;
  padding: 3px 5px;
  border: 1px solid #9dc7d8;
  color: #7b9fac;
  border-radius: 5px;
  background-color: white;
  margin: 0 auto;
`;

const StyledHeader = styled(Modal.Header)`
  border: none;
  justify-content: center;
  font-size: 17px;
  font-weight: 600;
  padding: 25px 30px 20px 30px;
  color: #818181;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ececec;
  /* background-color: #9dc7d878; */
`;

const CancelText = styled.div`
  width: 100%;
  text-align: center;
`;

const StyledBody = styled(Modal.Body)`
  padding: 25px 30px 25px 30px;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

const PrimaryButton = styled.button`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  padding: 3px 5px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #67aeca;
  color: white;
  margin: 0 auto;
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  padding: 3px 5px;
  border: 1px solid #67aeca;
  border-radius: 5px;
  background-color: white;
  color: #67aeca;
  margin: 0 auto;
  cursor: pointer;
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

function UserConfirmedEvents() {
  const userId = useSelector((state) => state.isLogged.userId);
  const [events, setEvents] = useState("");
  const [noEvent, setNoEvent] = useState(false);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelEvent, setCancelEvent] = useState({
    eventId: "",
    userId: "",
  });

  const getApplyingEventsId = async () => {
    const applyingEvents = await getUserEvents(userId, 1);
    return applyingEvents;
  };

  const getApplyingEventsInfo = async () => {
    const eventIdArray = await getApplyingEventsId();
    let eventInfoArray = [];
    await Promise.all(
      eventIdArray.map(async (id) => {
        const event = await getEventInfo(id);
        if (event.eventStatus === 0) {
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
    getApplyingEventsInfo();
    // eslint-disable-next-line
  }, []);

  let history = useHistory();
  const handleEventClick = (e) => {
    history.push(`/events/${e}`);
  };

  const handleCancelClick = async (eventId, userId) => {
    let currentStatus = await getParticipantInfo(eventId, userId);
    currentStatus.participantInfo.participantStatus = 9;
    updateParticipantStatus(eventId, userId, currentStatus);
    let newEventsArray = events;
    newEventsArray.map((event) => {
      if (event.eventId === eventId) {
        event.eventStatus = 9;
        return event;
      } else {
        return event;
      }
    });
    setEvents(newEventsArray);
    toast.success(successAlertText("成功取消報名"), {
      position: toast.POSITION.TOP_CENTER,
    });
    setShowCancelModal(false);
  };

  const handleClose = () => setShowCancelModal(false);
  const handleShow = (eventId) => {
    setShowCancelModal(true);
    setCancelEvent({ ...cancelEvent, eventId: eventId, userId: userId });
  };

  return (
    <div>
      <EventsContainer className="applying-events">
        {events.length > 0 && (
          <Events>
            {events.map((event, index) => (
              <CardCol className="p-0" key={index}>
                <StyledCard className="h-100 ">
                  <CurrentStatus>已確認報名</CurrentStatus>
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
                      {event.eventStatus === 9 ? (
                        <CancelButton disabled>已取消報名</CancelButton>
                      ) : (
                        <CancelButton
                          onClick={(e) => {
                            // handleCancelClick(event.eventId, userId, e);
                            handleShow(event.eventId);
                          }}
                        >
                          取消報名
                        </CancelButton>
                      )}
                    </EventStatus>
                  </CardBody>
                </StyledCard>
              </CardCol>
            ))}
          </Events>
        )}
        {noEvent && <NoEvent />}
      </EventsContainer>
      <Modal
        show={showCancelModal}
        onHide={handleClose}
        centered
        dialogClassName="cancel-modal"
        size="sm"
      >
        <StyledHeader>
          <CancelText>確定要取消嗎</CancelText>
        </StyledHeader>
        <StyledBody>
          <ButtonsContainer>
            <SecondaryButton onClick={() => handleClose()}>
              再想一下
            </SecondaryButton>
            <PrimaryButton
              onClick={() =>
                handleCancelClick(cancelEvent.eventId, cancelEvent.userId)
              }
            >
              取消報名
            </PrimaryButton>
          </ButtonsContainer>
        </StyledBody>
      </Modal>
    </div>
  );
}

export default UserConfirmedEvents;
