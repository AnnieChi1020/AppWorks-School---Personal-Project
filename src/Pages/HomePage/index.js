import styled from "styled-components";
import Banner from "./Banner.js";
import Category from "./Category.js";
import TopEvents from "./TopEvents.js";
import React from "react";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  /* margin-top: 50px; */
  display: flex;
  flex-direction: column;
`;

function HomePage() {
  const dispatch = useDispatch();

  return (
    <Container
      className="container-xl mb-5"
      onClick={() => dispatch({ type: "SHOW_NAV", data: false })}
    >
      <Banner />
      <Category />
      <TopEvents />
    </Container>
  );
}

export default HomePage;
