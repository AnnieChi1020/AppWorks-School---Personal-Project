import styled from "styled-components";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faExclamationCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const SuccessAlertDiv = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  font-size: 24px;
  color: #57bc90;
  justify-content: center;
`;

const ErrorAlertDiv = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  font-size: 24px;
  color: #b02734;
  justify-content: center;
`;

const WarningAlertDiv = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  font-size: 24px;
  color: #9f7a0e;
  justify-content: center;
`;

const SignOutAlertDiv = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  font-size: 24px;
  color: #40a3cb;
  justify-content: center;
`;

const AlertText = styled.div`
  width: 100px;
  flex-grow: 1;
  font-size: 16px;
  line-height: 24px;
`;

export const successAlertText = (text) => {
  return (
    <SuccessAlertDiv>
      <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
      <AlertText>{text}</AlertText>
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

export const SignOutAlertText = (text) => {
  return (
    <SignOutAlertDiv>
      <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
      <AlertText>{text}</AlertText>
    </SignOutAlertDiv>
  );
};
