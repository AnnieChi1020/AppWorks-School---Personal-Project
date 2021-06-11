import styled from "styled-components";
import PastEvents from "./PastEvents.js";
import LeaderBoard from "./LeaderBoard.js";
import whiteWall from "../../images/white_wall.jpg";
import React from "react";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 70px;
  min-height: calc(100vh - 200px);
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${whiteWall});
  filter: sepia(10%);
  /* background-color: #80808012; */
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  @media (max-width: 960px) {
    flex-direction: column;

  }
`;

function PastEventsPage() {
  const dispatch = useDispatch();

  return (
    <Container
      className="container-xl mb-5"
      onClick={() => dispatch({ type: "SHOW_NAV", data: false })}
    >
      <Background />
      <MainContent>
        <PastEvents />
        <LeaderBoard />
      </MainContent>
    </Container>
  );
}

export default PastEventsPage;
