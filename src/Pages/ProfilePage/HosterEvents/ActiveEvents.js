/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getHosterEvents,
  getEventInfo,
  updateEvent,
  getParticipants,
  updateParticipantStatus,
} from "../../../utils/firebase.js";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col, Card } from "react-bootstrap";
import NoEvent from "../components/NoEvent.js";

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
  justify-content: flex-start;
`;

const EventText = styled.div`
  font-size: 12px;
  line-height: 20px;
  margin-top: 5px;
`;

const PrimaryButton = styled.button`
  font-size: 14px;
  line-height: 20px;
  padding: 3px 5px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #80ae7f;
  color: white;
`;

const SecondaryButton = styled.button`
  font-size: 14px;
  line-height: 20px;
  padding: 3px 5px;
  margin-left: 5px;
  border: 1px solid #89b485;
  border-radius: 5px;
  background-color: white;
  color: #719b6d;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ActionButton = styled.button`
  font-size: 16px;
  line-height: 20px;
  padding: 5px 15px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #80ae7f;
  color: white;
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

const Styles = styled.div`
  .eventCard {
    border: 1px solid rgba(0, 0, 0, 0.125);
  }
`;

function ActiveEvents() {
  const hosterId = useSelector((state) => state.isLogged.userId);
  const [events, setEvents] = useState([]);
  const [noEvent, setNoEvent] = useState(false);
  let history = useHistory();

  const getHosterEventsData = async () => {
    const newEvents = await getHosterEvents(hosterId, 0);
    setEvents(newEvents);
    if (newEvents.length === 0) {
      setNoEvent(true);
    }
  };

  useEffect(() => {
    getHosterEventsData();
  }, []);

  useEffect(() => {}, [events]);

  const handleParticipantClick = (id) => {
    history.push(`profile/manage-participants/${id}`);
  };

  const handleEditClick = async (id) => {
    history.push(`profile/edit-event/${id}`);
  };

  const handleCancelClick = async (id, e) => {
    const eventData = await getEventInfo(id);
    eventData.eventStatus = 9;
    updateEvent(id, eventData);
    const applyingUserData = await getParticipants(id, 0);
    const confirmedUserData = await getParticipants(id, 1);
    applyingUserData.map((user) => {
      user.participantInfo.participantStatus = 9;
      updateParticipantStatus(id, user.participantInfo.participantId, user);
      return true;
    });
    confirmedUserData.map((user) => {
      user.participantInfo.participantStatus = 9;
      updateParticipantStatus(id, user.participantInfo.participantId, user);
      return true;
    });
    e.target.textContent = "已取消";
  };

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

  const handleActionClick = () => {
    history.push(`/createEvent`);
  };

  const renderNoEventMessage = () => {
    if (noEvent) {
      console.log("noooo");
      return (
        <div>
          <NoEvent></NoEvent>
          <ButtonContainer>
            <ActionButton onClick={handleActionClick}>創建新活動</ActionButton>
          </ButtonContainer>
        </div>
      );
    }
  };

  return (
    <Styles>
      <EventsContainer>
        {events.length > 0 && (
          <Events>
            {events.map((event, index) => (
              <Col className="p-0" style={styles.cardCol} key={index}>
                <Card className="h-100 eventCard">
                  <CurrentStatus>招募中</CurrentStatus>
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
                      <SecondaryButton
                        onClick={() => handleEditClick(event.eventId)}
                      >
                        編輯活動
                      </SecondaryButton>

                      <SecondaryButton
                        onClick={(e) => handleCancelClick(event.eventId, e)}
                      >
                        取消活動
                      </SecondaryButton>
                    </ManageEventContainer>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Events>
        )}
        {renderNoEventMessage()}
      </EventsContainer>
    </Styles>
  );
}

export default ActiveEvents;
