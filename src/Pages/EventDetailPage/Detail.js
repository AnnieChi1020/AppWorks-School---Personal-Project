import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getEventInfo, getUserProfile } from "../../utils/firebase.js";
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
import { toast } from "react-toastify";
import { warningAlertText } from "../../components/Alert.js";
import NotFound from "../../components/NotFound.js";
import { checkEventPassed, reformatTimestamp2 } from "../../utils/time.js";

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

const EventDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const SubtitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  align-items: flex-start;
`;

const IconContainer = styled.div`
  width: 25px;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Icon = styled(FontAwesomeIcon)`
  text-align: left;
  margin-top: 2px;
  color: #6c757d;
  display: flex;
  justify-content: flex-start;
`;

const TextContainer = styled.div`
  width: calc(100% - 25px);
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

const Styles = styled.div``;

function EventDetail() {
  let { id } = useParams();
  let eventId = id;
  const logStatus = useSelector((state) => state.isLogged);
  const signupModal = useSelector((state) => state.modal.signup);

  const dispatch = useDispatch();

  const [eventExist, setEventExist] = useState("");

  const [event, setEvent] = useState({
    address: "台灣",
  });

  const getEventDetail = async () => {
    console.log(process.env);
    const data = await getEventInfo(eventId);
    data ? setEventExist(true) : setEventExist(false);
    if (data) {
      const hosterInfo = await getUserProfile(data.hosterId);
      const passed = checkEventPassed(data);
      const address = data.eventAddress.formatted_address;
      const startDate = reformatTimestamp2(data.startTime);
      const startTime = data.startTime.toDate().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      const endDate = reformatTimestamp2(data.endTime);
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
    }
  };

  useEffect(() => {
    getEventDetail();
    // eslint-disable-next-line
  }, []);

  const handleClose = () => dispatch({ type: "SIGNUP", data: false });
  const handleShow = () => {
    if (logStatus.userRole === 0) {
      dispatch({ type: "SIGNUP", data: true });
    } else {
      toast.warning(warningAlertText("請先登入志工帳號"), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const renderButton = (status) => {
    return status === 0 ? (
      <Button onClick={handleShow}>我要報名</Button>
    ) : (
      <Button disabled style={{ opacity: ".6" }}>
        報名已截止
      </Button>
    );
  };

  return (
    <Styles>
      {eventExist === true && (
        <Container>
          <EventImage src={event.image}></EventImage>
          <EventDetailContainer>
            <EventTitle>{event.title}</EventTitle>
            <SubtitleContainer>
              <IconContainer>
                <Icon icon={faClock} />
              </IconContainer>
              <TextContainer>
                <Subtitle>活動時間</Subtitle>
                <EventText>
                  {event.startTime} - {event.endTime}
                </EventText>
              </TextContainer>
            </SubtitleContainer>
            <SubtitleContainer>
              <IconContainer>
                <Icon icon={faMapMarker} />
              </IconContainer>
              <TextContainer>
                <Subtitle>活動地址</Subtitle>
                <EventText>{event.address}</EventText>
              </TextContainer>
            </SubtitleContainer>
            <SubtitleContainer>
              <IconContainer>
                <Icon icon={faStickyNote} />
              </IconContainer>
              <TextContainer>
                <Subtitle>工作內容</Subtitle>
                <EventText>{event.content}</EventText>
              </TextContainer>
            </SubtitleContainer>
            <SubtitleContainer>
              <IconContainer>
                <Icon icon={faHome} />
              </IconContainer>
              <TextContainer>
                <Subtitle>活動單位</Subtitle>
                <EventText>{event.orgName}</EventText>
                <EventText>{event.orgContact}</EventText>
              </TextContainer>
            </SubtitleContainer>
            {renderButton(event.status)}
            <MapContainer>
              <MapTitle>志工活動地圖</MapTitle>
            </MapContainer>
            <Map
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLEMAP}&q=${event.address}`}
            ></Map>
          </EventDetailContainer>

          <Modal show={signupModal} onHide={handleClose} style={styles.modal}>
            <Modal.Header style={styles.modalHeader} closeButton></Modal.Header>
            <Modal.Body style={styles.modalBody} className="pb-5 px-5">
              <EventSignUp></EventSignUp>
            </Modal.Body>
          </Modal>
        </Container>
      )}
      {eventExist === false && <NotFound />}
    </Styles>
  );
}

export default EventDetail;
