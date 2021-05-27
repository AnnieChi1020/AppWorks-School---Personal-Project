/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// import { postParticipantInfo } from "../../utils/firebase.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
`;

const Field = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const FieldName = styled.label`
  width: 80px;
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
  margin-right: 30px;
`;

const FieldInput = styled.div`
  width: calc(100% - 110px);
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

function EventSignUp() {
  const { id } = useParams();
  const eventId = id;
  const userId = useSelector((state) => state.isLogged.userId);

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

  const handleNameChange = (e) => {
    dispatch({ type: "ADD_NAME", data: e });
  };

  const handlePhoneChange = (e) => {
    dispatch({ type: "ADD_PHONE", data: e });
  };

  const handleEmailChange = (e) => {
    dispatch({ type: "ADD_EMAIL", data: e });
  };

  useEffect(() => {
    dispatch({ type: "ADD_USERID", data: userId });
    dispatch({ type: "ADD_EVENTID", data: eventId });
  }, []);

  // const handelClickSubmit = async () => {
  //   console.log(signUpInput);
  //   await postParticipantInfo(eventId, participantId, signUpInput);
  //   alert("已送出報名資訊");
  //   const inputs = document.querySelectorAll("input");
  //   inputs.forEach((e) => (e.value = ""));
  // };

  return (
    <Wrapper>
      <Field>
        <FieldName>參加者姓名</FieldName>
        <FieldInput>
          <TextInput
            onChange={(e) => handleNameChange(e.target.value)}
          ></TextInput>
        </FieldInput>
      </Field>
      <Field>
        <FieldName>連絡電話</FieldName>
        <FieldInput>
          <TextInput
            onChange={(e) => handlePhoneChange(e.target.value)}
          ></TextInput>
        </FieldInput>
      </Field>
      <Field>
        <FieldName>Email</FieldName>
        <FieldInput>
          <TextInput
            onChange={(e) => handleEmailChange(e.target.value)}
          ></TextInput>
        </FieldInput>
      </Field>
    </Wrapper>
  );
}

export default EventSignUp;
