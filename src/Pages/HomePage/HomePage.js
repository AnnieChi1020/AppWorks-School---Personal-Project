import styled from "styled-components";
// import React, { useEffect, useState } from "react";
// import { getEvents } from "../../utils/firebase.js";
// import { useHistory, useParams } from "react-router-dom";
import banner from "../../_images/banner.png";

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 0px;
  padding-bottom: 50px;
`;

const BannerDiv = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: row;
  padding: 50px 0;
`;

const BannerImage = styled.div`
  width: calc(100% - 400px);
  text-align: right;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BannerContent = styled.div`
  width: 400px;
`;

function HomePage() {
  return (
    <Wrapper>
      <BannerDiv>
        <BannerContent></BannerContent>
        <BannerImage>
          <Image src={banner} />
        </BannerImage>
      </BannerDiv>
    </Wrapper>
  );
}

export default HomePage;
