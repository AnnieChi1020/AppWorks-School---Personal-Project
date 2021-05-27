/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import background from "../../../../images/background.jpg";
import { Form, Row, Col } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
import {
  getImageURL,
  getEventInfo,
  updateEvent,
} from "../../../../utils/firebase.js";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Mask = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 0px;
`;

const CreateEventContainer = styled.div`
  width: 80%;
  display: flex;
  margin: 0 auto;
  margin-top: 120px;
  margin-bottom: 100px;
  flex-direction: column;
  padding: 10px 20px;
  background-color: white;
  border-radius: 8px;
  border: solid 1px #979797;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Option = styled.div`
  line-height: 20px;
  font-size: 1rem;
  padding: 5px 25px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
  color: #495057;
`;

const OptionSelected = styled.div`
  line-height: 20px;
  font-size: 1rem;
  padding: 5px 25px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: #636363;
  color: white;
  text-align: center;
`;

const Map = styled.iframe`
  width: 100%;
  height: 30vw;
  max-height: 500px;
  border-radius: 10px;
`;

const Button = styled.button`
  width: 140px;
  background-color: #0e6cd0;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  line-height: 1.5;
  padding: 5px 20px;
  margin-left: calc(50% - 70px);
  margin-top: 40px;
  margin-bottom: 20px;
