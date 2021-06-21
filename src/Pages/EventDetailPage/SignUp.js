import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { postParticipantInfo } from "../../utils/firebase.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Form, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { errorAlertText, signUpAlertText } from "../../components/Alert.js";
import {
  validateInput,
  validateEmail,
  validatePhoneNum,
} from "../../utils/validation.js";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
`;

const StyledFormControlFeedback = styled(Form.Control.Feedback)`
  position: inherit !important;
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const Button = styled.button`
  width: 150px;
  background-color: #0e6cd0;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  padding: 5px 10px;
  margin: 0 auto;
  margin-top: 50px;

  @media (max-width: 540px) {
    width: 90%;
  }
`;

const Styles = styled.div``;

function EventSignUp() {
  const { id } = useParams();
  const eventId = id;
  const userId = useSelector((state) => state.isLogged.userId);

  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [nameIsInvalid, setNameIsInvalid] = useState(false);
  const [phoneIsInvalid, setPhoneIsInvalid] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "ADD_USERID", data: userId });
    dispatch({ type: "ADD_EVENTID", data: eventId });
    // eslint-disable-next-line
  }, []);

  const redirectToProfile = () => {
    history.push("/profile");
  };

  const postParticipantDetail = async (signupData) => {
    await postParticipantInfo(eventId, userId, signupData);
    toast.success(signUpAlertText("已送出報名資訊", redirectToProfile), {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const inputs = event.currentTarget;

    const nameIsValid = validateInput(inputs.name.value, setNameIsInvalid);
    const emailIsValid = validateEmail(inputs.email.value, setEmailIsInvalid);
    const phoneIsValid = validatePhoneNum(
      inputs.phone.value,
      setPhoneIsInvalid
    );

    if (nameIsValid && emailIsValid && phoneIsValid) {
      const signupData = {
        eventId: eventId,
        participantId: userId,
        participantName: inputs.name.value,
        participantPhone: inputs.phone.value,
        participantEmail: inputs.email.value,
        participantStatus: 0,
        participantAttended: false,
        participantComment: "",
        participantRating: 0,
      };
      await postParticipantDetail(signupData);
      dispatch({ type: "SIGNUP", data: false });
    } else {
      toast.error(errorAlertText("請確認報名資訊"), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <Wrapper>
      <Styles>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="name">
            <Form.Label>參加者姓名</Form.Label>
            <Form.Control required type="text" isInvalid={nameIsInvalid} />
            <StyledFormControlFeedback type="invalid">
              請輸入參加者姓名
            </StyledFormControlFeedback>
          </Form.Group>
          <Form.Group as={Col} controlId="phone">
            <Form.Label>連絡電話</Form.Label>
            <Form.Control required type="text" isInvalid={phoneIsInvalid} />
            <StyledFormControlFeedback type="invalid">
              請輸入正確的連絡電話
            </StyledFormControlFeedback>
          </Form.Group>
          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" isInvalid={emailIsInvalid} />
            <StyledFormControlFeedback type="invalid">
              請輸入正確的email
            </StyledFormControlFeedback>
          </Form.Group>
          <ButtonContainer>
            <Button type="submit">送出報名資料</Button>
          </ButtonContainer>
        </Form>
      </Styles>
    </Wrapper>
  );
}

export default EventSignUp;
