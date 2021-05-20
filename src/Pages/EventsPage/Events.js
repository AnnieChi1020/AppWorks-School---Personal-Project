import styled, { withTheme } from "styled-components";
import React, { useEffect, useState } from "react";
import { getEvents, getEventsWithTag } from "../../utils/firebase.js";
import { useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  DropdownButton,
  Dropdown,
  Alert,
} from "react-bootstrap";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const Events = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  margin: 0 auto;
  padding: 20px 0;
`;

// const Event = styled.div`
//   width: 100%;
//   margin-bottom: 20px;
// `;

// const EventImage = styled.img`
//   width: 100%;
//   height: 20vw;
//   object-fit: cover;
// `;

const EventTime = styled.div`
  font-size: 12px;
  line-height: 16px;
  margin-top: 5px;
`;

const EventTitle = styled.div`
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const Tags = styled.div`
  width: 100%;
  margin-top: 20px;
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
  background: #656565;
  color: white;
  cursor: pointer;
`;

const EventTags = styled.div`
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
`;

const styles = {
  dropdownButton: {},
  cardImage: {
    objectFit: "cover",
    width: "100%",
    height: "150px",
  },
};

function AllEvents() {
  const [events, setEvents] = useState([]);
  const [tags, setTags] = useState([
    { name: "社會福利", id: "socialWelfare", select: false },
    { name: "文化教育", id: "cultureEducation", select: false },
    { name: "環境保護", id: "environment", select: false },
    { name: "生態保護", id: "conservation", select: false },
  ]);
  const cityArray = [
    "台北市",
    "新北市",
    "桃園市",
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
    const time = timestamp.toDate().toTimeString().slice(0, 5);
    const reformatedTime = `${year}-${month}-${date}(${day}) ${time}`;
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

  const getEventsWithTagData = async () => {
    let tagExist = false;
    let selectedTag;
    let eventData;
    tags.forEach(async (tag) => {
      if (tag.select === true) {
        selectedTag = tag.id;
        tagExist = true;
      }
      if (tagExist) {
        eventData = await getEventsWithTag(selectedTag);

        eventData.map((event) => {
          event.startTime = reformatTimestamp(event.startTime);
          event.endTime = reformatTimestamp(event.endTime);
          event.eventAddress = getAdministrativeArea(event);
          // console.log(getAdministrativeArea(event));
          return true;
        });
        setEvents(eventData);
      } else {
        // eventData = await getEvents(0);
        // setEvents(eventData);
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
    getEventsWithTagData();
  }, [tags]);

  const getTagName = (tagId) => {
    let name;
    const array = [
      { name: "社會福利", id: "socialWelfare" },
      { name: "文化教育", id: "cultureEducation" },
      { name: "環境保護", id: "environment" },
      { name: "生態保護", id: "conservation" },
    ];
    array.forEach((e) => {
      if (tagId === e.id) {
        name = e.name;
      }
    });
    return name;
  };

  return (
    <Wrapper>
      <div className="px-1 mb-2 container-md d-flex">
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
          id="dropdown-basic-button"
          title="找尋所在地的活動"
          style={styles.dropdownButton}
        >
          {cityArray.map((city, index) => (
            <Dropdown.Item>{city}</Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <div className="mb-5 container-md">
        <Row className="mr-n3 d-flex">
          {events.map((event, index) => (
            <Col
              className="col-12 col-sm-6 col-lg-4 px-2 py-3"
              style={styles.cardCol}
            >
              <Card
                key={index}
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
                  <EventTags>
                    {event.eventTags.map((tag, index) => (
                      <EventTag key={index}>{getTagName(tag)}</EventTag>
                    ))}
                    <EventTag>{event.eventAddress}</EventTag>
                  </EventTags>
                  <EventTime>{`${event.startTime} - ${event.endTime}`}</EventTime>
                  <EventTitle>{event.eventTitle}</EventTitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Wrapper>
  );
}

export default AllEvents;
