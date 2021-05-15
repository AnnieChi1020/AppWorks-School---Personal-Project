import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserList,
  getEventInfo,
  getCurrentStatus,
  updateNewStatus,
} from "../../../../utils/firebase.js";
import { useHistory, useParams } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
`;

const Applications = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const Title = styled.div`
  width: 100%;
  font-size: 20px;
  line-height: 30px;
  margin-top: 10px;
`;

const Application = styled.div`
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

const ApplicantInfo = styled.div`
  width: 50%;
  font-size: 14px;
  line-height: 20px;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
`;

const ApplicantText = styled.div`
  font-size: 12px;
  line-height: 20px;
`;

const Button = styled.button`
  height: 30px;
  width: 80px;
  line-height: 20px;
  margin: 0 5px;
`;

function WaitingList() {
  let { id } = useParams();
  const eventId = id;

  const [applicants, setApplicants] = useState([]);

  const getApplicantsData = async () => {
    let applicantsArray = [];
    const newApplicants = await getUserList(eventId, 0);
    newApplicants.map((applicant) => {
      applicantsArray.push(applicant.participantInfo);
    });
    setApplicants(applicantsArray);
  };

  useEffect(() => {
    getApplicantsData();
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

  const handleConfirmClick = async (eventId, userId) => {
    let currentStatus = await getCurrentStatus(eventId, userId);
    currentStatus.participantInfo.participantStatus = 1;
    updateNewStatus(eventId, userId, currentStatus);
  };

  const handleRejectClick = async (eventId, userId) => {
    let currentStatus = await getCurrentStatus(eventId, userId);
    currentStatus.participantInfo.participantStatus = 2;
    updateNewStatus(eventId, userId, currentStatus);
  };

  return (
    <Wrapper>
      <Applications>
        <Title>志工申請</Title>

        {applicants.map((applicant, index) => (
          <Application key={index}>
            <EventInfo>
              <EventText>{event.startTime}</EventText>
            </EventInfo>
            <ApplicantInfo>
              <ApplicantText>{applicant.participantName}</ApplicantText>
              <ApplicantText>{applicant.participantPhone}</ApplicantText>
              <ApplicantText>{applicant.participantEmail}</ApplicantText>
            </ApplicantInfo>
            <Button
              onClick={(e) => {
                handleConfirmClick(eventId, applicant.participantId);
                e.target.textContent = "已確認";
              }}
            >
              確認報名
            </Button>
            <Button
              onClick={(e) => {
                handleRejectClick(eventId, applicant.participantId);
                e.target.textContent = "已拒絕";
              }}
            >
              拒絕報名
            </Button>
          </Application>
        ))}
      </Applications>
    </Wrapper>
  );
}

export default WaitingList;
