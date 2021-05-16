import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import { useHistory } from "react-router-dom";
import {
  getEventInfo,
  getCurrentStatus,
  updateNewStatus,
} from "../../../../utils/firebase.js";

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  margin: 0 auto;
  margin-top: 20px;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 8px;
  border: solid 1px #979797;
`;

const Event = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const EventInfo = styled.div`
  font-size: 14px;
  line-height: 24px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FieldName = styled.label`
  width: 80px;
  line-height: 24px;
  font-size: 14px;
  color: #3f3a3a;
  margin-right: 30px;
`;

const FieldInput = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
`;

const TextInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 8px;
  border: solid 1px #979797;
  padding: 0 4px;
`;

const SubmitButton = styled.button`
  width: 80px;
  height: 30px;
  margin-top: 20px;
`;

function Comments() {
  const { id } = useParams();

  const participantId = "RQwkmO7Byk5YsOGfvp8D";
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
      address: event.eventAddress,
      content: event.eventContent,
    });
  };

  useEffect(() => {
    getEventDetail();
  }, []);

  useEffect(() => {
    console.log(eventInfo);
  }, [eventInfo]);

  const [signUpInput, setSignUpInput] = useState({
    eventId: eventId,
    participantId: participantId,
    participantName: "",
    participantPhone: "",
    participantEmail: "",
    participantStatus: 0,
    participantAttended: false,
    participantComment: "",
  });

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
    updateNewStatus(eventInfo.id, participantId, currentStatus);
    alert("已送出評價");
    history.goBack();
  };

  return (
    <Wrapper>
      <Event>
        <EventInfo>活動名稱 | {eventInfo.title}</EventInfo>
        <EventInfo>
          活動時間 | {`${eventInfo.startTime} - ${eventInfo.endTime}`}
        </EventInfo>
        <EventInfo>活動地點 | {eventInfo.address}</EventInfo>
      </Event>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        activeColor="#ffd700"
      />
      <Field>
        <FieldName>活動評價</FieldName>
        <FieldInput>
          <TextInput
            onChange={(e) => commentChanged(e.target.value)}
          ></TextInput>
        </FieldInput>
      </Field>
      <SubmitButton onClick={handelClickSubmit}>送出評價</SubmitButton>
    </Wrapper>
  );
}

export default Comments;
