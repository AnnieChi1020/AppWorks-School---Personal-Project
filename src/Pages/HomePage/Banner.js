import styled from "styled-components";
import React from "react";
import banner from "../../images/banner.png";
import { useHistory } from "react-router-dom";

const BannerContainer = styled.div`
  width: 100vw;
  /* height: 500px; */
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  background-color: #f9f8fd;
  position: absolute;
  top: 50px;
  left: 0;
  padding-bottom: 50px;
  @media (max-width: 960px) {
    /* height: 700px; */
  }
  @media (max-width: 540px) {
    /* height: 620px; */
  }
`;

const MainContentContainer = styled.div`
  width: 100%;
  height: 100%;
  /* border: 1px solid grey; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const TextContainer = styled.div`
  width: 600px;
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  @media (max-width: 720px) {
    width: 100%;
  }
`;

const TextHeader = styled.div`
  width: 100%;
  font-size: 36px;
  font-weight: 700;
  line-height: 38px;
  padding: 5px 20px;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  @media (max-width: 960px) {
    font-size: 30px;
    text-align: center;
  }
  @media (max-width: 540px) {
    font-size: 24px;
    padding: 0px 20px;
  }
`;

const TextSubtitle = styled.div`
  width: 100%;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  padding: 5px 20px;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  @media (max-width: 960px) {
    font-size: 16px;
    text-align: center;
  }
`;

const ImageContainer = styled.div`
  width: 450px;
  height: 450px;
  flex-grow: 0;
  @media (max-width: 960px) {
    order: -1;
    margin-bottom: 20px;
  }
  @media (max-width: 540px) {
    width: 100%;
    height: 100vw;
  }
  /* border: 1px solid grey; */
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Button = styled.button`
  width: 120px;
  margin-top: 20px;
  margin-left: 20px;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: #1190cb;
  border: 1px solid white;
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
      <MainContentContainer className="container-xl">
        <TextContainer>
          <TextHeader>Together</TextHeader>
          <TextHeader>We Can Make A Difference</TextHeader>
          <TextSubtitle>加入志工的行列，一起改變世界！</TextSubtitle>
          <Button onClick={handleButtonClick}>我要報名</Button>
        </TextContainer>
        <ImageContainer>
          <Image src={banner} />
        </ImageContainer>
      </MainContentContainer>
    </BannerContainer>
  );
}

export default Banner;
