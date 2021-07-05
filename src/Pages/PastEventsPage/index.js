import styled from "styled-components";
import PastEvents from "./PastEvents";
import LeaderBoard from "./LeaderBoard.js";
import whiteWall from "../../images/white_wall.jpg";
import React, { useEffect } from "react";
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const MainContent = styled.div`
  width: 100%;
  /* display: flex;
  flex-direction: row; */
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-gap: 20px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }
`;

function PastEventsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
