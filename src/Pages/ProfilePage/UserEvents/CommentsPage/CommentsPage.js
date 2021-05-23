import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import { useHistory } from "react-router-dom";
import background from "../../../../images/background.jpg";
import {
  getEventInfo,
  getCurrentStatus,
  updateNewStatus,
} from "../../../../utils/firebase.js";
import { Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

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

const CommentContainer = styled.div`
  width: 80%;
  display: flex;
  margin: 0 auto;
  margin-top: 120px;
  margin-bottom: 100px;
  flex-direction: column;
  padding: 20px 30px;
  background-color: white;
  border-radius: 8px;
  border: solid 1px #979797;
`;

const Event = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const EventInfo = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  font-size: 14px;
  line-height: 24px;
  padding: 5px 20px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  background-color: #1190cb;
  color: white;
`;

function Comments() {
  const { id } = useParams();

  const participantId = useSelector((state) => state.isLogged.userId);

  const eventId = id;
  let rating;
  let comment;

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
  });

  const getEventDetail = async () => {
    const event = await getEventInfo(eventId);
    console.log(event);
    setEventInfo({
      ...eventInfo,
      id: event.eventId,
      title: event.eventTitle,
      startTime: reformatTimestamp(event.startTime),
      endTime: reformatTimestamp(event.endTime),
      address: event.eventAddress.formatted_address,
      content: event.eventContent,
    });
  };

  useEffect(() => {
    getEventDetail();
  }, []);

  useEffect(() => {
    console.log(eventInfo);
  }, [eventInfo]);

  const ratingChanged = (newRating) => {
    rating = newRating;
    return rating;
  };

  const commentChanged = (newComment) => {
    comment = newComment;
    return comment;
  };

  let history = useHistory();
  const handelClickSubmit = async () => {
    const currentStatus = await getCurrentStatus(eventInfo.id, participantId);
    currentStatus.participantInfo.participantComment = comment;
    currentStatus.participantInfo.participantRating = rating;
    console.log(currentStatus);
    await updateNewStatus(eventInfo.id, participantId, currentStatus);
    alert("已送出評價");
    history.goBack();
  };

  return (
    <Container className="container-xl">
      <Background></Background>
      <Mask></Mask>
      <CommentContainer>
        <Event>
          <EventInfo>活動名稱 | {eventInfo.title}</EventInfo>
          <EventInfo>
            活動時間 | {`${eventInfo.startTime} - ${eventInfo.endTime}`}
          </EventInfo>
          <EventInfo>活動地點 | {eventInfo.address}</EventInfo>
        </Event>

        <Form>
          <Form.Group>
            <Form.Label>活動評分</Form.Label>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              height={"20px"}
              activeColor="#ffd700"
              style={{ lineHeight: "1.5" }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>活動評價</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => commentChanged(e.target.value)}
            />
          </Form.Group>
        </Form>
        <SubmitButton onClick={handelClickSubmit}>送出評價</SubmitButton>
      </CommentContainer>
    </Container>
  );
}

export default Comments;