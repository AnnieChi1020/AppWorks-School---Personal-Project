/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import background from "../../images/background.jpg";
import { Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import {
  createNewDoc,
  postEventInfo,
  getImageURL,
} from "../../utils/firebase.js";

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
  width: 120px;
  background-color: #0e6cd0;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  line-height: 1.5;
  padding: 5px 20px;
  margin-left: calc(50% - 60px);
  margin-top: 40px;
  margin-bottom: 20px;
`;

function CreateEvent() {
  const dispatch = useDispatch();
  const hosterId = useSelector((state) => state.isLogged.userId);
  // const createEventData = useSelector((state) => state.createEvent);

  // const [file, setFile] = useState(null);

  const getCurrentDate = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = () => {
      const month = new Date().getMonth();
      if (month < 10) {
        return `0${month + 1}`;
      } else {
        return `${month + 1}`;
      }
    };
    const currentDate = () => {
      const date = new Date().getDate();
      if (date < 10) {
        return `0${date}`;
      } else {
        return `${date}`;
      }
    };
    return `${currentYear}-${currentMonth()}-${currentDate()}`;
  };

  const getCurrentTime = () => {
    const currentHours = () => {
      const hours = new Date().getHours();
      if (hours < 10) {
        return `0${hours}`;
      } else {
        return `${hours}`;
      }
    };
    const currentMinutes = () => {
      const minutes = new Date().getMinutes();
      if (minutes < 10) {
        return `0${minutes}`;
      } else {
        return `${minutes}`;
      }
    };
    return `${currentHours()}:${currentMinutes()}`;
  };

  // const [startTime, setStartTime] = useState({
  //   date: getCurrentDate(),
  //   time: getCurrentTime(),
  // });
  // const [endTime, setEndTime] = useState({
  //   date: getCurrentDate(),
  //   time: getCurrentTime(),
  // });

  // const [address, setAddress] = useState("{
  //   city: "台北市",
  //   location: "",
  // }");

  const [address, setAddress] = useState("台灣");

  const [tags, setTags] = useState([
    { name: "社會福利", id: "社會福利", select: false },
    { name: "文化教育", id: "文化教育", select: false },
    { name: "環境保護", id: "環境保護", select: false },
    { name: "生態保護", id: "生態保護", select: false },
  ]);

  // const cityArray = [
  //   "台北市",
  //   "新北市",
  //   "桃園市",
  //   "新竹市",
  //   "新竹縣",
  //   "苗栗縣",
  //   "台中市",
  //   "彰化縣",
  //   "雲林縣",
  //   "嘉義縣",
  //   "台南市",
  //   "高雄市",
  //   "屏東縣",
  //   "宜蘭縣",
  //   "花蓮縣",
  //   "台東縣",
  // ];

  const getGeopoint = async (address) => {
    let location;
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBSxAwCKVnvEIIRw8tk4y0KAjaUjn3Zn18`
    )
      .then((res) => res.json())
      .then((result) => {
        location = result.results[0];
      });
    return location;
  };

  let history = useHistory();

  // const handleStartTimeChange = (e) => {
  //   setStartTime({ ...startTime, [e.target.type]: e.target.value });
  // };

  // useEffect(() => {
  //   const newStartTime = new Date(startTime.date + " " + startTime.time);
  //   dispatch({ type: "ADD_STARTTIME", data: newStartTime });
  // }, [startTime]);

  // const handleEndTimeChange = (e) => {
  //   setEndTime({ ...endTime, [e.target.type]: e.target.value });
  // };

  // useEffect(() => {
  //   const newEndTime = new Date(endTime.date + " " + endTime.time);
  //   dispatch({ type: "ADD_ENDTIME", data: newEndTime });
  // }, [endTime]);

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

  const getSelectedTags = (tags) => {
    let selectedTags = [];
    tags.forEach((tag) => {
      if (tag.select === true) {
        selectedTags.push(tag.name);
      }
    });
    return selectedTags;
  };

  useEffect(() => {
    const selectedTags = getSelectedTags(tags);
    dispatch({ type: "ADD_TAGS", data: selectedTags });
  }, [tags]);

  // const handleInputChange = (e) => {
  //   dispatch({ type: `${e.target.id}`, data: e.target.value });
  // };

  // const handleCityChange = (e) => {
  //   const city = e.target.value;
  //   setAddress({ ...address, city: city });
  // };

  // const handleLocationChange = (e) => {
  //   const location = e.target.value;
  //   setAddress({ ...address, location: location });
  // };

  const handleAddressChange = (e) => {
    const address = e.target.value;
    setAddress(address);
  };

  useEffect(() => {
    console.log(getGeopoint(address));
  }, [address]);

  // async function handelClickSubmit() {
  //   const imageUrl = await getImageURL(file);
  //   const newEventRef = createNewDoc();
  //   await dispatch({ type: "ADD_HOSTERID", data: hosterId });
  //   await dispatch({ type: "ADD_ID", data: newEventRef.id });
  //   await dispatch({ type: "ADD_COVERIMAGE", data: imageUrl });

  //   const eventDetail = createEventData;
  //   eventDetail.hosterId = hosterId;
  //   eventDetail.eventId = newEventRef.id;
  //   eventDetail.eventCoverImage = imageUrl;
  //   await postEventInfo(newEventRef, eventDetail);
  //   alert("已創建志工活動");
  //   history.push("/events");
  // }

  const constructEventData = async (inputs) => {
    const imageUrl = await getImageURL(inputs.coverImage.files[0]);
    const geopoint = await getGeopoint(address);
    console.log(geopoint);
    const newEventRef = createNewDoc();
    console.log(imageUrl);
    const eventData = {
      eventId: newEventRef.id,
      eventTitle: inputs.title.value,
      eventContent: inputs.content.value,
      eventAddress: geopoint,
      eventCoverImage: imageUrl,
      startTime: new Date(
        inputs.startTime[0].value + " " + inputs.startTime[1].value
      ),
      endTime: new Date(
        inputs.endTime[0].value + " " + inputs.endTime[1].value
      ),
      eventStatus: 0,
      eventTags: getSelectedTags(tags),
      hosterId: hosterId,
      resultImage: [],
      resultContent: "",
    };
    return { id: newEventRef, data: eventData };
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const inputs = event.currentTarget;
    setValidated(true);

    if (inputs.checkValidity() === true) {
      const eventData = await constructEventData(inputs);
      console.log(eventData);
      await postEventInfo(eventData.id, eventData.data);
      alert("已創建志工活動");
      history.push("/events");
    }
  };

  return (
    <Container className="container-xl">
      <Background />
      <Mask />
      <CreateEventContainer>
        <Form
          className="px-0 py-3 p-md-4"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="title">
            <Form.Label>活動名稱</Form.Label>
            <Form.Control type="text" required className="mb-1" />
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              請輸入活動名稱
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>活動內容</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              rows={3}
              required
              className="mb-1"
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              請輸入活動內容
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="startTime">
            <Row>
              <Col>
                <Form.Label>開始日期</Form.Label>
                <Form.Control
                  type="date"
                  required
                  defaultValue={getCurrentDate()}
                  className="mb-1"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ position: "inherit" }}
                >
                  請提供開始日期
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Label>時間</Form.Label>
                <Form.Control
                  type="time"
                  required
                  defaultValue={getCurrentTime()}
                  className="mb-1"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ position: "inherit" }}
                >
                  請提供開始時間
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="endTime">
            <Row>
              <Col>
                <Form.Label>結束日期</Form.Label>
                <Form.Control
                  type="date"
                  required
                  defaultValue={getCurrentDate()}
                  className="mb-1"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ position: "inherit" }}
                >
                  請提供結束日期
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Label>時間</Form.Label>
                <Form.Control
                  type="time"
                  required
                  defaultValue={getCurrentTime()}
                  className="mb-1"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ position: "inherit" }}
                >
                  請提供結束時間
                </Form.Control.Feedback>
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
            {/* <Row>
              <Col className="col-12 col-sm-3 pr-sm-0">
                <Form.Group controlId="formEventCity">
                  <Form.Label>活動縣市</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="選擇所在縣市"
                    onChange={(e) => handleCityChange(e)}
                  >
                    {cityArray.map((city, cityId) => (
                      <option key={cityId}>{city}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col className="col-12 col-sm-9 ">
                <Form.Group className="pl-0" controlId="formEventAddress"> */}
            <Form.Label>地址</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => handleAddressChange(e)}
              className="mb-1"
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              請提供活動地址
            </Form.Control.Feedback>
            {/* </Form.Group>
              </Col>
            </Row> */}
          </Form.Group>
          <Form.Group>
            <Map
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBSxAwCKVnvEIIRw8tk4y0KAjaUjn3Zn18
    &q=${address}`}
            ></Map>
          </Form.Group>
          <Form.Group controlId="coverImage">
            <Form.Label>上傳活動封面</Form.Label>
            <Form.Control type="file" required className="mb-1" />
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              請選擇封面圖片
            </Form.Control.Feedback>
            <Form></Form>
          </Form.Group>
          <Button type="submit">創建活動</Button>
        </Form>
      </CreateEventContainer>
    </Container>
  );
}

export default CreateEvent;
