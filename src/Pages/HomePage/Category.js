import styled from "styled-components";
import React from "react";
import animal from "../../images/animal.png";
import welfare from "../../images/welfare.png";
import environment from "../../images/environment.png";
import education from "../../images/education.png";
import animalBackground from "../../images/animal_background.jpg";
import welfareBackground from "../../images/welfare.jpg";
import environmentBackground from "../../images/environment.jpg";
import educationBackground from "../../images/education.jpg";
import ReactCardFlipper from "react-card-flipper";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const CategoryContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-top: 20px;
`;

const MainContentContainer = styled.div`
  width: 100%;
  margin-top: 570px;
  text-align: center;
`;

const CategoryHeader = styled.div`
  width: 130px;
  margin: 0 auto;
  margin-top: 30px;
  padding: 10px 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  border-bottom: 3px solid #1190cb;
`;

const CategoriesContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  align-items: center;
`;

const CategoryCard = styled.div`
  width: 100%;
  flex-shrink: 1;
`;

const FrontCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: #89b2c461;
  border-radius: 20px;
  padding: 50px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

const BackCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: #89b2c461;
  border-radius: 20px;
  align-items: center;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

const FrontImage = styled.img`
  width: 120px;
  height: 120px;
`;

const BackImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const BackMask = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(251, 251, 251, 0.4);
  border-radius: 20px;
  position: absolute;
  top: 0;
  left: 0;
`;

const BackText = styled.span`
  width: 100%;
  color: white;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 4px;
  line-height: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-shadow: 0.1em 0.1em 0.2em black;
`;

function Category() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleCardClick = (e) => {
    console.log(e);
    history.push(`/events`);
    dispatch({ type: "ADD_TAG", data: e });
  };

  return (
    <CategoryContainer>
      <MainContentContainer>
        <CategoryHeader>探索志工機會</CategoryHeader>
        <CategoriesContainer>
          <CategoryCard onClick={(e) => handleCardClick("社會福利")}>
            <ReactCardFlipper width="100%" height="250px" behavior="hover">
              <FrontCard>
                <FrontImage src={welfare} />
              </FrontCard>
              <BackCard>
                <BackText>社會福利</BackText>
                <BackImage src={welfareBackground} />
                <BackMask />
              </BackCard>
            </ReactCardFlipper>
          </CategoryCard>
          <CategoryCard onClick={(e) => handleCardClick("文化教育")}>
            <ReactCardFlipper width="100%" height="250px" behavior="hover">
              <FrontCard>
                <FrontImage src={education} />
              </FrontCard>
              <BackCard>
                <BackText>文化教育</BackText>
                <BackImage src={educationBackground} />
                <BackMask />
              </BackCard>
            </ReactCardFlipper>
          </CategoryCard>
          <CategoryCard onClick={(e) => handleCardClick("生態保護")}>
            <ReactCardFlipper width="100%" height="250px" behavior="hover">
              <FrontCard>
                <FrontImage src={animal} />
              </FrontCard>
              <BackCard>
                <BackText>生態保護</BackText>
                <BackImage src={animalBackground} />
                <BackMask />
              </BackCard>
            </ReactCardFlipper>
          </CategoryCard>
          <CategoryCard onClick={(e) => handleCardClick("環境保護")}>
            <ReactCardFlipper width="100%" height="250px" behavior="hover">
              <FrontCard>
                <FrontImage src={environment} />
              </FrontCard>
              <BackCard>
                <BackText>環境保護</BackText>
                <BackImage src={environmentBackground} />
                <BackMask />
              </BackCard>
            </ReactCardFlipper>
          </CategoryCard>
        </CategoriesContainer>
      </MainContentContainer>
    </CategoryContainer>
  );
}

export default Category;
