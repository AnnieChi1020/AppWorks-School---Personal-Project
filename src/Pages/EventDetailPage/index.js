import styled from "styled-components";
import Detail from "./Detail.js";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
`;

function EventDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  return (
    <Container
      className="container-xl"
      onClick={() => dispatch({ type: "SHOW_NAV", data: false })}
    >
      <Detail />
    </Container>
  );
}

export default EventDetail;
