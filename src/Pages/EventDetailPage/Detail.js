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

const EventName = styled.h2`
  font-size: 16px;
`;

function EventDetail() {
  let { id } = useParams();
  let eventId = id;

  let [event, setEvent] = useState({});

  useEffect(() => {
    async function getEventDetail() {
      const data = await getEventInfo(eventId);
      const eventInfo = {
        id: data.eventId,
        title: data.eventTitle,
        address: data.eventAddress,
      };
      setEvent(eventInfo);
    }
    getEventDetail();
    console.log(event);
  }, []);

  return (
    <Wrapper>
      <EventName>{event.id}</EventName>
      <EventName>{event.title}</EventName>
      <EventName>{event.address}</EventName>
    </Wrapper>
  );
}

export default EventDetail;
