/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { getEvents } from "../../utils/firebase.js";
import { useHistory } from "react-router-dom";
import { Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import noEventImage from "../../images/noEvent.png";
// import eventBanner from "../../images/eventBanner.png";
import eventsBackground from "../../images/events_header_2.png";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import "mdb-react-ui-kit/dist/css/mdb.min.css";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 60px;
  padding: 20px 30px 30px 30px;
  background-color: white;
  @media (max-width: 540px) {
    padding: 20px 10px 30px 10px;
  }
`;

const BannerContainer = styled.div`
  width: 100%;
  /* height: 300px; */
  padding: 30px 0;
  margin: 0 auto;
  margin-bottom: 10px;
  text-align: center;
  position: relative;
  @media (max-width: 760px) {
  }
  @media (max-width: 540px) {
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  margin: 0 auto;
  border-radius: 10px;
  @media (max-width: 760px) {
    height: 200px;
  }
  @media (max-width: 540px) {
    height: 150px;
  }
`;

const BannerText = styled.div`
  width: 300px;
  font-size: 44px;
  line-height: 48px;
  font-weight: 900;
  color: #6ca68d;
  margin: 0 auto;
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 760px) {
    font-size: 36px;
    line-height: 40px;
    font-weight: 900;
    top: 130px;
  }
  @media (max-width: 540px) {
    font-size: 28px;
    line-height: 32px;
    font-weight: 900;
    top: 100px;
  }
`;

const FilterContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
`;

const Filter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 760px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// const Buttons = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
// `;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-grow: 0;
  align-items: center;
  @media (max-width: 760px) {
    /* flex-wrap: wrap; */
  }
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
    /* background: #ebfff0; */
    box-shadow: 1px 1px 1px 1.5px rgba(0, 0, 0, 0.1);
  }
`;

const TagSelected = styled.div`
  width: 100px;
  font-size: 16px;
  line-height: 20px;
  padding: 5px 15px;
  border: solid 1px #4b9b7a;
  border-radius: 20px;
  margin-right: 5px;
  background: #57bb92;
  color: white;
  cursor: pointer;
  text-align: center;
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

const MainContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 110px); ;
`;

const Events = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px 15px;
  margin: 0 auto;
  padding: 20px 0 80px 0;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const EventTagContianer = styled.div`
  width: 100%;
  margin: 10px 0 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const EventTag = styled.div`
  font-size: 14px;
  line-height: 20px;
  padding: 0 8px;
  border: solid 1px #979797;
  border-radius: 20px;
  margin-right: 5px;
  color: #4f4f4f;

  @media (max-width: 1024px) {
    font-size: 12px;
  }
`;

// const TagIcon = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: white;
//   position: absolute;
//   border: 1px solid grey;
//   border-radius: 50%;
//   top: -10px;
//   right: 10px;
// `;

const EventTime = styled.div`
  font-size: 12px;
  line-height: 16px;
  margin-top: 5px;
`;

const EventTitle = styled.div`
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #3e3e3e;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// const Button = styled.button`
//   width: 120px;
//   height: 35px;
//   background-color: #0085ca;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   font-size: 16px;
//   line-height: 20px;
//   margin-left: 20px;
//   cursor: pointer;
// `;

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

const NoEvent = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
  padding: 20px 0;
  text-align: center;
`;

const NoEventImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
`;

const NoEventText = styled.div`
  width: 100%;
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  margin-top: 20px;
  padding: 10px;
  color: #656565; ;
`;

const styles = {
  cardImage: {},
};

