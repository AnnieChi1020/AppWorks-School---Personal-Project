import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserList,
  getEventInfo,
  getCurrentStatus,
  updateNewStatus,
} from "../../../../utils/firebase.js";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
`;

const Participants = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const Title = styled.div`
  width: 100%;
  font-size: 20px;
  line-height: 30px;
  margin-top: 10px;
`;

const Participant = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 5px 0;
  border-radius: 8px;
  border: solid 1px #979797;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const EventInfo = styled.div`
  width: 20%;
  font-size: 14px;
  line-height: 20px;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const EventText = styled.div`
  font-size: 12px;
  line-height: 20px;
`;

const ParticipantInfo = styled.div`
  width: 50%;
  font-size: 14px;
  line-height: 20px;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
`;

const ParticipantText = styled.div`
  font-size: 12px;
  line-height: 20px;
`;

const Button = styled.button`
  height: 30px;
  width: 80px;
  line-height: 20px;
  margin: 0 5px;
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
    <Wrapper>
      <Participants>
        <Title>活動參加名單</Title>

        {participants.map((participant, index) => (
          <Participant key={index}>
            <EventInfo>
              <EventText>{event.startTime}</EventText>
            </EventInfo>
            <ParticipantInfo>
              <ParticipantText>{participant.participantName}</ParticipantText>
              <ParticipantText>{participant.participantPhone}</ParticipantText>
              <ParticipantText>{participant.participantEmail}</ParticipantText>
            </ParticipantInfo>
            <Button
              onClick={(e) => {
                handleAttendClick(eventId, participant.participantId);
                e.target.textContent = "已確認出席";
              }}
            >
              出席確認
            </Button>
          </Participant>
        ))}
      </Participants>
    </Wrapper>
  );
}

export default ParticipantList;
