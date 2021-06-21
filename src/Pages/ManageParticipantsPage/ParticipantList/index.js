import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getParticipants,
  getEventInfo,
  getParticipantInfo,
  updateParticipantStatus,
} from "../../../utils/firebase.js";
import { useParams } from "react-router-dom";
import { Col, Card } from "react-bootstrap";
import NoParticipant from "./NoParticipant.js";

const Container = styled.div`
  width: 90%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: white;
  padding: 10px 20px 20px 20px;
  border-radius: 20px;
  margin-top: 20px;
`;

const Participants = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  padding: 20px 0;
`;

const StyledCol = styled(Col)`
  min-width: 200px !important;
  flex-grow: 0;
  justify-content: flex-start;
  overflow: hidden;
`;

const StyledCard = styled(Card)`
  border: 1px solid rgba(0, 0, 0, 0.125);
`;

const StyledCardTitle = styled(Card.Title)`
  font-size: 16px;
`;

const StyledCardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 20px;
`;

const ParticipantInfo = styled.div`
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

const ConfirmButton = styled.button`
  width: 90px;
  font-size: 14px;
  line-height: 20px;
  padding: 3px 5px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #619e6f;
  color: white;
`;

const Title = styled.div`
  font-size: 20px;
  line-height: 30px;
  padding: 5px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 10px;
  text-align: center;
  border-bottom: 3px solid #619e6f;
`;

const Styles = styled.div``;

function ParticipantList() {
  let { id } = useParams();
  const eventId = id;

  const [participants, setParticipants] = useState([]);
  const [noParticipant, setNoParticipant] = useState(false);

  const getParticipantsData = async () => {
    const newParticipants = await getParticipants(eventId, 1);
    let participantsArray = [];

    newParticipants.forEach((e) => {
      participantsArray.push(e.participantInfo);
    });

    if (participantsArray.length === 0) {
      setNoParticipant(true);
    }
    setParticipants([...participantsArray]);
  };

  useEffect(() => {
    getParticipantsData();
    // eslint-disable-next-line
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

      setEvent({
        ...event,
        id: data.eventId,
        image: data.eventCoverImage,
        title: data.eventTitle,
        content: data.eventContent,
        address: data.eventAddress,
        location: data.eventLocation,
        startTime: data.startTime,
        endTime: data.endTime,
      });
    }
    getEventDetail();
    // eslint-disable-next-line
  }, []);

  const handleAttendClick = async (eventId, userId) => {
    let currentStatus = await getParticipantInfo(eventId, userId);
    currentStatus.participantInfo.participantAttended = true;
    updateParticipantStatus(eventId, userId, currentStatus);
  };

  const renderButton = (e) => {
    const startT = event.startTime.seconds * 1000;
    const currentT = new Date().getTime();
    const eventPassed = startT < currentT;
    return !e.participantAttended && eventPassed ? (
      <ConfirmButton
        id={e.participantId}
        onClick={(e) => {
          handleAttendClick(eventId, e.target.id);
          e.target.textContent = "已確認出席";
          e.target.disabled = true;
          e.target.style.opacity = "0.6";
        }}
      >
        確認出席
      </ConfirmButton>
    ) : !eventPassed ? (
      <ConfirmButton disabled style={{ opacity: "0.6" }}>
        確認出席
      </ConfirmButton>
    ) : (
      <ConfirmButton disabled style={{ opacity: "0.6" }}>
        已確認出席
      </ConfirmButton>
    );
  };

  return (
    <Styles>
      <Container>
        <Title>活動參加名單</Title>
        <Participants>
          {participants.map((participant, index) => (
            <StyledCol className="p-1" key={index}>
              <StyledCard className="h-100 ">
                <StyledCardBody>
                  <ParticipantInfo>
                    <StyledCardTitle>
                      {participant.participantName}
                    </StyledCardTitle>
                    <Card.Text>
                      <EventText>{participant.participantPhone}</EventText>
                      <EventText>{participant.participantEmail}</EventText>
                    </Card.Text>
                  </ParticipantInfo>
                  <ButtonsContainer>
                    {renderButton(participant)}
                  </ButtonsContainer>
                </StyledCardBody>
              </StyledCard>
            </StyledCol>
          ))}
          {noParticipant && <NoParticipant />}
        </Participants>
      </Container>
    </Styles>
  );
}

export default ParticipantList;
