import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WaitingList from "./WaitingList";
import ParticipantList from "./ParticipantList";
import background from "../../images/manageBackground.jpg";
import { useParams } from "react-router-dom";
import { getEventInfo } from "../../utils/firebase.js";
import { useHistory } from "react-router-dom";

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

const Styles = styled.div``;

function ManageParticipant() {
  let { id } = useParams();
  const eventId = id;

  const history = useHistory();

  const [eventExist, setEventExist] = useState("");

  const checkIfEventExist = async (eid) => {
    const eventInfo = await getEventInfo(eid);
    if (!eventInfo) {
      history.push("/");
    } else {
      setEventExist(true);
    }
    return eventInfo;
  };

  useEffect(() => {
    checkIfEventExist(eventId);
    // eslint-disable-next-line
  }, []);

  return (
    <Styles>
      {eventExist && (
        <Container className="container-xl mb-5">
          <Background />
          <Mask />
          <WaitingList />
          <ParticipantList />
        </Container>
      )}
    </Styles>
  );
}

export default ManageParticipant;
