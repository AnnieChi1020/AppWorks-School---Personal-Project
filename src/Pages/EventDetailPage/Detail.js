import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getEventInfo } from "../../utils/firebase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMapMarker } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const EventImage = styled.img`
  width: 100%;
  height: 25vw;
  object-fit: cover;
`;

const SubtitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
`;

const Subtitle = styled.div`
  font-size: 1rem;
`;

const EventTitle = styled.h2`
  font-size: 24px;
  line-height: 28px;
  margin-top: 20px;
  font-weight: 600;
`;

const EventText = styled.h2`
  font-size: 16px;
  margin: 5px 0;
`;

const styles = {
  eventDiv: {
    flexDirection: "column",
  },
  subtitleIcon: {
    textAlign: "left",
    width: "25px",
    marginRight: "5px",
    color: "#6c757d",
    display: "flex",
    justifyContent: "flex-start",
  },
  flexbox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
};

function EventDetail() {
  let { id } = useParams();
  let eventId = id;

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
      // data.eventAddress.address_components.forEach((e) => {
      //   if (e.types.includes("administrative_area_level_1")) {
      //     console.log(e.long_name);
      //   }
      // });
      console.log(data.eventAddress);
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
        // address: data.eventAddress,
        location: data.eventLocation,
        startTime: `${startDate} ${startTime}`,
        endTime: `${endDate} ${endTime}`,
      });
    }
    getEventDetail();
  }, []);

  useEffect(() => {
    console.log(event);
  }, [event]);

  return (
    <Wrapper>
      <div className="px-1 mb-2 container-md d-flex " style={styles.eventDiv}>
        <EventImage src={event.image}></EventImage>
        {/* <EventText>{event.id}</EventText> */}
        <EventTitle>{event.title}</EventTitle>
        <SubtitleContainer>
          <div style={styles.flexbox}>
            <FontAwesomeIcon icon={faClock} style={styles.subtitleIcon} />
          </div>
          <div>
            <Subtitle>活動時間</Subtitle>
            <EventText>
              {event.startTime} - {event.endTime}
            </EventText>
          </div>
        </SubtitleContainer>
        <SubtitleContainer>
          <FontAwesomeIcon icon={faMapMarker} style={styles.subtitleIcon} />
          <div>
            <Subtitle>活動地址</Subtitle> <EventText>{event.address}</EventText>
          </div>
        </SubtitleContainer>
        <EventText>活動內容 | {event.content}</EventText>
      </div>
    </Wrapper>
  );
}

export default EventDetail;