`;

function EditEvent() {
  const { id } = useParams();
  const eventId = id;

  const [file, setFile] = useState(null);
  const [event, setEvent] = useState({
    eventId: "",
    eventTitle: "",
    eventContent: "",
    eventCoverImage: "",
    startTime: {
      date: "",
      time: "",
    },
    endTime: {
      date: "",
      time: "",
    },
    eventStatus: "",
    eventTags: [],
    hosterId: "",
    resultImage: [],
    resultContent: "",
    eventAddress: "",
  });

  const [address, setAddress] = useState({ city: "", address: "" });

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

  const getCurrentEventInfo = async () => {
    let eventInfo = await getEventInfo(eventId);

    const reformatedStartTime = {
      date: getReformatedDate(eventInfo.startTime.toDate()),
      time: getReformatedTime(eventInfo.startTime.toDate()),
    };
    const reformatedEndTime = {
      date: getReformatedDate(eventInfo.endTime.toDate()),
      time: getReformatedTime(eventInfo.endTime.toDate()),
    };

    const addressText = () => {
      const addressComponents = eventInfo.eventAddress.address_components;
      let addressText = "";
      for (let i = addressComponents.length - 4; i > -1; i--) {
        addressText += addressComponents[i].short_name;
      }
      return addressText;
    };

    const addressCity = () => {
      const addressComponents = eventInfo.eventAddress.address_components;
      const location = addressComponents.length - 3;
      return addressComponents[location].short_name;
    };

    // const reformatedAddress = {
    //   city: addressCity(),
    //   address: addressText(),
    // };

    setEvent({
      eventId: eventInfo.eventId,
      eventTitle: eventInfo.eventTitle,
      eventContent: eventInfo.eventContent,
      eventCoverImage: eventInfo.eventCoverImage,
      startTime: reformatedStartTime,
      endTime: reformatedEndTime,
      eventStatus: eventInfo.eventStatus,
      eventTags: eventInfo.eventTags,
      hosterId: eventInfo.hosterId,
      resultImage: [],
      resultContent: "",
      eventAddress: eventInfo.eventAddress,
    });
    setTags(
      tags.map((tag) =>
        eventInfo.eventTags.includes(tag.id)
          ? { ...tag, select: true }
          : { ...tag }
      )
    );
    setAddress({ ...address, city: addressCity(), address: addressText() });
  };

  useEffect(() => {
    getCurrentEventInfo();
  }, []);

  const getReformatedDate = (timestamp) => {
    const reformatYear = timestamp.getFullYear();
    const reformatMonth = () => {
      const month = timestamp.getMonth();
      if (month < 10) {
        return `0${month + 1}`;
      } else {
        return `${month + 1}`;
      }
    };
    const reformatDate = () => {
      const date = timestamp.getDate();
      if (date < 10) {
        return `0${date}`;
      } else {
        return `${date}`;
      }
    };
    return `${reformatYear}-${reformatMonth()}-${reformatDate()}`;
  };

  const getReformatedTime = (timestamp) => {
    const reformatHours = () => {
      const hours = timestamp.getHours();
      if (hours < 10) {
        return `0${hours}`;
      } else {
        return `${hours}`;
      }
    };
    const reformatMinutes = () => {
      const minutes = timestamp.getMinutes();
      if (minutes < 10) {
        return `0${minutes}`;
      } else {
        return `${minutes}`;
      }
    };
    return `${reformatHours()}:${reformatMinutes()}`;
  };

  const getGeopoint = (city, address) => {
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city},${address}&key=AIzaSyBSxAwCKVnvEIIRw8tk4y0KAjaUjn3Zn18`
    )
      .then((res) => res.json())
      .then((result) => {
        return result.results[0];
      });
  };

  let history = useHistory();

  const handleTitleChange = (e) => {
    setEvent({ ...event, eventTitle: e.target.value });
  };

  const handleContentChange = (e) => {
    setEvent({ ...event, eventContent: e.target.value });
  };

  const handleStartDateChange = (e) => {
    const start = event.startTime;
    start.date = e.target.value;
    setEvent({ ...event, startTime: start });
  };

  const handleStartTimeChange = (e) => {
    const start = event.startTime;
    start.time = e.target.value;
    setEvent({ ...event, startTime: start });
  };

  const handleEndDateChange = (e) => {
    const end = event.endTime;
    end.date = e.target.value;
    setEvent({ ...event, endTime: end });
  };

  const handleEndTimeChange = (e) => {
    const end = event.endTime;
    end.time = e.target.value;
    setEvent({ ...event, endTime: end });
  };

  const handleTagClick = (tag) => {
    let selectedId = tag.target.id;
    setTags(
      tags.map((tag) =>
        tag.id === selectedId && tag.select === false
          ? { ...tag, select: true }
          : tag.id === selectedId && tag.select === true
          ? { ...tag, select: false }
          : tag
      )
    );
  };

  useEffect(() => {
    console.log(address.city);
    console.log(event);
  }, [event]);

  const getSelectedTags = (tags) => {
    let selectedTags = [];
    tags.forEach((tag) => {
      tag.select === true ? selectedTags.push(tag.id) : console.log("none");
    });
    return selectedTags;
  };

  useEffect(() => {
    const selectedTags = getSelectedTags(tags);
    setEvent({ ...event, eventTags: selectedTags });
  }, [tags]);

  const handleCityChange = (e) => {
    setAddress({ ...address, city: e.target.value, address: "" });
    document.querySelector("#formEventAddress").value = "";
  };

  const handleLocationChange = (e) => {
    setAddress({ ...address, address: e.target.value });
  };

  // useEffect(() => {
  //   getGeopoint(event.eventAddress.city, event.eventAddress.location);
  // }, [event.eventAddress]);

  const handelClickSubmit = async () => {
    let updatedEventDetail = event;

    if (file) {
      const imageUrl = await getImageURL(file);
      console.log(imageUrl);
      updatedEventDetail.eventCoverImage = imageUrl;
    }

    updatedEventDetail.eventAddress = await getGeopoint(
      address.city,
      address.address
    );

    updatedEventDetail.startTime = new Date(
      event.startTime.date + " " + event.startTime.time
    );
    updatedEventDetail.endTime = new Date(
      event.endTime.date + " " + event.endTime.time
    );

    console.log(updatedEventDetail);

    await updateEvent(event.eventId, updatedEventDetail);

    alert("已更新志工活動資訊");
    history.goBack();
  };

  return (
    <Container className="container-xl">
      <Background></Background>
      <Mask></Mask>
      <CreateEventContainer>
        <Form className="p-4">
          <Form.Group>
            <Form.Label>活動名稱</Form.Label>
            <Form.Control
              type="input"
              id="ADD_TITLE"
              defaultValue={event.eventTitle}
              onChange={(e) => handleTitleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>活動內容</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="ADD_CONTENT"
              defaultValue={event.eventContent}
              onChange={(e) => handleContentChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label>開始日期</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={event.startTime.date}
                  onChange={(e) => handleStartDateChange(e)}
                />
              </Col>
              <Col>
                <Form.Label>時間</Form.Label>
                <Form.Control
                  type="time"
                  defaultValue={event.startTime.time}
                  onChange={(e) => handleStartTimeChange(e)}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label>結束日期</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={event.endTime.date}
                  onChange={(e) => handleEndDateChange(e)}
                />
              </Col>
              <Col>
                <Form.Label>時間</Form.Label>
                <Form.Control
                  type="time"
                  defaultValue={event.endTime.time}
                  onChange={(e) => handleEndTimeChange(e)}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="formEventCoverImage">
            <Form.Label>活動類型</Form.Label>
            <Tags>
              {tags.map((tag, index) =>
                tag.select === true ? (
                  <OptionSelected
                    id={tag.id}
                    key={index}
                    onClick={(e) => handleTagClick(e)}
                  >
                    {tag.name}
                  </OptionSelected>
                ) : (
                  <Option
                    id={tag.id}
                    key={index}
                    onClick={(e) => handleTagClick(e)}
                  >
                    {tag.name}
                  </Option>
                )
              )}
            </Tags>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="formEventCity">
                  <Form.Label>活動縣市</Form.Label>
                  <Form.Control
                    as="select"
                    defaultInputValue={address.city}
                    onChange={(e) => handleCityChange(e)}
                  >
                    {cityArray.map((city, cityId) => (
                      <option key={cityId}>{city}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={10} className="pl-0">
                <Form.Group className="pl-0" controlId="formEventAddress">
                  <Form.Label>地址</Form.Label>
                  <Form.Control
                    tyle="input"
                    defaultValue={address.address}
                    onChange={(e) => handleLocationChange(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Map
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBSxAwCKVnvEIIRw8tk4y0KAjaUjn3Zn18
    &q=${address.city}+${address.address}`}
            ></Map>
          </Form.Group>
          <Form.Group controlId="formEventCoverImage">
            <Form.Label>上傳活動封面</Form.Label>
            <Form>
              <Form.File id="formcheck-api-regular">
                <Form.File.Input onChange={(e) => setFile(e.target.files[0])} />
              </Form.File>
            </Form>
          </Form.Group>
          <Button type="button" onClick={handelClickSubmit}>
            儲存活動資訊
          </Button>
        </Form>
      </CreateEventContainer>
    </Container>
  );
}

export default EditEvent;
