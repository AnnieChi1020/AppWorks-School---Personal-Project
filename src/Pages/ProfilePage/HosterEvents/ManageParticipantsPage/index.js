// import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WaitingList from "./WaitingList.js";
import ParticipantList from "./ParticipantList.js";
// import { getHosterEvents } from "../../utils/firebase.js";
// import { useHistory, useParams } from "react-router-dom";
import background from "../../../../images/manageBackground.jpg";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 70px;
  min-height: calc(100vh - 200px);
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Mask = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

function ManageParticipant() {
  return (
    <Container className="container-xl mb-5">
      <Background />
      <Mask />
      <WaitingList />
      <ParticipantList />
    </Container>
  );
}

export default ManageParticipant;
