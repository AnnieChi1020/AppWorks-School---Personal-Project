import styled from "styled-components";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faExclamationCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
// import { useHistory } from "react-router";

const AlertDiv = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  font-size: 24px;
  justify-content: center;
`;

const SuccessAlertDiv = styled(AlertDiv)`
  color: #57bc90;
`;

const ErrorAlertDiv = styled(AlertDiv)`
  color: #b02734;
`;

const WarningAlertDiv = styled(AlertDiv)`
  color: #9f7a0e;
`;

const SignOutAlertDiv = styled(AlertDiv)`
  color: #40a3cb;
`;

const AlertText = styled.div`
  width: 100px;
  flex-grow: 1;
  font-size: 16px;
  line-height: 24px;
`;

const SignUpAlertDiv = styled(AlertDiv)`
  color: #57bc90;
  flex-direction: column;
`;

const SignUpResult = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ViewSignUp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 140px;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #57bc90;
  border-radius: 20px;
  background-color: #57bc90;
  color: white;
  padding: 3px 10px;
`;

export const successAlertText = (text) => {
  return (
    <SuccessAlertDiv>
      <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
      <AlertText data-testid="alertText">{text}</AlertText>
    </SuccessAlertDiv>
  );
};

export const errorAlertText = (text) => {
  return (
    <ErrorAlertDiv>
      <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
      <AlertText>{text}</AlertText>
    </ErrorAlertDiv>
  );
};

export const warningAlertText = (text) => {
  return (
    <WarningAlertDiv>
      <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
      <AlertText>{text}</AlertText>
    </WarningAlertDiv>
  );
};

export const signOutAlertText = (text) => {
  return (
    <SignOutAlertDiv>
      <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
      <AlertText>{text}</AlertText>
    </SignOutAlertDiv>
  );
};

export const signUpAlertText = (text, handleBtnClick) => {
  return (
    <SignUpAlertDiv>
      <SignUpResult>
        <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
        <AlertText>{text}</AlertText>
      </SignUpResult>
      <ViewSignUp>
        <Button onClick={() => handleBtnClick()}>查看報名狀況</Button>
      </ViewSignUp>
    </SignUpAlertDiv>
  );
};
