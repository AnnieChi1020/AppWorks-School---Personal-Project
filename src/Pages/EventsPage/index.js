import styled from "styled-components";
import Events from "./Events";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - 67px);
`;

const Background = styled.div`
  height: 100%;
  width: 100%;
  background-color: #80808012;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

function EventsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container
      className="container-xl"
      onClick={() => dispatch({ type: "SHOW_NAV", data: false })}
    >
      <Background />
      <Events />
    </Container>
  );
}

export default EventsPage;
