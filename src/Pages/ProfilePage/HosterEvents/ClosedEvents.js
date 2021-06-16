/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getHosterEvents } from "../../../utils/firebase.js";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, Card, Modal } from "react-bootstrap";
import NoEvent from "../components/NoEvent.js";
import Results from "./EventResultPage/EventResultPage.js";

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

const ManageEventContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  padding-top: 15px;
  justify-content: center;
`;

const EventText = styled.div`
  font-size: 12px;
  line-height: 20px;
  margin-top: 5px;
`;

const PrimaryButton = styled.button`
  width: 50%;
  font-size: 14px;
  line-height: 20px;
  padding: 3px 5px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #80ae7f;
  color: white;
`;

const SecondaryButton = styled.button`
  width: 50%;
  font-size: 14px;
  line-height: 20px;
  padding: 3px 5px;
  margin-left: 5px;
  border: 1px solid #89b485;
  border-radius: 5px;
  background-color: white;
  color: #719b6d;
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
  modalHeader: {
    border: "none",
  },
};

const StyledModal = styled(Modal)`
  margin-top: 50px;
  margin-bottom: 100px;
  padding-bottom: 50px;
`;

const Styles = styled.div`
  .eventCard {
    border: 1px solid rgba(0, 0, 0, 0.125);
  }
`;

function ClosedEvents() {
  const hosterId = useSelector((state) => state.isLogged.userId);
  const [events, setEvents] = useState([]);
  const [noEvent, setNoEvent] = useState(false);

  const showResultModal = useSelector((state) => state.modal.result);
  const resultCompleted = useSelector((state) => state.modal.resultCompleted);
  const selectedEventId = useSelector((state) => state.modal.eventId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (resultCompleted) {
      let currentEventsArray = events;
      currentEventsArray.map((event) => {
        if (event.eventId === selectedEventId) {
          event.resultContent = true;
          return event;
        } else {
          return event;
        }
      });
      setEvents(currentEventsArray);
      dispatch({ type: "SET_RESULTCOMPLETED", data: false });
      dispatch({ type: "SET_EVENTID", data: "" });
    }
  }, [resultCompleted]);

  const getHosterEventsData = async () => {
    const newEvents = await getHosterEvents(hosterId, 1);
    setEvents(newEvents);
    if (newEvents.length === 0) {
      setNoEvent(true);
    }
  };

  useEffect(() => {
    getHosterEventsData();
  }, []);

  let history = useHistory();
  const handleParticipantClick = (id) => {
    history.push(`profile/manage-participants/${id}`);
  };
  // const handleResultClick = (id) => {
  //   history.push(`profile/event-result/${id}`);
  // };

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

  const handleEventClick = (e) => {
    history.push(`/events/${e}`);
  };

  const renderResultButton = (event) => {
    return !event.resultContent ? (
      <SecondaryButton
        // onClick={() => handleResultClick(event.eventId)}
        onClick={() => handleShow(event.eventId)}
      >
        分享活動成果
      </SecondaryButton>
    ) : (
      <SecondaryButton disabled style={{ opacity: ".5" }}>
        已分享成果
      </SecondaryButton>
    );
  };

  const renderNoEventMessage = () => {
    if (noEvent) {
      return <NoEvent></NoEvent>;
    }
  };

  const handleClose = () => dispatch({ type: "SHOW_RESULT", data: false });
  const handleShow = (eventId) => {
    dispatch({ type: "SHOW_RESULT", data: true });
    dispatch({ type: "SET_EVENTID", data: eventId });
  };

  return (
    <Styles>
      <EventsContainer>
        {events.length > 0 && (
          <Events>
            {events.map((event, index) => (
              <Col className="p-0" style={styles.cardCol} key={index}>
                <Card className="h-100 eventCard">
                  <CurrentStatus>已結束</CurrentStatus>
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
                    <ManageEventContainer>
                      <PrimaryButton
                        onClick={() => handleParticipantClick(event.eventId)}
                      >
                        管理參加者
                      </PrimaryButton>
                      {renderResultButton(event)}
                    </ManageEventContainer>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Events>
        )}
        {renderNoEventMessage()}
        <StyledModal size="md" show={showResultModal} onHide={handleClose}>
          <Modal.Header style={styles.modalHeader} closeButton></Modal.Header>
          <Modal.Body style={styles.modalBody}>
            <Results></Results>
          </Modal.Body>
        </StyledModal>
      </EventsContainer>
    </Styles>
  );
}

export default ClosedEvents;
