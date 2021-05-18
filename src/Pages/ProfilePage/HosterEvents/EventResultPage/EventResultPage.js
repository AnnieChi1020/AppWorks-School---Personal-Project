import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// import { useHistory } from "react-router-dom";
import {
  getEventInfo,
  getImageURL,
  updateEvent,
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
  margin-bottom: 10px;
`;

const FieldName = styled.label`
  width: 150px;
  line-height: 24px;
  font-size: 14px;
  color: #3f3a3a;
  margin-right: 10px;
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
  width: 130px;
  height: 30px;
  margin-top: 20px;
`;

function EventResult() {
  const { id } = useParams();
  const eventId = id;

  const [result, setResult] = useState("");
  const [files, setFiles] = useState([]);

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

  // let history = useHistory();

  const resultChanged = (input) => {
    setResult(input);
  };

  const fileChange = async (e) => {
    let imageArray = [];
    for (let i = 0; i < e.target.files.length; i++) {
      let imageFile = e.target.files[i];
      const url = await getImageURL(imageFile);
      imageArray.push(url);
      console.log(url);
    }
    console.log(imageArray);
    setFiles(imageArray);
  };

  useEffect(() => {
    console.log(files);
  }, []);

  const handelClickSubmit = async () => {
    const eventData = await getEventInfo(eventId);
    console.log(eventData);
    eventData.resultContent = result;
    eventData.resultImage = files;
    console.log(eventData);
    updateEvent(eventId, eventData);
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

      <Field>
        <FieldName>活動成果說明</FieldName>
        <FieldInput>
          <TextInput
            onChange={(e) => resultChanged(e.target.value)}
          ></TextInput>
        </FieldInput>
      </Field>
      <Field>
        <FieldName>活動圖片(可上傳多張)</FieldName>
        <input
          type="file"
          multiple="multiple"
          onChange={(e) => fileChange(e)}
        />
      </Field>
      <SubmitButton onClick={handelClickSubmit}>送出成果資料</SubmitButton>
    </Wrapper>
  );
}

export default EventResult;
