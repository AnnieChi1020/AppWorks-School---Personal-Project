// import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PastEvents from "./PastEvents.js";
// import { getHosterEvents } from "../../utils/firebase.js";
// import { useHistory, useParams } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 70px;
`;

function PastEventsPage() {
  return (
    <Container className="container-xl mb-5">
      <PastEvents />
    </Container>
  );
}

export default PastEventsPage;
