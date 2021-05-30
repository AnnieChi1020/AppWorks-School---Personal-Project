/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { postParticipantInfo } from "../../utils/firebase.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Form, Col } from "react-bootstrap";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
`;

// const Field = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   margin-top: 20px;
// `;

// const FieldName = styled.label`
//   width: 80px;
//   line-height: 19px;
//   font-size: 16px;
//   color: #3f3a3a;
//   margin-right: 30px;
// `;

// const FieldInput = styled.div`
//   width: calc(100% - 110px);
//   display: flex;
//   align-items: center;
// `;

// const TextInput = styled.input`
//   width: 100%;
//   height: 30px;
//   border-radius: 8px;
//   border: solid 1px #979797;
//   padding: 0 4px;
// `;

// const SubmitButton = styled.button`
//   width: 120px;
//   background-color: #0e6cd0;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   font-size: 16px;
//   padding: 5px 10px;
//   margin: 0 auto;
//   margin-top: 30px;
// `;

const Button = styled.button`
  width: 150px;
  background-color: #0e6cd0;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  padding: 5px 10px;
  margin: 0 auto;
  margin-top: 20px;

  @media (max-width: 540px) {
    /* font-size: 14px; */
    /* line-height: 20px; */
    width: 90%;
  }
`;

function EventSignUp() {
  const { id } = useParams();
  const eventId = id;
  const userId = useSelector((state) => state.isLogged.userId);
  // const signupData = useSelector((state) => state.signup);

  const dispatch = useDispatch();

  // const participantId = "9xRjcIJWdYWT4zIKs1oG";
  // const eventId = id;

  // const [signUpInput, setSignUpInput] = useState({
  //   eventId: eventId,
  //   participantId: participantId,
  //   participantName: "",
  //   participantPhone: "",
  //   participantEmail: "",
  //   participantStatus: 0,
  //   participantAttended: false,
  //   participantComment: "",
  //   participantRating: 0,
  // });

  // const handleNameChange = (e) => {
  //   dispatch({ type: "ADD_NAME", data: e });
  // };

  // const handlePhoneChange = (e) => {
  //   dispatch({ type: "ADD_PHONE", data: e });
  // };

  // const handleEmailChange = (e) => {
  //   dispatch({ type: "ADD_EMAIL", data: e });
  // };

  useEffect(() => {
    dispatch({ type: "ADD_USERID", data: userId });
    dispatch({ type: "ADD_EVENTID", data: eventId });
  }, []);

  const postParticipantDetail = async (signupData) => {
    await postParticipantInfo(eventId, userId, signupData);
    alert("已送出報名資訊");
    // const inputs = document.querySelectorAll("input");
    // inputs.forEach((e) => (e.value = ""));
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const inputs = event.currentTarget;
    console.log(inputs);
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (inputs.checkValidity() === true) {
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
    }
  };

  return (
    <Wrapper>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Col} controlId="name">
          <Form.Label>參加者姓名</Form.Label>
          <Form.Control required type="text" className="mb-0" />
          <Form.Control.Feedback type="invalid" style={{ position: "inherit" }}>
            請輸入參加者姓名
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="phone">
          <Form.Label>連絡電話</Form.Label>
          <Form.Control required type="number" className="mb-0" />
          <Form.Control.Feedback type="invalid" style={{ position: "inherit" }}>
            請輸入連絡電話
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" className="mb-0" />
          <Form.Control.Feedback type="invalid" style={{ position: "inherit" }}>
            請輸入正確的eamil
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          type="submit"
          style={{ margin: "0 auto", display: "block", marginTop: "50px" }}
        >
          送出報名資料
        </Button>
      </Form>
    </Wrapper>
  );
}

export default EventSignUp;
