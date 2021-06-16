/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getEventInfo,
  getImageURL,
  updateEvent,
} from "../../../../utils/firebase.js";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import {
  successAlertText,
  errorAlertText,
} from "../../../../components/Alert.js";

const CreateEventContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  padding: 0 10px;
  background-color: white;
  border-radius: 8px;
  @media (max-width: 720px) {
    width: 100%;
    padding: 0 10px;
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
  height: 150px;
  max-height: 250px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 20px 0;
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
  @media (max-width: 540px) {
    width: 100%;
  }
`;

const Styles = styled.div`
  .invalid-feedback {
    margin-top: 5px;
  }
  .form-label {
    @media (max-width: 720px) {
      font-size: 14px;
    }
  }
  .form-control-file {
    @media (max-width: 720px) {
      font-size: 14px;
    }
  }
  .form-control {
    @media (max-width: 720px) {
      font-size: 14px;
    }
  }
`;

function EventResult() {
  // const { id } = useParams();
  // const eventId = id;

  const dispatch = useDispatch();

  const eventId = useSelector((state) => state.modal.eventId);
  const hosterId = useSelector((state) => state.isLogged.userId);

  const [resultIsInvalid, setResultIsInvalid] = useState(false);
  const [filesIsInvalid, setFilesIsInvalid] = useState(false);

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

  const uploadImage = async (files) => {
    let imageArray = [];
    for (let i = 0; i < files.length; i++) {
      let imageFile = files[i];
      const url = await getImageURL(hosterId, imageFile);
      imageArray.push(url);
    }
    // setFiles(imageArray);
    return imageArray;
  };

  // const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const inputs = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (!inputs.result.value) {
      setResultIsInvalid(true);
    } else {
      setResultIsInvalid(false);
    }

    if (inputs.images.files.length < 3) {
      setFilesIsInvalid(true);
    } else {
      setFilesIsInvalid(false);
    }

    if (inputs.result.value && inputs.images.files.length > 2) {
      const eventData = await getEventInfo(eventId);
      const imageUrl = await uploadImage(inputs.images.files);
      eventData.resultContent = inputs.result.value;
      eventData.resultImage = imageUrl;
      await updateEvent(eventId, eventData);
      toast.success(successAlertText("已上傳活動成果"), {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch({ type: "SHOW_RESULT", data: false });
      dispatch({ type: "SET_RESULTCOMPLETED", data: true });
    } else {
      toast.error(errorAlertText("請提供完整資訊"), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <Styles>
      <CreateEventContainer>
        <Event>
          <EventImage src={eventInfo.image}></EventImage>
          <EventTitle>{eventInfo.title}</EventTitle>
          <EventInfo>{`${eventInfo.startTime} - ${eventInfo.endTime}`}</EventInfo>
          <EventInfo>{eventInfo.address}</EventInfo>
        </Event>
        <Form
          noValidate
          // validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="result">
            <Form.Label>活動成果說明</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              required
              className="mb-1"
              rows={3}
              isInvalid={resultIsInvalid}
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
              isInvalid={filesIsInvalid}
            
            ></Form.Control>
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              請選擇至少3張活動照片
            </Form.Control.Feedback>
          </Form.Group>
          <ButtonContainer>
            <Button type="submit">送出成果資料</Button>
          </ButtonContainer>
        </Form>
      </CreateEventContainer>
    </Styles>
  );
}

export default EventResult;
