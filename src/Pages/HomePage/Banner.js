import styled from "styled-components";
import React from "react";
import banner from "../../images/background.jpg";
import slogan from "../../images/slogan.png";

import animal from "../../images/animal.png";
import welfare from "../../images/welfare.png";
import environment from "../../images/environment.png";
import education from "../../images/education.png";
// import banner from "../../images/banner.svg";

import { useHistory } from "react-router-dom";

const BannerContainer = styled.div`
  width: 100vw;
  height: 800px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  /* background: linear-gradient(130deg, #7f7fd5 0%, #86a8e7 50%, #91eae4 100%); */
  background-color: #f6efe6;
  background-image: url(${banner});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  /* filter: brightness(70%); */
  position: absolute;
  /* top: 50px; */
  left: 0;
  align-items: center;

  @media (max-width: 960px) {
    /* height: 700px; */
  }
  @media (max-width: 540px) {
    /* height: 620px; */
  }
`;

const Mask = styled.div`
  width: 100vw;
  height: 800px;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgb(0, 0, 0, 0.35);
`;

const MainContentContainer = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px;
  padding: 50px;

  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 960px) {
    flex-direction: column;
  } */
`;

const TextContainer = styled.div`
  width: 600px;
  height: 100%;
  margin: 0 auto;
  flex-grow: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 720px) {
    width: 100%;
  }
`;

const Slogan = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: none;
  margin: 0 auto;
  margin-top: 0px;
  margin-bottom: 30px;
`;

const TextSubtitle = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  padding: 5px 20px;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  color: #ffffff;
  text-align: center;
  margin-top: 0px;
  @media (max-width: 960px) {
    font-size: 16px;
    text-align: center;
  }
`;

const Categories = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  & div + div {
    border-left: 1px solid white;
  }
`;

const Category = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
`;

const CategoryImage = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 auto;
`;

const CategoryText = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  color: white;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  margin-top: 10px;
`;

// const TextHeader = styled.div`
//   width: 100%;
//   font-size: 36px;
//   font-weight: 600;
//   line-height: 38px;
//   padding: 5px 20px;
//   font-family: "Noto Sans TC", sans-serif;
//   color: #363636;
//   @media (max-width: 960px) {
//     font-size: 30px;
//     text-align: center;
//   }
//   @media (max-width: 540px) {
//     font-size: 24px;
//     padding: 0px 20px;
//   }
// `;

// const ImageContainer = styled.div`
//   width: 450px;
//   height: 450px;
//   flex-grow: 0;
//   @media (max-width: 960px) {
//     order: -1;
//     margin-bottom: 20px;
//   }
//   @media (max-width: 540px) {
//     width: 100%;
//     height: 100vw;
//   }
//   /* border: 1px solid grey; */
// `;

const Button = styled.button`
  width: 120px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: rgb(87, 188, 144);
  border: none;
  font-weight: 600;
  /* border: 1px solid white; */
  color: white;

  @media (max-width: 960px) {
    margin: 0 auto;
    margin-top: 20px;
  }
`;

function Banner() {
  const history = useHistory();

  const handleButtonClick = () => {
    history.push("/events");
  };

  return (
    <BannerContainer>
      <Mask />
      <MainContentContainer className="container-xl">
        <TextContainer>
          <Slogan src={slogan} />
          <TextSubtitle>加入志工的行列，一起改變世界！</TextSubtitle>
          <Button onClick={handleButtonClick}>我要報名</Button>
        </TextContainer>
      </MainContentContainer>
    </BannerContainer>
  );
}

export default Banner;
