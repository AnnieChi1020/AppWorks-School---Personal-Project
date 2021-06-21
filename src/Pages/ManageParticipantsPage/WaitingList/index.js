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
import NoApplicant from "./NoApplicant.js";

const Container = styled.div`
  width: 90%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 100px;
  background-color: white;
  padding: 10px 20px 20px 20px;
  border-radius: 20px;
`;

const Title = styled.div`
  font-size: 20px;
  line-height: 30px;
  padding: 5px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 10px;
  text-align: center;
  border-bottom: 3px solid #1190cb;
`;

const Events = styled.div`
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

const EventInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  margin-top: 10px;
  padding-top: 15px;
`;

const EventText = styled.div`
  font-size: 12px;
  line-height: 20px;
  margin-top: 5px;
`;

const ConfirmButton = styled.button`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  padding: 3px 5px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #1190cb;
  color: white;
`;

const RejectButton = styled(ConfirmButton)`
  background-color: #ebedef66;
  color: #3e3e3e;
`;

const Styles = styled.div``;

function WaitingList() {
  const USER_APPLYING = 0;
  const USER_CONFIRMED = 1;
  const USER_CANCELLED = 9;

  let { id } = useParams();
  const eventId = id;

  const [applicants, setApplicants] = useState([]);
  const [noApplicant, setNoApplicant] = useState(false);

  const getApplicantsData = async () => {
    let applicantsArray = [];
    const newApplicants = await getParticipants(eventId, USER_APPLYING);

    newApplicants.forEach((applicant) => {
      applicant.participantInfo.click = false;
      applicantsArray.push(applicant.participantInfo);
    });

    if (applicantsArray.length === 0) {
      setNoApplicant(true);
    }
    setApplicants(applicantsArray);
  };

  useEffect(() => {
    getApplicantsData();
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

  const handleConfirmClick = async (eventId, userId) => {
    let currentStatus = await getParticipantInfo(eventId, userId);
    currentStatus.participantInfo.participantStatus = USER_CONFIRMED;
    updateParticipantStatus(eventId, userId, currentStatus);
  };

  const handleRejectClick = async (eventId, userId) => {
    let currentStatus = await getParticipantInfo(eventId, userId);
    currentStatus.participantInfo.participantStatus = USER_CANCELLED;
    updateParticipantStatus(eventId, userId, currentStatus);
  };

  const renderConfirmButton = (e) => {
    const startT = event.startTime.seconds * 1000;
    const currentT = new Date().getTime();
    const eventPassed = startT < currentT;
    return !eventPassed && !e.click ? (
      <ConfirmButton
        id={e.participantId}
        onClick={(e) => {
          handleConfirmClick(eventId, e.target.id);
          e.target.textContent = "已確認";
          e.target.disabled = true;
          e.target.style.opacity = "0.6";
          disableOtherButton(e);
        }}
      >
        確認報名
      </ConfirmButton>
    ) : (
      <ConfirmButton disabled style={{ opacity: "0.6" }}>
        確認報名
      </ConfirmButton>
    );
  };

  const renderRejectButton = (e) => {
    const startT = event.startTime.seconds * 1000;
    const currentT = new Date().getTime();
    const eventPassed = startT < currentT;
    return !eventPassed && !e.click ? (
      <RejectButton
        id={e.participantId}
        onClick={(e) => {
          handleRejectClick(eventId, e.target.id);
          e.target.textContent = "已婉拒";
          e.target.disabled = true;
          e.target.style.opacity = "0.6";
          disableOtherButton(e);
        }}
      >
        婉拒報名
      </RejectButton>
    ) : (
      <RejectButton disabled style={{ opacity: "0.6" }}>
        婉拒報名
      </RejectButton>
    );
  };

  const disableOtherButton = (e) => {
    let updatedApplicants = applicants.map((applicant) => {
      if (applicant.participantId === e.target.id) {
        applicant.click = true;
      }
      return applicant;
    });
    setApplicants([...updatedApplicants]);
  };

  return (
    <Styles>
      <Container>
        <Title>志工活動申請</Title>
        <Events>
          {applicants.map((applicant, index) => (
            <StyledCol className="p-0 m-1 col" key={index}>
              <StyledCard className="h-100">
                <StyledCardBody>
                  <EventInfo>
                    <StyledCardTitle>
                      {applicant.participantName}
                    </StyledCardTitle>
                    <Card.Text>
                      <EventText>{applicant.participantPhone}</EventText>
                      <EventText>{applicant.participantEmail}</EventText>
                    </Card.Text>
                  </EventInfo>
                  <ButtonsContainer>
                    {renderConfirmButton(applicant)}
                    {renderRejectButton(applicant)}
                  </ButtonsContainer>
                </StyledCardBody>
              </StyledCard>
            </StyledCol>
          ))}
          {noApplicant && <NoApplicant />}
        </Events>
      </Container>
    </Styles>
  );
}

export default WaitingList;
