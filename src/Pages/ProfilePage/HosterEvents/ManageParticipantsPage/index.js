// import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WaitingList from "./WaitingList.js";
import ParticipantList from "./ParticipantList.js";
// import { getHosterEvents } from "../../utils/firebase.js";
// import { useHistory, useParams } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 70px;
`;

function ManageParticipant() {
  return (
    <Container>
      <WaitingList />
      <ParticipantList />
    </Container>
  );
}

export default ManageParticipant;
