import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserList,
  getEventInfo,
  getCurrentStatus,
  updateNewStatus,
} from "../../../../utils/firebase.js";
import { useParams } from "react-router-dom";
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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  margin: 0 auto;
  padding: 20px 0;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const EventInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ButtonsContainer = styled.div`
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

// const NoEvent = styled.div`
//   width: 90%;
//   margin: 0 auto;
//   padding: 10px 0;
//   font-size: 16px;
//   line-height: 24px;
//   margin-top: 20px;
//   text-align: center;
// `;

const ConfirmButton = styled.button`
  font-size: 14px;
  line-height: 20px;
  padding: 3px 8px;
  margin-right: 8px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #619e6f;
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
    minWidth: "200px",
  },
};

const Title = styled.div`
  font-size: 20px;
  line-height: 30px;
  padding: 5px;
  margin: 0 auto;
  margin-top: 15px;
  text-align: center;
  border-bottom: 2px solid #619e6f;
`;

function ParticipantList() {
  let { id } = useParams();
  const eventId = id;

  const [participants, setParticipants] = useState([]);

  const getParticipantsData = async () => {
    const newParticipants = await getUserList(eventId, 1);
    let participantsArray = [];
    newParticipants.map((e) => {
      participantsArray.push(e.participantInfo);
    });
    setParticipants([...participantsArray]);
  };

  useEffect(() => {
    getParticipantsData();
  }, []);

  const [event, setEvent] = useState({
    id: "",
    image: "",
    title: "",
    content: "",
    address: "",
    location: {},
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    async function getEventDetail() {
      const data = await getEventInfo(eventId);
      const startDate = data.startTime.toDate().toLocaleDateString();
      const endDate = data.endTime.toDate().toLocaleDateString();

      setEvent({
        ...event,
        id: data.eventId,
        image: data.eventCoverImage,
        title: data.eventTitle,
        content: data.eventContent,
        address: data.eventAddress,
        location: data.eventLocation,
        startTime: `${startDate}`,
        endTime: `${endDate}`,
      });
    }
    getEventDetail();
  }, []);

  const handleAttendClick = async (eventId, userId) => {
    let currentStatus = await getCurrentStatus(eventId, userId);
    console.log(currentStatus);
    currentStatus.participantInfo.participantAttended = true;
    updateNewStatus(eventId, userId, currentStatus);
  };

  return (
    <EventsContainer>
      <Title>活動參加名單</Title>
      <Events>
        {participants.map((participant, index) => (
          <Col className="p-0" style={styles.cardCol} key={index}>
            <Card style={{ height: "100%" }}>
              <Card.Body style={styles.cardBody}>
                <EventInfo>
                  <Card.Title style={styles.cardTitle}>
                    {participant.participantName}
                  </Card.Title>
                  <Card.Text>
                    <EventText>{participant.participantPhone}</EventText>
                    <EventText>{participant.participantEmail}</EventText>
                  </Card.Text>
                </EventInfo>
                <ButtonsContainer>
                  {participant.participantAttended === false ? (
                    <ConfirmButton
                      onClick={(e) => {
                        handleAttendClick(eventId, participant.participantId);
                        e.target.textContent = "已確認出席";
                      }}
                    >
                      出席確認
                    </ConfirmButton>
                  ) : (
                    <ConfirmButton disabled>已確認出席</ConfirmButton>
                  )}
                </ButtonsContainer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Events>
    </EventsContainer>
  );
}

export default ParticipantList;
