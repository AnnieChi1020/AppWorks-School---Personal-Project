import styled from "styled-components";
import Banner from "./Banner.js";
import Category from "./Category.js";
import TopEvents from "./TopEvents.js";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container onClick={() => dispatch({ type: "SHOW_NAV", data: false })}>
      <Banner />
      <Category />
      <TopEvents />
    </Container>
  );
}

export default HomePage;
