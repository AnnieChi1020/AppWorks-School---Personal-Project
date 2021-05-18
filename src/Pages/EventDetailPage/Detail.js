import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getEventInfo } from "../../utils/firebase.js";

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  margin: 0 auto;
  margin-top: 20px;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 8px;
  border: solid 1px #979797;
`;

const EventText = styled.h2`
  font-size: 16px;
  margin: 5px 0;
`;

const EventImage = styled.img`
  width: 200px;
`;

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
      <EventImage src={event.image}></EventImage>
      {/* <EventText>{event.id}</EventText> */}
      <EventText>活動名稱 | {event.title}</EventText>
      <EventText>活動內容 | {event.content}</EventText>
      <EventText>開始時間 | {event.startTime}</EventText>
      <EventText>結束時間 | {event.endTime}</EventText>
      <EventText>活動地址 | {event.address}</EventText>
    </Wrapper>
  );
}

export default EventDetail;
