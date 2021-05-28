/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { getEvents, getEventsByTags } from "../../utils/firebase.js";
import { useHistory } from "react-router-dom";
import { Col, Card, DropdownButton, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import "mdb-react-ui-kit/dist/css/mdb.min.css";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-top: 20px;
`;

const FilterContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Filter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Tags = styled.div`
  margin-top: 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-grow: 0;
`;

const Tag = styled.div`
  width: 100px;
  font-size: 16px;
  line-height: 20px;
  padding: 5px 15px;
  border: solid 1px #979797;
  border-radius: 20px;
  margin-right: 5px;
  cursor: pointer;
  text-align: center;
`;

const TagSelected = styled.div`
  width: 100px;
  font-size: 16px;
  line-height: 20px;
  padding: 5px 15px;
  border: solid 1px #979797;
  border-radius: 20px;
  margin-right: 5px;
  background: #1190cb;
  color: white;
  cursor: pointer;
  text-align: center;
`;

const SelectContainer = styled.div`
  width: 150px;
  margin-left: 20px;
  flex-grow: 1;
`;

const Selector = styled.select`
  width: 100%;
  height: 32px;
  border: solid 1px #979797;
  border-radius: 10px;
  padding: 0 10px;
  color: #4f4f4f;
  font-size: 16px;
`;

const Events = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  margin: 0 auto;
  padding: 20px 0;
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

const Button = styled.button`
  width: 120px;
  height: 35px;
  background-color: #0085ca;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  line-height: 20px;
  margin-left: 20px;
  cursor: pointer;
`;

const ClearButton = styled.button`
  width: 120px;
  height: 35px;
  background-color: #97979740;
  color: #3e3e3e;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  line-height: 20px;
  margin-left: 10px;
  cursor: pointer;
`;

const styles = {
  cardImage: {
    objectFit: "cover",
    width: "100%",
    height: "150px",
  },
};

function AllEvents() {
  const [rawEvents, setRawEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState({
    tag: "",
    city: "",
  });

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

  const getAllEvents = async () => {
    const newEvents = await getEvents(0);
    newEvents.map((event) => {
      event.startTime = reformatTimestamp(event.startTime);
      event.endTime = reformatTimestamp(event.endTime);
      event.eventAddress = getAdministrativeArea(event);
      return true;
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
    getAllEvents();
    setFilter({ ...filter, tag: selectedTag });
  }, []);

  useEffect(() => {
    console.log(events);
  }, [events]);

  let history = useHistory();
  const handleEventClick = (id) => {
    history.push(`/events/${id}`);
  };

  const handleTagClick = async (e) => {
    const newTag = e.target.textContent;
    if (newTag !== selectedTag) {
      dispatch({ type: "ADD_TAG", data: newTag });
      setFilter({ ...filter, tag: newTag });
    } else {
      dispatch({ type: "ADD_TAG", data: "" });
      setFilter({ ...filter, tag: "" });
    }
  };

  const handleCitySelect = async (e) => {
    console.log(e.target.value);
    const newCity = e.target.value;
    setFilter({ ...filter, city: newCity });
  };

  useEffect(() => {
    console.log(filter);
    getFilteredEvents(filter.tag, filter.city);
  }, [filter.tag, filter.city]);

  const getFilteredEvents = async (tag, city) => {
    console.log(tag);
    let eventArray = rawEvents;
    console.log(rawEvents);
    let filteredEvents = [];

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
    }
    setEvents(filteredEvents);
  };

  const getAdministrativeArea = (event) => {
    let area;
    event.eventAddress.address_components.forEach((e) => {
      if (e.types.includes("administrative_area_level_1")) {
        area = e.long_name;
      }
    });
    return area;
  };

  const handleClearButton = () => {
    setEvents(rawEvents);
    dispatch({ type: "ADD_TAG", data: "" });
    dispatch({ type: "ADD_CITY", data: "" });
    document.getElementById("citySelector").value = "default";
  };

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <Container>
      <FilterContainer>
        <Filter>
          <Tags>
            {tagArray.map((tag, index) =>
              selectedTag === tag ? (
                <TagSelected onClick={(e) => handleTagClick(e)} key={index}>
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
            <Selector
              id="citySelector"
              data-default-value="default"
              onChange={(e) => handleCitySelect(e)}
            >
              <option value="default" selected disabled hidden>
                活動縣市
              </option>
              {cityArray.map((city, index) => (
                <option value={city}>{city}</option>
              ))}
            </Selector>
          </SelectContainer>
        </Filter>
        <Buttons>
          <Button>搜尋活動</Button>
          <ClearButton onClick={handleClearButton}>清除篩選</ClearButton>
        </Buttons>
      </FilterContainer>
      <Events>
        {events.map((event, index) => (
          <Col className="p-0" style={styles.cardCol} key={index}>
            <Card
              className="shadow-sm rounded bg-white"
              onClick={() => handleEventClick(event.eventId)}
              style={{ cursor: "pointer" }}
            >
              <div className="bg-image hover-overlay hover-zoom">
                <Card.Img
                  variant="top"
                  src={event.eventCoverImage}
                  style={styles.cardImage}
                ></Card.Img>
              </div>
              <Card.Body className="py-2 px-3">
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
    </Container>
  );
}

export default AllEvents;
