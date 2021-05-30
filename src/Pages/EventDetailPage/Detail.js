/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getEventInfo,
  getUserProfile,
  postParticipantInfo,
} from "../../utils/firebase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faMapMarker,
  faStickyNote,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import EventSignUp from "./SignUp.js";
import { useSelector, useDispatch } from "react-redux";

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-bottom: 100px;
`;

const EventImage = styled.img`
  width: 100%;
  height: 25vw;
  object-fit: cover;
`;

const EventDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* width: calc(100% - 270px); */
  width: 100%;
  position: relative;
`;

const EventMainContianer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const SubtitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  align-items: flex-start;
`;

const Subtitle = styled.div`
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  margin-bottom: 5px;
  @media (max-width: 540px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const SubtitleIconContainer = styled.div`
  width: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const SubtitleTextContainer = styled.div`
  width: calc(100% - 30px);
`;

const EventTitle = styled.h2`
  font-size: 28px;
  line-height: 32px;
  margin-top: 25px;
  margin-bottom: 15px;
  font-weight: 600;
  color: #3e3e3e;
  @media (max-width: 540px) {
    font-size: 20px;
    line-height: 28px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
`;

const EventText = styled.h2`
  width: calc(100% - 30px);
  font-size: 16px;
  font-weight: 400;
  margin: 5px 0;
  color: #3e3e3e;
  @media (max-width: 540px) {
    font-size: 12px;
    line-height: 18px;
  }
`;

// const HosterContainer = styled.div`
//   width: 250px;
//   margin-top: 20px;
//   margin-left: 20px;
//   border: solid 1px #979797;
//   border-radius: 20px;
//   padding: 20px;
// `;

// const HosterName = styled.div`
//   width: 100%;
//   font-size: 16px;
//   line-height: 20px;
// `;

// const HosterDetail = styled.div`
//   width: 100%;
//   font-size: 16px;
//   line-height: 20px;
//   margin-top: 10px;
// `;

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  position: relative;
`;

const MapTitle = styled.div`
  font-size: 18px;
  line-height: 22px;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid #b9b9b9;
  margin-bottom: 10px;
  @media (max-width: 540px) {
    font-size: 16px;
    line-height: 20px;
  }
`;

const Map = styled.iframe`
  width: 100%;
  height: 40vw;
  max-height: 500px;
`;

const Button = styled.button`
  width: 120px;
  background-color: #0e6cd0;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  padding: 5px 10px;
  margin: 0 auto;
  margin-top: 20px;
  @media (max-width: 540px) {
    font-size: 14px;
    line-height: 20px;
    width: 100px;
  }
`;

const styles = {
  subtitleIcon: {
    textAlign: "left",
    width: "25px",
    marginRight: "5px",
    marginTop: "2px",
    color: "#6c757d",
    display: "flex",
    justifyContent: "flex-start",
  },
  modal: {
    top: "10%",
  },
  modalHeader: {
    border: "none",
  },
  modalTitle: {
    margin: "0 auto",
  },
  button: {
    marginBottom: "30px",
    width: "200px",
  },
  modalBody: {
    padding: "20px 20px 20px 20px",
  },
  modalFooter: {
    border: "none",
  },
};

function EventDetail() {
  let { id } = useParams();
  let eventId = id;
  const logStatus = useSelector((state) => state.isLogged);
  // const signupData = useSelector((state) => state.signup);
  const signupModal = useSelector((state) => state.modal.signup);

  console.log(signupModal);

  const dispatch = useDispatch();

  const [event, setEvent] = useState({
    id: "",
    image: "",
    title: "",
    content: "",
    address: "",
    location: {},
    startTime: "",
    endTime: "",
    orgName: "",
    orgEmail: "",
    orgContact: "",
  });

  const checkEventPassed = (event) => {
    const startT = event.startTime.seconds * 1000;
    const currentT = new Date().getTime();
    const eventPassed = startT < currentT;
    return eventPassed;
  };

  const getEventDetail = async () => {
    const data = await getEventInfo(eventId);
    const hosterInfo = await getUserProfile(data.hosterId);
    console.log(hosterInfo);
    const passed = checkEventPassed(data);
    console.log(passed);
    const address = data.eventAddress.formatted_address;
    const startDate = data.startTime.toDate().toLocaleDateString();
    const startTime = data.startTime.toDate().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    const endDate = data.endTime.toDate().toLocaleDateString();
    const endTime = data.endTime.toDate().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    setEvent({
      ...event,
      id: data.eventId,
      image: data.eventCoverImage,
      title: data.eventTitle,
      content: data.eventContent,
      address: address,
      location: data.eventLocation,
      startTime: `${startDate} ${startTime}`,
      endTime: `${endDate} ${endTime}`,
      orgName: hosterInfo.orgName,
      orgEmail: hosterInfo.orgEmail,
      orgContact: hosterInfo.orgContact,
      passed: passed,
      status: data.eventStatus,
    });
  };

  useEffect(() => {
    getEventDetail();
  }, []);

  // const [show, setShow] = useState(false);
  const handleClose = () => dispatch({ type: "SIGNUP", data: false });
  const handleShow = () => {
    console.log(logStatus);
    if (logStatus.userRole === 0) {
      dispatch({ type: "SIGNUP", data: true });
    } else {
      alert("請先登入志工帳號");
    }
  };

  useEffect(() => {
    dispatch({ type: "ADD_USERID", data: logStatus.userId });
  }, []);

  // const handleSubmitClick = async () => {
  //   console.log(signupData);
  //   await postParticipantInfo(eventId, logStatus.userId, signupData);
  //   alert("已送出報名資訊");
  //   const inputs = document.querySelectorAll("input");
  //   inputs.forEach((e) => (e.value = ""));
  // };

  const renderButton = (e) => {
    
    return e.status === 0 ? (
      <Button onClick={handleShow}>我要報名</Button>
    ) : (
      <Button disabled style={{ opacity: ".6" }}>
        報名已截止
      </Button>
    );
  };

  return (
    <Container>
      <EventImage src={event.image}></EventImage>
      <EventMainContianer>
        <EventDetailContainer>
          <EventTitle>{event.title}</EventTitle>

          <SubtitleContainer>
            <SubtitleIconContainer>
              <FontAwesomeIcon icon={faClock} style={styles.subtitleIcon} />
            </SubtitleIconContainer>
            <SubtitleTextContainer>
              <Subtitle>活動時間</Subtitle>
              <EventText>
                {event.startTime} - {event.endTime}
              </EventText>
            </SubtitleTextContainer>
          </SubtitleContainer>
          <SubtitleContainer>
            <SubtitleIconContainer>
              <FontAwesomeIcon icon={faMapMarker} style={styles.subtitleIcon} />
            </SubtitleIconContainer>
            <SubtitleTextContainer>
              <Subtitle>活動地址</Subtitle>
              <EventText>{event.address}</EventText>
            </SubtitleTextContainer>
          </SubtitleContainer>
          <SubtitleContainer>
            <SubtitleIconContainer>
              <FontAwesomeIcon
                icon={faStickyNote}
                style={styles.subtitleIcon}
              />
            </SubtitleIconContainer>
            <SubtitleTextContainer>
              <Subtitle>工作內容</Subtitle>
              <EventText>{event.content}</EventText>
            </SubtitleTextContainer>
          </SubtitleContainer>
          <SubtitleContainer>
            <SubtitleIconContainer>
              <FontAwesomeIcon icon={faHome} style={styles.subtitleIcon} />
            </SubtitleIconContainer>
            <SubtitleTextContainer>
              <Subtitle>活動單位</Subtitle>
              <EventText>{event.orgName}</EventText>
              <EventText>{event.orgContact}</EventText>
            </SubtitleTextContainer>
          </SubtitleContainer>
          {renderButton(event)}
          <MapContainer>
            <MapTitle>志工活動地圖</MapTitle>
          </MapContainer>
          <Map
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBSxAwCKVnvEIIRw8tk4y0KAjaUjn3Zn18
    &q=${event.address}`}
          ></Map>
        </EventDetailContainer>

        {/* <HosterContainer>
          <HosterName>{event.orgName}</HosterName>
          <HosterDetail>{event.orgContact}</HosterDetail>
          <HosterDetail>{event.orgEmail}</HosterDetail>
        </HosterContainer> */}
      </EventMainContianer>

      <Modal show={signupModal} onHide={handleClose} style={styles.modal}>
        <Modal.Header style={styles.modalHeader} closeButton>
          {/* <Modal.Title style={styles.modalTitle}>請填寫個人資料</Modal.Title> */}
        </Modal.Header>
        <Modal.Body style={styles.modalBody} className="pb-5">
          <EventSignUp></EventSignUp>
        </Modal.Body>
        {/* <Modal.Footer style={styles.modalFooter}>
          <Button
            variant="primary"
            onClick={handleSubmitClick}
            style={styles.button}
          >
            送出報名資料
          </Button>
        </Modal.Footer> */}
      </Modal>
    </Container>
  );
}

export default EventDetail;
