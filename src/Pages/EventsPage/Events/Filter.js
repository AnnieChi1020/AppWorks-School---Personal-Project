import React, { useEffect } from "react";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import { useSelector, useDispatch } from "react-redux";


const FilterContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
`;

const Filters = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 760px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-grow: 0;
  align-items: center;
`;

const Tag = styled.div`
  width: 100px;
  font-size: 16px;
  line-height: 20px;
  padding: 5px 15px;
  border: 1px solid #57bb92;
  color: #57bb92;
  border-radius: 20px;
  margin-right: 5px;
  cursor: pointer;
  text-align: center;
  background-color: white;
  @media (max-width: 760px) {
    width: 80px;
    font-size: 14px;
    line-height: 16px;
    padding: 5px 5px;
  }
  @media (max-width: 540px) {
    width: 70px;
    font-size: 12px;
    line-height: 14px;
    padding: 5px 5px;
  }
  :hover {
    box-shadow: 1px 1px 1px 1.5px rgba(0, 0, 0, 0.1);
  }
`;

const TagSelected = styled(Tag)`
  border-color: #4b9b7a;
  background: #57bb92;
  color: white;
`;

const SelectContainer = styled.div`
  margin-left: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 760px) {
    width: 100%;
    margin-top: 10px;
    margin-left: 0px;
    justify-content: flex-start;
  }
`;

const ClearButton = styled.button`
  width: 100px;
  height: 32px;
  background-color: #57bb6b29;
  color: #6c6c6c;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  line-height: 20px;
  margin-left: 10px;
  cursor: pointer;
  @media (max-width: 760px) {
    width: 100px;
    font-size: 14px;
    line-height: 16px;
    height: 28px;
  }
  @media (max-width: 540px) {
    width: 80px;
    font-size: 12px;
    line-height: 14px;
    height: 26px;
  }
`;

const Styles = styled.div`
  .city-select {
    background-color: white;
    height: 32px;
    width: 120px;
    border: solid 1px #57bb92;
    border-radius: 10px;
    padding: 5px 15px;
    color: #57bb92;
    font-size: 16px;
    line-height: 20px;
    box-shadow: none;
    text-align: left;
    cursor: pointer;
    .Dropdown-arrow {
      position: absolute;
      top: 45%;
      right: 10px;
    }
    @media (max-width: 760px) {
      height: 28px;
      width: 120px;
      padding: 5px 5px 5px 10px;
      font-size: 14px;
      line-height: 16px;
    }
    @media (max-width: 540px) {
      height: 26px;
      width: 100px;
      font-size: 12px;
      line-height: 14px;
    }
  }
  .city-select-menu {
    margin-top: 0px;
    border: solid 1px #57bb92;
    @media (max-width: 760px) {
      font-size: 14px;
      line-height: 16px;
    }

    @media (max-width: 540px) {
      font-size: 12px;
      line-height: 14px;
    }
  }
`;

function Filter() {

  const cityArray = [
    "台北市",
    "新北市",
    "桃園市",
    "新竹市",
    "新竹縣",
    "苗栗縣",
    "台中市",
    "彰化縣",
    "雲林縣",
    "嘉義縣",
    "台南市",
    "高雄市",
    "屏東縣",
    "宜蘭縣",
    "花蓮縣",
    "台東縣",
  ];

  const tagArray = ["社會福利", "文化教育", "環境保護", "生態保護"];

  let selectedTag = useSelector((state) => state.filter.tag);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "ADD_CITY", data: "" });
    // eslint-disable-next-line
  }, []);

  const handleTagClick = async (e) => {
    const newTag = e.target.textContent;
    if (newTag !== selectedTag) {
      dispatch({ type: "ADD_TAG", data: newTag });
    } else {
      dispatch({ type: "ADD_TAG", data: "" });
    }
  };

  const handleCitySelect = async (e) => {
    const newCity = e;
    dispatch({ type: "ADD_CITY", data: newCity });
  };

  const defaultOption = "";
  const handleClearButton = () => {
    dispatch({ type: "ADD_TAG", data: "" });
    dispatch({ type: "ADD_CITY", data: "" });
    document.querySelector(".Dropdown-placeholder").innerHTML = "活動縣市 ";
  };

  return (
    <Styles>
      <FilterContainer>
        <Filters>
          <Tags>
            {tagArray.map((tag, index) =>
              selectedTag === tag ? (
                <TagSelected key={index}>{tag}</TagSelected>
              ) : (
                <Tag onClick={(e) => handleTagClick(e)} key={index}>
                  {tag}
                </Tag>
              )
            )}
          </Tags>
          <SelectContainer>
            <Dropdown
              options={cityArray}
              onChange={(e) => handleCitySelect(e.value)}
              placeholder="活動縣市 "
              controlClassName="city-select"
              menuClassName="city-select-menu"
              value={defaultOption}
            />
            <ClearButton onClick={handleClearButton}>清除篩選</ClearButton>
          </SelectContainer>
        </Filters>
      </FilterContainer>
    </Styles>
  );
}

export default Filter;
