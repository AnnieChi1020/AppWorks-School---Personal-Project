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
import { reformatDateAndTime } from "../../../../utils/time.js";
import {
  validateInput,
  validateUploadImages,
} from "../../../../utils/validation.js";

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

const StyledFormControlFeedback = styled(Form.Control.Feedback)`
  position: inherit !important;
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

const DisabledButton = styled(Button)`
  cursor: inherit;
  opacity: 0.6;
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
  const dispatch = useDispatch();

  const eventId = useSelector((state) => state.modal.eventId);
  const hosterId = useSelector((state) => state.isLogged.userId);

  const [resultIsInvalid, setResultIsInvalid] = useState(false);
  const [filesIsInvalid, setFilesIsInvalid] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      startTime: reformatDateAndTime(event.startTime),
      endTime: reformatDateAndTime(event.endTime),
      address: event.eventAddress.formatted_address,
      content: event.eventContent,
      image: event.eventCoverImage,
    });
  };

  useEffect(() => {
    getEventDetail();
    // eslint-disable-next-line
  }, []);

  const uploadImage = async (files) => {
    let imageArray = [];
    for (let i = 0; i < files.length; i++) {
      let imageFile = files[i];
      const url = await getImageURL(hosterId, imageFile);
      imageArray.push(url);
    }
    return imageArray;
  };

  const uploadEventResult = async (inputs) => {
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
  };

  const handleSubmit = async (event) => {
    const inputs = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    const resultIsValid = validateInput(
      inputs.result.value,
      setResultIsInvalid
    );
    const imagesIsValid = validateUploadImages(
      inputs.images.files,
      setFilesIsInvalid
    );

    if (resultIsValid && imagesIsValid) {
      setSubmitted(true);
      await uploadEventResult(inputs);
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
          <EventImage src={eventInfo.image} alt="eventCoverImage"></EventImage>
          <EventTitle>{eventInfo.title}</EventTitle>
          <EventInfo>{`${eventInfo.startTime} - ${eventInfo.endTime}`}</EventInfo>
          <EventInfo>{eventInfo.address}</EventInfo>
        </Event>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="result">
            <Form.Label>活動成果說明</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              required
              rows={3}
              isInvalid={resultIsInvalid}
              className="mb-1"
            />
            <StyledFormControlFeedback type="invalid">
              請填寫活動成果
            </StyledFormControlFeedback>
          </Form.Group>
          <Form.Group controlId="images">
            <Form.Label>上傳活動圖片 (至少3張)</Form.Label>
            <Form.Control
              type="file"
              multiple="multiple"
              required
              isInvalid={filesIsInvalid}
            ></Form.Control>
            <StyledFormControlFeedback type="invalid">
              請選擇至少3張活動照片
            </StyledFormControlFeedback>
          </Form.Group>
          <ButtonContainer>
            {submitted ? (
              <DisabledButton disabled>送出成果資料</DisabledButton>
            ) : (
              <Button type="submit">送出成果資料</Button>
            )}
          </ButtonContainer>
        </Form>
      </CreateEventContainer>
    </Styles>
  );
}

export default EventResult;
