/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { getEvents, getEventsByTags } from "../../utils/firebase.js";
import { useHistory } from "react-router-dom";
import { Col, Card, DropdownButton, Dropdown } from "react-bootstrap";
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
  justify-content: space-between;
  align-items: center;
`;

const Tags = styled.div`
  width: 100%;
  margin-top: 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const Tag = styled.div`
  font-size: 16px;
  line-height: 20px;
  padding: 5px 15px;
  border: solid 1px #979797;
  border-radius: 20px;
  margin-right: 5px;
  cursor: pointer;
`;

const TagSelected = styled.div`
  font-size: 16px;
  line-height: 20px;
  padding: 5px 15px;
  border: solid 1px #979797;
  border-radius: 20px;
  margin-right: 5px;
  background: #1190cb;
  color: white;
  cursor: pointer;
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

const styles = {
  cardImage: {
    objectFit: "cover",
    width: "100%",
    height: "150px",
  },
};

function AllEvents() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState({
    tag: "",
    city: "找尋所在地的活動",
  });
  const [tags, setTags] = useState([
    { name: "社會福利", id: "社會福利", select: false },
    { name: "文化教育", id: "文化教育", select: false },
    { name: "環境保護", id: "環境保護", select: false },
    { name: "生態保護", id: "生態保護", select: false },
  ]);
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

  const getAllEvents = async () => {
    const newEvents = await getEvents(0);
    newEvents.map((event) => {
      event.startTime = reformatTimestamp(event.startTime);
      event.endTime = reformatTimestamp(event.endTime);
      event.eventAddress = getAdministrativeArea(event);
      return true;
    });
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
  }, []);

  let history = useHistory();
  const handleEventClick = (id) => {
    history.push(`/events/${id}`);
  };

  const handleTagClick = async (tag) => {
    const selectedTag = tag.target.id;
    setTags(
      tags.map((tag) =>
        tag.id === selectedTag && tag.select === false
          ? { ...tag, select: true }
          : tag.id === selectedTag && tag.select === true
          ? { ...tag, select: false }
          : { ...tag, select: false }
      )
    );
  };

  const getEventsByTagsData = async () => {
    let tagExist = false;
    let selectedTag;
    let eventData;
    tags.forEach(async (tag) => {
      if (tag.select === true) {
        selectedTag = tag.id;
        tagExist = true;
      }
      if (tagExist) {
        eventData = await getEventsByTags(selectedTag);
        eventData.map((event) => {
          event.startTime = reformatTimestamp(event.startTime);
          event.endTime = reformatTimestamp(event.endTime);
          event.eventAddress = getAdministrativeArea(event);
          return true;
        });
        setEvents(eventData);
      }
    });
    return;
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

  useEffect(() => {
    getEventsByTagsData();
  }, [tags]);

  const handleAreaChange = async (city) => {
    setFilter({ ...filter, city: city });
    let eventArray = [];
    const events = await getEvents(0);
    events.forEach((event) => {
      if (event.eventAddress.formatted_address.match(city)) {
        event.startTime = reformatTimestamp(event.startTime);
        event.endTime = reformatTimestamp(event.endTime);
        event.eventAddress = getAdministrativeArea(event);
        eventArray.push(event);
      }
    });
    setEvents(eventArray);
  };

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <Container>
      <FilterContainer>
        <Tags>
          {tags.map((tag, index) =>
            tag.select === true ? (
              <TagSelected
                onClick={(e) => handleTagClick(e)}
                id={tag.id}
                key={index}
              >
                {tag.name}
              </TagSelected>
            ) : (
              <Tag onClick={(e) => handleTagClick(e)} id={tag.id} key={index}>
                {tag.name}
              </Tag>
            )
          )}
        </Tags>
        <DropdownButton
          variant="secondary"
          id="dropdown-basic-button"
          title={filter.city}
        >
          {cityArray.map((city, index) => (
            <Dropdown.Item
              key={index}
              eventKey={city}
              onSelect={handleAreaChange}
            >
              {city}
            </Dropdown.Item>
          ))}
        </DropdownButton>
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
