import styled from "styled-components";
import React from "react";
import animal from "../../images/animal.svg";
import welfare from "../../images/welfare.svg";
import environment from "../../images/environment.svg";
import education from "../../images/education.svg";
import categoryHeaderImgae from "../../images/category_header.png";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const CategoryContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-top: 20px;
`;

const MainContentContainer = styled.div`
  width: 100%;
  margin-top: 800px;
  text-align: center;

  @media (max-width: 960px) {
    margin-top: 500px;
  }
  @media (max-width: 540px) {
    margin-top: 400px;
  }
`;

const CategoryHeader = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 30px;
  padding: 10px 20px;
  font-size: 28px;
  font-weight: 600;
  line-height: 30px;
  text-align: center;
  /* border-bottom: 3px solid #1190cb; */
  font-family: "Noto Sans TC", sans-serif;
  color: #848484;
`;

// const CategoriesContainer = styled.div`
//   width: 100%;
//   margin: 0 auto;
//   margin-top: 30px;
//   padding: 0 20px;
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr 1fr;
//   grid-gap: 20px;
//   align-items: center;
//   @media (max-width: 720px) {
//     grid-template-columns: 1fr 1fr;
//   }
// `;

const Categories = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  margin-top: 60px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  & div + div {
    border-left: 1px solid rgb(200, 200, 200);
  }
`;

const CategoryDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  cursor: pointer;
`;

const CategoryImage = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 auto;
  transition: all 0.3s;
`;

const CategoryText = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  color: #666666;
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
    <CategoryContainer>
      <MainContentContainer>
        <CategoryHeader>探索志工機會</CategoryHeader>
        <Categories>
          <CategoryDiv onClick={() => handleCategoryClick("生態保護")}>
            <CategoryImage src={animal} />
            <CategoryText>生態保護</CategoryText>
          </CategoryDiv>
          <CategoryDiv onClick={() => handleCategoryClick("環境保護")}>
            <CategoryImage src={environment} />
            <CategoryText>環境保護</CategoryText>
          </CategoryDiv>
          <CategoryDiv onClick={() => handleCategoryClick("社會福利")}>
            <CategoryImage src={welfare} />
            <CategoryText>社會福利</CategoryText>
          </CategoryDiv>
          <CategoryDiv onClick={() => handleCategoryClick("文化教育")}>
            <CategoryImage src={education} />
            <CategoryText>文化教育</CategoryText>
          </CategoryDiv>
        </Categories>
      </MainContentContainer>
    </CategoryContainer>
  );
}

export default Category;
