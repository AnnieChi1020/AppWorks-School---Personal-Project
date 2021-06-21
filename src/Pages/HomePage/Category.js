import styled from "styled-components";
import React from "react";
import animal from "../../images/animal.svg";
import welfare from "../../images/welfare.svg";
import environment from "../../images/environment.svg";
import education from "../../images/education.svg";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const CategoryContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 100px 20px 190px 20px;
  @media (max-width: 760px) {
    padding: 90px 20px 120px 20px;
  }
  @media (max-width: 540px) {
    padding: 60px 20px 70px 20px;
  }
`;

const MainContentContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const CategoryHeader = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 20px;
  font-size: 32px;
  font-weight: 600;
  line-height: 34px;
  text-align: center;
  /* border-bottom: 3px solid #1190cb; */
  font-family: "Noto Sans TC", sans-serif;
  color: #989898;
  letter-spacing: 2px;
  @media (max-width: 960px) {
    font-size: 30px;
    font-weight: 600;
    line-height: 34px;
  }
  @media (max-width: 540px) {
    font-size: 24px;
    font-weight: 600;
    line-height: 28px;
  }
`;

const Categories = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  & div + div {
    border-left: 1px solid rgb(220 220 220);
  }
`;

const CategoryDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  cursor: pointer;

  :hover {
    img {
      transform: scale(1.2) rotate(5deg);
    }
  }
`;

const CategoryImage = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 auto;
  transition: transform 0.7s ease-in-out;
`;

const CategoryText = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  color: #9e9e9e;
  font-size: 18px;
  line-height: 20px;
  font-weight: 600;
  margin-top: 20px;
`;

function Category() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleCategoryClick = (e) => {
    history.push(`/events`);
    dispatch({ type: "ADD_TAG", data: e });
  };

  return (
    <CategoryContainer className="container-xl">
      <MainContentContainer>
        <CategoryHeader>探索志工機會</CategoryHeader>
        <Categories>
          <CategoryDiv onClick={() => handleCategoryClick("生態保護")}>
            <CategoryImage src={animal} />
            <CategoryText>生態保護</CategoryText>
          </CategoryDiv>
          <CategoryDiv onClick={() => handleCategoryClick("社會福利")}>
            <CategoryImage src={welfare} />
            <CategoryText>社會福利</CategoryText>
          </CategoryDiv>
          <CategoryDiv onClick={() => handleCategoryClick("文化教育")}>
            <CategoryImage src={education} />
            <CategoryText>文化教育</CategoryText>
          </CategoryDiv>
          <CategoryDiv onClick={() => handleCategoryClick("環境保護")}>
            <CategoryImage src={environment} />
            <CategoryText>環境保護</CategoryText>
          </CategoryDiv>
        </Categories>
      </MainContentContainer>
    </CategoryContainer>
  );
}

export default Category;
