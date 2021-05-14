// import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WaitingList from "./WaitingList.js";
import ParticipantList from "./ParticipantList.js";
// import { getHosterEvents } from "../../utils/firebase.js";
// import { useHistory, useParams } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0px;
`;

function ManageParticipant() {
  return (
    <Wrapper>
      <WaitingList />
      <ParticipantList />
    </Wrapper>
  );
}

export default ManageParticipant;
