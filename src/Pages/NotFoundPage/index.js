import styled from "styled-components";
import React from "react";
import NotFound from "../../components/NotFound.js";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 70px;
  min-height: calc(100vh - 200px);
`;

function NotFoundPage() {
  const dispatch = useDispatch();

  return (
    <Container
      className="container-xl mb-5"
      onClick={() => dispatch({ type: "SHOW_NAV", data: false })}
    >
      <NotFound />
    </Container>
  );
}

export default NotFoundPage;
