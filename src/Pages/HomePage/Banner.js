import styled from "styled-components";
import React from "react";
// import banner from "../../images/background.jpg";
import slogan from "../../images/slogan.png";
import join from "../../images/join_text.png";
import animal from "../../images/animal.png";
import welfare from "../../images/welfare.png";
import environment from "../../images/environment.png";
import education from "../../images/education.png";
// import banner from "../../images/banner.svg";
import banner from "../../images/banner_3.png";

import { useHistory } from "react-router-dom";

const BannerContainer = styled.div`
  width: 100%;
  height: 700px;
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
  position: relative;
  /* top: 50px; */
  /* left: 0; */
  align-items: center;

  @media (max-width: 960px) {
    height: 400px;
  }
  @media (max-width: 540px) {
    height: 300px;
  }
`;

const Mask = styled.div`
  width: 100%;
  height: 700px;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgb(0, 0, 0, 0.2);
  @media (max-width: 960px) {
    height: 400px;
  }
  @media (max-width: 540px) {
    height: 300px;
  }
`;

const MainContentContainer = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px;
  padding: 50px;

  @media (max-width: 960px) {
    padding: 40px;
  }
  @media (max-width: 540px) {
    padding: 20px;
  }

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
  flex-grow: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Slogan = styled.img`
  width: auto;
  height: 150px;
  object-fit: contain;
  filter: none;
  margin: 0 auto;
  margin-top: 0px;
  margin-left: 0;
  @media (max-width: 960px) {
    height: 100px;
  }
  @media (max-width: 540px) {
    height: 80px;
  }
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
  width: 130px;
  margin-left: 90px;
  margin-top: 50px;
  padding: 5px 10px;
  border-radius: 20px;
  /* background-color: rgb(87, 188, 144); */
  background-color: inherit;
  background-color: rgb(251, 251, 251, 0.2);
  border: none;
  font-weight: 600;
  border: 1px solid white;
  color: white;
  letter-spacing: 3px;
  font-size: 18px;

  :hover {
    background-color: rgb(87, 188, 144);
    /* box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3); */
    border: 1px solid rgb(87, 188, 144);
  }
  :active {
    background-color: #52a983;
    /* box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3); */
    border: 1px solid #43886a;
  }

  @media (max-width: 960px) {
    width: 110px;
    margin-top: 40px;
    margin-left: 50px;
    font-size: 16px;
    padding: 3px 5px;
  }
  @media (max-width: 540px) {
    width: 90px;
    margin-top: 20px;
    margin-left: 20px;
    font-size: 14px;
    padding: 3px 5px;
  }
`;

function Banner() {
  const history = useHistory();

  const handleButtonClick = () => {
    setTimeout(function () {
      history.push("/events");
    }, 1500);
  };

  return (
    <BannerContainer>
      <Mask />
      <MainContentContainer className="container-xl">
        <TextContainer>
          {/* <Slogan src={slogan} /> */}
          <Slogan src={join} />

          {/* <TextSubtitle>加入志工的行列，一起改變世界！</TextSubtitle> */}
          {/* <TextSubtitle>加入志工的行列，一起改變世界！</TextSubtitle> */}

          <Button onClick={handleButtonClick}>我要報名</Button>
        </TextContainer>
      </MainContentContainer>
    </BannerContainer>
  );
}

export default Banner;
