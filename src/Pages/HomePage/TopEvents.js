import styled from "styled-components";
import React from "react";

import { getAllUsers, getUserAttendedEvents } from "../../utils/firebase.js";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";

const TopEventsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-top: 20px;
`;

const MainContentContainer = styled.div`
  width: 100%;
  height: 400px;
  text-align: center;
`;

const TopEventsHeader = styled.div`
  width: 130px;
  margin: 0 auto;
  margin-top: 30px;
  padding: 10px 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  border-bottom: 3px solid #1190cb;
`;

const EventsContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const EventCard = styled.div`
  width: 250px;
  height: 250px;
  border: 1px solid #8080801a;
  align-items: center;
  background-color: #8080801a;
`;

function TopEvents() {
  return (
    <TopEventsContainer>
      <MainContentContainer>
        <TopEventsHeader>熱門志工活動</TopEventsHeader>
        <EventsContainer>
          <EventCard></EventCard>
          <EventCard></EventCard>
          <EventCard></EventCard>
          <EventCard></EventCard>
        </EventsContainer>
      </MainContentContainer>
    </TopEventsContainer>
  );
}

export default TopEvents;
