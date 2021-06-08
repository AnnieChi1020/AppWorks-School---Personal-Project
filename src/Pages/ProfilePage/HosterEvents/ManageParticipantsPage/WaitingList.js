/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getParticipants,
  getEventInfo,
  getParticipantInfo,
  updateParticipantStatus,
} from "../../../../utils/firebase.js";
import { useParams } from "react-router-dom";
import { Col, Card } from "react-bootstrap";
import sadFace from "../../../../images/sad.svg";
import noApplicantImage from "../../../../images/noApplicant.png";

const EventsContainer = styled.div`
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

const Events = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  padding: 20px 0;
  /* @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  } */
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

const RejectButton = styled.button`
  width: 75px;
  font-size: 14px;
  line-height: 20px;
  padding: 3px 8px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #ebedef66;
`;

const ConfirmButton = styled.button`
  width: 75px;
  font-size: 14px;
  line-height: 20px;
  padding: 3px 8px;
  margin-right: 8px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #1190cb;
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
  margin-bottom: 10px;
  text-align: center;
  border-bottom: 3px solid #1190cb;
`;

const NoResultDiv = styled.div`
  width: 200px;
  font-size: 16px;
  line-height: 20px;
  padding: 10px 0;
  color: #949494;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const NoResultImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-right: 5px;
  margin-left: 5px;
`;

const NoResultText = styled.div`
  position: absolute;
  top: 28px;
  left: 35px;
  color: #3d3d3d;
`;

const Styles = styled.div`
  .eventCard {
    border: 1px solid rgba(0, 0, 0, 0.125);
  }
  .col {
    min-width: 200px !important;
    flex-grow: 0;
    justify-content: flex-start;
  }
`;

function WaitingList() {
  let { id } = useParams();
  const eventId = id;

  const [applicants, setApplicants] = useState([]);
  const [noApplicant, setNoApplicant] = useState(false);

  const getApplicantsData = async () => {
    let applicantsArray = [];
    const newApplicants = await getParticipants(eventId, 0);
    await Promise.all(
      newApplicants.map((applicant) => {
        applicant.participantInfo.click = false;
        console.log(applicant);
        applicantsArray.push(applicant.participantInfo);
        return true;
      })
    );
    if (applicantsArray.length === 0) {
      setNoApplicant(true);
    }
    setApplicants(applicantsArray);
  };

  useEffect(() => {
    console.log(applicants);
  }, [applicants]);

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
      // const startDate = data.startTime.toDate().toLocaleDateString();
      // const endDate = data.endTime.toDate().toLocaleDateString();

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
  }, []);

  const handleConfirmClick = async (eventId, userId) => {
    let currentStatus = await getParticipantInfo(eventId, userId);
    currentStatus.participantInfo.participantStatus = 1;
    updateParticipantStatus(eventId, userId, currentStatus);
  };

  const handleRejectClick = async (eventId, userId) => {
    let currentStatus = await getParticipantInfo(eventId, userId);
    currentStatus.participantInfo.participantStatus = 9;
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
    console.log(event);
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
      console.log(applicant);
      return applicant;
    });
    console.log(updatedApplicants);
    setApplicants([...updatedApplicants]);
  };

  const renderNoFeedbackMessage = () => {
    if (noApplicant) {
      return (
        <NoResultDiv>
          <NoResultImage src={noApplicantImage} />
          <NoResultText>目前沒有申請</NoResultText>
        </NoResultDiv>
      );
    }
  };

  return (
    <Styles>
      <EventsContainer>
        <Title>志工活動申請</Title>
        <Events>
          {applicants.map((applicant, index) => (
            <Col className="p-0 m-1 col" key={index}>
              <Card className="h-100 eventCard">
                <Card.Body style={styles.cardBody}>
                  <EventInfo>
                    <Card.Title style={styles.cardTitle}>
                      {applicant.participantName}
                    </Card.Title>
                    <Card.Text>
                      <EventText>{applicant.participantPhone}</EventText>
                      <EventText>{applicant.participantEmail}</EventText>
                    </Card.Text>
                  </EventInfo>
                  <ButtonsContainer>
                    {renderConfirmButton(applicant)}
                    {renderRejectButton(applicant)}
                  </ButtonsContainer>
                </Card.Body>
              </Card>
            </Col>
          ))}
          {renderNoFeedbackMessage()}
        </Events>
      </EventsContainer>
    </Styles>
  );
}

export default WaitingList;
