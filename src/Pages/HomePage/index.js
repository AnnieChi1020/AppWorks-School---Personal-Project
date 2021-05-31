// import { useEffect } from "react";
import styled from "styled-components";
import Banner from "./Banner.js";
import Category from "./Category.js";
import TopEvents from "./TopEvents.js";

// import React, { useEffect, useState } from "react";
// import { useHistory, useParams } from "react-router-dom";
// import banner from "../../images/banner.png";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 200px);

`;

function HomePage() {
  return (
    <Container className="container-xl mb-5">
      <Banner />
      <Category />
      <TopEvents />
    </Container>
  );
}

export default HomePage;
