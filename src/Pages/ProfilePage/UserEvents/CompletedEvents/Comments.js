import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import {
  getEventInfo,
  getParticipantInfo,
  updateParticipantStatus,
} from "../../../../utils/firebase.js";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  successAlertText,
  errorAlertText,
} from "../../../../components/Alert.js";
import { reformatDateAndTime } from "../../../../utils/time.js";

const CommentContainer = styled.div`
  width: 100%;
`;

const Event = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

const EventTitle = styled.div`
  font-size: 20px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 15px;
  @media (max-width: 760px) {
    font-size: 16px;
    line-height: 20px;
  }
`;

const EventInfo = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.6);
  @media (max-width: 760px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

const FormLabel = styled.div`
  margin-bottom: 0.5rem;
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const SubmitButton = styled.button`
  font-size: 14px;
  line-height: 24px;
  padding: 5px 20px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 10px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  background-color: #1190cb;
  color: white;
`;

const DisabledButton = styled(SubmitButton)`
  opacity: 0.6;
  cursor: inherit;
`;

function Comments() {
  const dispatch = useDispatch();

  const participantId = useSelector((state) => state.isLogged.userId);
  const eventId = useSelector((state) => state.modal.eventId);

  const [submmited, setSubmmited] = useState(false);

  let rating = 0;
  let comment = "";

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
    setEventInfo({
      ...eventInfo,
      id: event.eventId,
      title: event.eventTitle,
      startTime: reformatDateAndTime(event.startTime),
      endTime: reformatDateAndTime(event.endTime),
      address: event.eventAddress.formatted_address,
      content: event.eventContent,
    });
  };

  useEffect(() => {
    getEventDetail();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {}, [eventInfo]);

  const ratingChanged = (newRating) => {
    rating = newRating;
    return rating;
  };

  const commentChanged = (newComment) => {
    comment = newComment;
    return comment;
  };

  const handelClickSubmit = async () => {
    if (rating === 0) {
      toast.error(errorAlertText("請填寫活動評分"), {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (!comment) {
      toast.error(errorAlertText("請填寫活動評價"), {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setSubmmited(true);
      const currentStatus = await getParticipantInfo(
        eventInfo.id,
        participantId
      );
      currentStatus.participantInfo.participantComment = comment;
      currentStatus.participantInfo.participantRating = rating;
      await updateParticipantStatus(eventInfo.id, participantId, currentStatus);
      dispatch({ type: "SET_FEEDBACKCOMPLETED", data: true });
      toast.success(successAlertText("已送出評價"), {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch({ type: "SHOW_FEEDBACK", data: false });
    }
  };

  return (
    <CommentContainer>
      <Event>
        <EventTitle>{eventInfo.title}</EventTitle>
        <EventInfo>{`${eventInfo.startTime} - ${eventInfo.endTime}`}</EventInfo>
        <EventInfo>{eventInfo.address}</EventInfo>
      </Event>
      <Form>
        <Form.Group>
          <FormLabel className="mb-0">活動評分 (必填)</FormLabel>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            height={"20px"}
            activeColor="#ffd700"
          />
        </Form.Group>
        <Form.Group>
          <FormLabel>活動評價</FormLabel>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => commentChanged(e.target.value)}
          />
        </Form.Group>
      </Form>
      <ButtonContainer>
        {submmited ? (
          <DisabledButton disabled>儲存活動</DisabledButton>
        ) : (
          <SubmitButton onClick={handelClickSubmit}>送出評價</SubmitButton>
        )}
      </ButtonContainer>
    </CommentContainer>
  );
}

export default Comments;
