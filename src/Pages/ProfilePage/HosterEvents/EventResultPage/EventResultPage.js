/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
  getEventInfo,
  getImageURL,
  updateEvent,
} from "../../../../utils/firebase.js";
import background from "../../../../images/background.jpg";
import { Form } from "react-bootstrap";

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
  padding: 30px 30px;
  background-color: white;
  border-radius: 8px;
  border: solid 1px #979797;
  @media (max-width: 720px) {
    width: 90%;
    padding: 20px 20px;
  }
`;

const Event = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const EventTitle = styled.div`
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 15px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;
  @media (max-width: 720px) {
    font-size: 18px;
  }
`;

const EventInfo = styled.div`
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 5px;
  color: rgba(0, 0, 0, 0.6);
  @media (max-width: 720px) {
    font-size: 12px;
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 25vw;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 150px;
  background-color: #0e6cd0;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  line-height: 1.5;
  padding: 5px 20px;
  margin-left: calc(50% - 75px);
  margin-top: 40px;
  margin-bottom: 20px;
  @media (max-width: 540px) {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
`;

function EventResult() {
  const { id } = useParams();
  const eventId = id;

  const [result, setResult] = useState("");
  // const [files, setFiles] = useState([]);

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

  const [eventInfo, setEventInfo] = useState({
    id: "",
    title: "",
    startTime: "",
    endTime: "",
    address: "",
    content: "",
    image: "",
  });

  const getEventDetail = async () => {
    const event = await getEventInfo(eventId);
    setEventInfo({
      ...eventInfo,
      id: event.eventId,
      title: event.eventTitle,
      startTime: reformatTimestamp(event.startTime),
      endTime: reformatTimestamp(event.endTime),
      address: event.eventAddress.formatted_address,
      content: event.eventContent,
      image: event.eventCoverImage,
    });
  };

  useEffect(() => {
    getEventDetail();
  }, []);

  let history = useHistory();

  const resultChanged = (input) => {
    setResult(input);
  };

  let fileArray;
  const fileChange = async (e) => {
    fileArray = e.target.files;
    // let imageArray = [];
    // for (let i = 0; i < e.target.files.length; i++) {
    //   let imageFile = e.target.files[i];
    //   const url = await getImageURL(imageFile);
    //   imageArray.push(url);
    // }
    // setFiles(imageArray);
  };

  const uploadImage = async (files) => {
    let imageArray = [];
    for (let i = 0; i < files.length; i++) {
      let imageFile = files[i];
      const url = await getImageURL(imageFile);
      imageArray.push(url);
    }
    // setFiles(imageArray);
    return imageArray;
  };

  useEffect(() => {}, []);

  const handelClickSubmit = async () => {
    // const eventData = await getEventInfo(eventId);
    // const imageUrl = await uploadImage(fileArray);
    // eventData.resultContent = result;
    // eventData.resultImage = imageUrl;
    // await updateEvent(eventId, eventData);
    // alert("已上傳活動成果");
    // history.goBack();
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const inputs = event.currentTarget;
    setValidated(true);

    if (inputs.checkValidity() === true) {
      const eventData = await getEventInfo(eventId);
      const imageUrl = await uploadImage(inputs.images.files);
      eventData.resultContent = inputs.result.value;
      eventData.resultImage = imageUrl;
      console.log(eventData);
      await updateEvent(eventId, eventData);
      alert("已上傳活動成果");
      history.push("/profile");
    }

    // console.log(inputs.result.value);
    // console.log(inputs.images.files);
  };

  return (
    <Container className="container-xl mb-5">
      <Background></Background>
      <Mask></Mask>
      <CreateEventContainer>
        <Event>
          <EventImage src={eventInfo.image}></EventImage>
          <EventTitle>{eventInfo.title}</EventTitle>
          <EventInfo>
            {`${eventInfo.startTime} - ${eventInfo.endTime}`}
          </EventInfo>
          <EventInfo>{eventInfo.address}</EventInfo>
        </Event>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="result">
            <Form.Label>活動成果說明</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              required
              className="mb-1"
              rows={3}
              onChange={(e) => resultChanged(e.target.value)}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              請填寫活動成果
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="images">
            <Form.Label>上傳活動圖片 (至少3張)</Form.Label>
            <Form.Control
              type="file"
              multiple="multiple"
              required
              onChange={(e) => fileChange(e)}
            ></Form.Control>
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              請選擇活動照片
            </Form.Control.Feedback>
            {/* <Form>
              <Form.File id="formcheck-api-regular">
                <Form.File.Input
                  multiple="multiple"
                  onChange={(e) => fileChange(e)}
                />
              </Form.File>
            </Form> */}
          </Form.Group>
          <Button type="submit">送出成果資料</Button>
        </Form>
      </CreateEventContainer>
    </Container>
  );
}

export default EventResult;
