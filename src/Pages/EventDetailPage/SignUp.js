import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { postParticipantInfo } from "../../utils/firebase.js";

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

function EventSignUp() {
  const { id } = useParams();

  const participantId = "RQwkmO7Byk5YsOGfvp8D";
  const eventId = id;

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

  const handelClickSubmit = () => {
    console.log(signUpInput);
    postParticipantInfo(eventId, participantId, signUpInput);
  };

  return (
    <Wrapper>
      <Field>
        <FieldName>參加者姓名</FieldName>
        <FieldInput>
          <TextInput
            onChange={(e) =>
              setSignUpInput({
                ...signUpInput,
                participantName: e.target.value,
              })
            }
          ></TextInput>
        </FieldInput>
      </Field>
      <Field>
        <FieldName>連絡電話</FieldName>
        <FieldInput>
          <TextInput
            onChange={(e) =>
              setSignUpInput({
                ...signUpInput,
                participantPhone: e.target.value,
              })
            }
          ></TextInput>
        </FieldInput>
      </Field>
      <Field>
        <FieldName>Email</FieldName>
        <FieldInput>
          <TextInput
            onChange={(e) =>
              setSignUpInput({
                ...signUpInput,
                participantEmail: e.target.value,
              })
            }
          ></TextInput>
        </FieldInput>
      </Field>
      <SubmitButton onClick={handelClickSubmit}>送出報名</SubmitButton>
    </Wrapper>
  );
}

export default EventSignUp;
