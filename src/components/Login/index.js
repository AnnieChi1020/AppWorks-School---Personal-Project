import styled from "styled-components";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAuth,
  userSignIn,
  addNewUserInfo,
  getCurrentUser,
  getUserProfile,
} from "../../utils/firebase.js";
import {
  validateEmail,
  validatePassword,
  validatePhoneNum,
  validateInput,
} from "../../utils/validation.js";
import { Modal } from "react-bootstrap";
import { successAlertText, errorAlertText } from "../../components/Alert.js";
import { toast } from "react-toastify";
import ModalHeader from "./ModalHeader.js";
import UserLogin from "./UserLogin.js";
import OrgLogin from "./OrgLogin.js";
import UserSignUp from "./UserSignUp.js";
import OrgSignUp from "./OrgSignUp.js";

const Container = styled.div`
  width: 50%;
  margin: 0 auto;
`;

const StyledModal = styled(Modal)`
  margin-top: 100px;
`;

function Login() {
  const loginModal = useSelector((state) => state.modal.login);

  const handleClose = () => dispatch({ type: "LOGIN", data: false });

  const [action, setAction] = useState("login");
  const [identity, setIdentity] = useState("user");

  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const [nameIsInvalid, setNameIsInvalid] = useState(false);
  const [phoneIsInvalid, setPhoneIsInvalid] = useState(false);

  const dispatch = useDispatch();

  const constructUserData = (userId, email, name) => {
    const userData = {
      id: userId,
      role: 0,
      userEmail: email,
      userName: name,
      userPhoto: "",
    };
    return userData;
  };

  const constructHosterData = (userId, email, name, phone) => {
    const hosterData = {
      id: userId,
      role: 1,
      orgEmail: email,
      orgName: name,
      orgContact: phone,
      orgPhoto: "",
    };
    return hosterData;
  };

  const initValidationStatus = () => {
    setEmailIsInvalid(false);
    setPasswordIsInvalid(false);
    setNameIsInvalid(false);
    setPhoneIsInvalid(false);
  };

  const resetInputs = () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  const handleActionChange = (e) => {
    setAction(e.target.id);
    initValidationStatus();
    resetInputs();
  };

  const handleIdentityChange = (e) => {
    setIdentity(e.target.id);
    initValidationStatus();
    resetInputs();
  };

  const signup = async (inputs) => {
    const email = inputs.email.value;
    const password = inputs.password.value;
    const name = inputs.name.value;
    const signupMessage = await createUserAuth(email, password);
    if (signupMessage === "auth/email-already-in-use") {
      toast.error(errorAlertText("此 email 已被註冊"), {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const userId = signupMessage;
      let userData;
      identity === "user"
        ? (userData = constructUserData(userId, email, name))
        : (userData = constructHosterData(
            userId,
            email,
            name,
            inputs.phone.value
          ));
      await addNewUserInfo(userId, userData);

      dispatch({ type: "SIGN_IN", data: true });
      dispatch({ type: "GET_USERID", data: userId });

      identity === "user"
        ? dispatch({ type: "GET_USERROLE", data: 0 })
        : dispatch({ type: "GET_USERROLE", data: 1 });

      toast.success(successAlertText("註冊成功！"), {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch({ type: "LOGIN", data: false });
    }
  };

  const login = async (inputs) => {
    const email = inputs.email.value;
    const password = inputs.password.value;
    const loginMessage = await userSignIn(email, password);

    if (loginMessage === "auth/user-not-found") {
      toast.error(errorAlertText("email 尚未註冊喔"), {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (loginMessage === "auth/wrong-password") {
      toast.error(errorAlertText("密碼有誤喔"), {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        const userId = loginMessage;
        const userData = await getUserProfile(userId);

        if (identity === "user" && userData.role === 0) {
          dispatch({ type: "SIGN_IN", data: true });
          dispatch({ type: "GET_USERID", data: userId });
          dispatch({ type: "GET_USERROLE", data: 0 });
          dispatch({ type: "LOGIN", data: false });
          toast.success(successAlertText("登入成功！"), {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (identity === "organization" && userData.role === 1) {
          dispatch({ type: "SIGN_IN", data: true });
          dispatch({ type: "GET_USERID", data: userId });
          dispatch({ type: "GET_USERROLE", data: 1 });
          dispatch({ type: "LOGIN", data: false });
          toast.success(successAlertText("登入成功！"), {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (identity === "user") {
          toast.error(errorAlertText("請以機構身分登入"), {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error(errorAlertText("請以志工身分登入"), {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const inputs = event.currentTarget;

    const emailIsValid = validateEmail(inputs.email.value, setEmailIsInvalid);
    const passwordIsValid = validatePassword(
      inputs.password.value,
      setPasswordIsInvalid
    );

    if (emailIsValid && passwordIsValid) {
      login(inputs);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const inputs = event.currentTarget;

    const nameIsValid = validateInput(inputs.name.value, setNameIsInvalid);
    const emailIsValid = validateEmail(inputs.email.value, setEmailIsInvalid);
    const passwordIsValid = validatePassword(
      inputs.password.value,
      setPasswordIsInvalid
    );
    let phoneIsValid;
    if (inputs.phone) {
      phoneIsValid = validatePhoneNum(inputs.phone.value, setPhoneIsInvalid);
    } else {
      phoneIsValid = null;
    }

    if (
      nameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      (phoneIsValid || phoneIsValid === null)
    ) {
      signup(inputs);
    }
  };

  const modalHeaderProps = {
    identity: identity,
    action: action,
    changeIdentity: handleIdentityChange,
  };

  const loginProps = {
    submit: handleLoginSubmit,
    emailValid: emailIsInvalid,
    passwordValid: passwordIsInvalid,
    swiftAction: handleActionChange,
  };

  const signUpProps = {
    submit: handleSignupSubmit,
    nameValid: nameIsInvalid,
    emailValid: emailIsInvalid,
    phoneValid: phoneIsInvalid,
    passwordValid: passwordIsInvalid,
    swiftAction: handleActionChange,
  };

  return (
    <Container>
      <StyledModal show={loginModal} onHide={handleClose} size="sm">
        <ModalHeader {...modalHeaderProps} />
        <Modal.Body className="mx-2 py-4">
          {action === "login" && identity === "user" ? (
            <UserLogin {...loginProps} />
          ) : action === "login" && identity === "organization" ? (
            <OrgLogin {...loginProps} />
          ) : identity === "user" ? (
            <UserSignUp {...signUpProps} />
          ) : (
            <OrgSignUp {...signUpProps} />
          )}
        </Modal.Body>
      </StyledModal>
    </Container>
  );
}

export default Login;
