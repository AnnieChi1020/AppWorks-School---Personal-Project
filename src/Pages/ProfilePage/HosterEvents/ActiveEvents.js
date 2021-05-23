import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getHosterEvents,
  getEventInfo,
  updateEvent,
  getUserList,
  updateNewStatus,
} from "../../../utils/firebase.js";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
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

const Button = styled.button`
  font-size: 14px;
  line-height: 20px;
  padding: 3px 8px;
  margin-right: 5px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #ebedef66;
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

function ActiveEvents() {
  const hosterId = useSelector((state) => state.isLogged.userId);
  const [events, setEvents] = useState([]);

  const getHosterEventsData = async () => {
    const newEvents = await getHosterEvents(hosterId, 0);
    console.log(newEvents);
    setEvents(newEvents);
  };

  useEffect(() => {
    getHosterEventsData();
  }, []);

  useEffect(() => {
    console.log(events);
  }, [events]);

  let history = useHistory();
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
    const applyingUserData = await getUserList(id, 0);
    const confirmedUserData = await getUserList(id, 1);
    applyingUserData.map((user) => {
      user.participantInfo.participantStatus = 9;
      updateNewStatus(id, user.participantInfo.participantId, user);
      return true;
    });
    confirmedUserData.map((user) => {
      user.participantInfo.participantStatus = 9;
      updateNewStatus(id, user.participantInfo.participantId, user);
      return true;
    });
    console.log(applyingUserData);
    console.log(eventData);
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
    console.log(e);
    history.push(`/events/${e}`);
  };

  return (
    <EventsContainer>
      <Events>
        {events.map((event, index) => (
          <Col className="p-0" style={styles.cardCol} key={index}>
            <Card style={{ height: "100%" }}>
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
                  <Button onClick={() => handleEditClick(event.eventId)}>
                    編輯活動
                  </Button>
                  <Button onClick={() => handleParticipantClick(event.eventId)}>
                    管理參加者
                  </Button>
                  <Button onClick={(e) => handleCancelClick(event.eventId, e)}>
                    取消活動
                  </Button>
                </ManageEventContainer>
              </Card.Body>
            </Card>
          </Col>
          // <Event key={index}>
          //   <EventImage src={event.eventCoverImage} />
          //   <EventDetail>
          //     <EventTitle>{event.eventTitle}</EventTitle>
          //   </EventDetail>
          //   <Button onClick={() => handleEditClick(event.eventId)}>
          //     編輯活動
          //   </Button>
          //   <Button onClick={() => handleParticipantClick(event.eventId)}>
          //     管理參加者
          //   </Button>
          //   <Button onClick={() => handleCancelClick(event.eventId)}>
          //     取消活動
          //   </Button>
          // </Event>
        ))}
      </Events>
    </EventsContainer>
  );
}

export default ActiveEvents;
