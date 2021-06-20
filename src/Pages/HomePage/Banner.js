import styled from "styled-components";
import React from "react";
import banner from "../../images/banner_3.png";

import { useHistory } from "react-router-dom";

const BannerContainer = styled.div`
  width: 100%;
  height: 700px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  background-color: #f6efe6;
  background-image: url(${banner});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
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
  width: 90%;
  max-width: 1200px;
  height: calc(100% - 50px);
  margin-top: 50px;
  padding: 50px;

  @media (max-width: 960px) {
    padding: 40px;
  }
  @media (max-width: 760px) {
    padding: 20px;
  }
  @media (max-width: 540px) {
    padding: 0px;
  }
`;

const TextContainer = styled.div`
  width: 500px;
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

const TextSubtitle = styled.div`
  width: 100%;
  font-size: 48px;
  font-weight: 900;
  line-height: 50px;
  padding: 10px 0;
  color: #ffffff;
  text-align: left;
  margin-top: 0px;

  @media (max-width: 960px) {
    font-size: 36px;
    font-weight: 900;
    line-height: 40px;
    padding: 5px 0;
    margin-left: 20px;
  }
  @media (max-width: 540px) {
    font-size: 24px;
    font-weight: 900;
    line-height: 30px;
    padding: 3px 0;
    margin-left: 20px;
  }
`;

const Button = styled.button`
  width: 130px;
  margin-left: 5px;
  margin-top: 50px;
  padding: 5px 10px;
  border-radius: 20px;
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
    border: 1px solid rgb(87, 188, 144);
  }
  :active {
    background-color: #52a983;
    border: 1px solid #43886a;
  }

  @media (max-width: 960px) {
    width: 110px;
    margin-top: 40px;
    margin-left: 25px;
    font-size: 16px;
    padding: 3px 5px;
  }
  @media (max-width: 540px) {
    width: 90px;
    margin-top: 20px;
    margin-left: 20px;
    font-size: 12px;
    padding: 3px 5px;
  }
`;

function Banner() {
  const history = useHistory();

  const handleButtonClick = () => {
    // setTimeout(function () {
      history.push("/events");
    // }, 1500);
  };

  return (
    <BannerContainer>
      <Mask />
      <MainContentContainer className="container-xl">
        <TextContainer>
          <TextSubtitle>加入志工的行列</TextSubtitle>
          <TextSubtitle>一起改變世界</TextSubtitle>
          <Button onClick={handleButtonClick} data-testid="signUpButton">
            我要報名
          </Button>
        </TextContainer>
      </MainContentContainer>
    </BannerContainer>
  );
}

export default Banner;