const Styles = styled.div`
  .eventCard {
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 10px !important;
  }
  .cardImage {
    object-fit: cover;
    width: 100%;
    height: 150px;
    border-radius: 10px 10px 0 0 !important;
  }

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

function AllEvents() {
  let selectedTag = useSelector((state) => state.filter.tag);
  let selectedCity = useSelector((state) => state.filter.city);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "ADD_CITY", data: "" });
  }, []);

  const [rawEvents, setRawEvents] = useState([]);
  const [events, setEvents] = useState([]);

  const [noEvent, setNoEvent] = useState(false);

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

  const getAllEvents = async () => {
    const newEvents = await getEvents(0);
    newEvents.forEach((event) => {
      event.startTime = reformatTimestamp(event.startTime);
      event.endTime = reformatTimestamp(event.endTime);
      event.eventAddress = getAdministrativeArea(event);
    });
    setRawEvents(newEvents);
    setEvents(newEvents);
  };

  const getDay = (day) => {
    const dayArray = ["日", "一", "二", "三", "四", "五", "六"];
    return dayArray[day];
  };

  const reformatTimestamp = (timestamp) => {
    const year = timestamp.toDate().getFullYear();
    const month = timestamp.toDate().getMonth() + 1;
    const date = timestamp.toDate().getDate();
    const day = getDay(timestamp.toDate().getDay());
    const reformatedTime = `${year}-${month}-${date} (${day})`;
    return reformatedTime;
  };

  useEffect(() => {
    setNoEvent(false);
    getFilteredEvents(selectedTag, "");
  }, [rawEvents]);

  useEffect(() => {
    getAllEvents();
  }, []);

  let history = useHistory();
  const handleEventClick = (id) => {
    history.push(`/events/${id}`);
  };

  const handleTagClick = async (e) => {
    const newTag = e.target.textContent;
    if (newTag !== selectedTag) {
      dispatch({ type: "ADD_TAG", data: newTag });
    } else {
      dispatch({ type: "ADD_TAG", data: "" });
    }
  };

  const handleCitySelect = async (e) => {
    // const newCity = e.target.value;
    const newCity = e;
    dispatch({ type: "ADD_CITY", data: newCity });
  };

  useEffect(() => {
    getFilteredEvents(selectedTag, selectedCity);
  }, [selectedTag, selectedCity]);

  const getFilteredEvents = async (tag, city) => {
    let eventArray = rawEvents;
    let filteredEvents = [];
    setNoEvent(false);

    if (tag && city) {
      eventArray.forEach((event) => {
        if (event.eventTags.includes(tag) && event.eventAddress.match(city)) {
          filteredEvents.push(event);
        }
      });
    } else if (tag) {
      eventArray.forEach((event) => {
        if (event.eventTags.includes(tag)) {
          filteredEvents.push(event);
        }
      });
    } else if (city) {
      eventArray.forEach((event) => {
        if (event.eventAddress.match(city)) {
          filteredEvents.push(event);
        }
      });
    } else {
      filteredEvents = rawEvents;
    }
    if (rawEvents.length > 0 && filteredEvents.length === 0) {
      setNoEvent(true);
    }
    setEvents(filteredEvents);
  };

  const getAdministrativeArea = (event) => {
    let area;
    event.eventAddress.address_components.forEach((e) => {
      if (e.types.includes("administrative_area_level_1")) {
        area = e.long_name;
      } else if (e.types.includes("administrative_area_level_2")) {
        area = e.long_name;
      }
    });
    return area;
  };

  const defaultOption = "";
  const handleClearButton = () => {
    dispatch({ type: "ADD_TAG", data: "" });
    dispatch({ type: "ADD_CITY", data: "" });
    document.querySelector(".Dropdown-placeholder").innerHTML = "活動縣市 ";
  };

  return (
    <Styles>
      <Container>
        <MainContainer>
          <BannerContainer>
            <BannerText>探索志工機會</BannerText>
            <BannerImage src={eventsBackground} />
          </BannerContainer>
          <FilterContainer>
            <Filter>
              <Tags>
                {tagArray.map((tag, index) =>
                  selectedTag === tag ? (
                    <TagSelected
                    // onClick={(e) => handleTagClick(e)}
                    // key={index}
                    >
                      {tag}
                    </TagSelected>
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
            </Filter>
            {/* <Buttons>
          <Button>搜尋活動</Button>
          <ClearButton onClick={handleClearButton}>清除篩選</ClearButton>
        </Buttons> */}
          </FilterContainer>
          {events.length > 0 && (
            <Events>
              {events.map((event, index) => (
                <Col className="p-0 " style={styles.cardCol} key={index}>
                  <Card
                    className="shadow-sm rounded bg-white h-100 eventCard"
                    onClick={() => handleEventClick(event.eventId)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="bg-image hover-overlay hover-zoom">
                      <Card.Img
                        variant="top"
                        src={event.eventCoverImage}
                        className="cardImage"
                      ></Card.Img>
                    </div>
                    <Card.Body
                      className="py-2 px-3"
                      style={{ position: "relative" }}
                    >
                      {/* <TagIcon></TagIcon> */}
                      <EventTagContianer>
                        {event.eventTags.map((tag, index) => (
                          <EventTag key={index}>{tag}</EventTag>
                        ))}
                        <EventTag>{event.eventAddress}</EventTag>
                      </EventTagContianer>
                      <EventTime>{`${event.startTime} ~ ${event.endTime}`}</EventTime>
                      <EventTitle>{event.eventTitle}</EventTitle>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Events>
          )}

          {noEvent ? (
            <NoEvent>
              <NoEventImage src={noEventImage} />
              <NoEventText>目前沒有活動哦</NoEventText>
            </NoEvent>
          ) : (
            <div />
          )}
        </MainContainer>
      </Container>
    </Styles>
  );
}

export default AllEvents;
