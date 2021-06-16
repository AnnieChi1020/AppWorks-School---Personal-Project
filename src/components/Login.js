import styled from "styled-components";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAuth,
  userSignIn,
  addNewUserInfo,
  getCurrentUser,
  getUserProfile,
} from "../utils/firebase.js";
import {
  validateEmail,
  validatePassword,
  validatePhoneNum,
  validateName,
} from "../utils/validation.js";
import { Modal, Form } from "react-bootstrap";
import { successAlertText, errorAlertText } from "../components/Alert.js";
import { toast } from "react-toastify";

const Container = styled.div`
  width: 50%;
  margin: 0 auto;
`;

const Header = styled.div`
  width: 100%;
  font-size: 20px;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #dee2e6;
  cursor: pointer;
`;

const UserHeaderActive = styled(Header)`
  font-weight: 600;
  cursor: default;
  border-bottom: 2px solid #40a3cb;
  color: #40a3cb;
`;

const OrgHeaderActive = styled(UserHeaderActive)`
  border-bottom: 2px solid #54a783;
  color: #54a783;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

const PrimaryButton = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 20px;
  border-radius: 8px;
  border: solid 1px #dee2e6;
  padding: 0 10px;
  background-color: #40a3cb;
  color: white;
`;

const SecondaryButton = styled(PrimaryButton)`
  border-color: #40a3cb;
  background-color: white;
  color: #40a3cb;
`;

const OrgPrimaryButton = styled(PrimaryButton)`
  background-color: #57bc90;
`;

const OrgSecondaryButton = styled(SecondaryButton)`
  border-color: #57bc90;
  color: #57bc90;
`;

const StyledModal = styled(Modal)`
  margin-top: 100px;
`;

const StyledModalHeader = styled(Modal.Header)`
  justify-content: space-evenly;
  border: none;
`;

const StyledFormControlFeedback = styled(Form.Control.Feedback)`
  position: inherit !important;
`;

const Styles = styled.div``;

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

    const nameIsValid = validateName(inputs.name.value, setNameIsInvalid);
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

  const renderModalHeader = () => {
    return identity === "user" && action === "login" ? (
      <StyledModalHeader className="mx-2 pb-0">
        <UserHeaderActive id={"user"} onClick={(e) => handleIdentityChange(e)}>
          志工登入
        </UserHeaderActive>
        <Header id={"organization"} onClick={(e) => handleIdentityChange(e)}>
          機構登入
        </Header>
      </StyledModalHeader>
    ) : identity === "user" ? (
      <StyledModalHeader className="mx-2 pb-0">
        <UserHeaderActive id={"user"} onClick={(e) => handleIdentityChange(e)}>
          志工註冊
        </UserHeaderActive>
        <Header id={"organization"} onClick={(e) => handleIdentityChange(e)}>
          機構註冊
        </Header>
      </StyledModalHeader>
    ) : action === "login" ? (
      <StyledModalHeader className="mx-2 pb-0">
        <Header id={"user"} onClick={(e) => handleIdentityChange(e)}>
          志工登入
        </Header>
        <OrgHeaderActive
          id={"organization"}
          onClick={(e) => handleIdentityChange(e)}
        >
          機構登入
        </OrgHeaderActive>
      </StyledModalHeader>
    ) : (
      <StyledModalHeader className="mx-2 pb-0">
        <Header id={"user"} onClick={(e) => handleIdentityChange(e)}>
          志工註冊
        </Header>
        <OrgHeaderActive
          id={"organization"}
          onClick={(e) => handleIdentityChange(e)}
        >
          機構註冊
        </OrgHeaderActive>
      </StyledModalHeader>
    );
  };

  const renderUserLogin = () => {
    return (
      <Styles>
        <Form noValidate onSubmit={handleLoginSubmit}>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="jennie@gmail.com"
              required
              isInvalid={emailIsInvalid}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            <StyledFormControlFeedback type="invalid">
              請輸入正確的email
            </StyledFormControlFeedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="000000"
              required
              isInvalid={passwordIsInvalid}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            <StyledFormControlFeedback type="invalid">
              密碼需超過6個字元
            </StyledFormControlFeedback>
          </Form.Group>
          <ButtonContainer>
            <SecondaryButton id="signup" onClick={(e) => handleActionChange(e)}>
              立即註冊
            </SecondaryButton>
            <PrimaryButton type="submit">登入</PrimaryButton>
          </ButtonContainer>
        </Form>
      </Styles>
    );
  };

  const renderOrgLogin = () => {
    return (
      <Styles>
        <Form noValidate onSubmit={handleLoginSubmit}>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="doggy_place@gmail.com"
              required
              isInvalid={emailIsInvalid}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            <StyledFormControlFeedback type="invalid">
              請輸入正確的email
            </StyledFormControlFeedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="000000"
              required
              isInvalid={passwordIsInvalid}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            <StyledFormControlFeedback type="invalid">
              密碼需超過6個字元
            </StyledFormControlFeedback>
          </Form.Group>
          <ButtonContainer>
            <OrgSecondaryButton
              id="signup"
              onClick={(e) => handleActionChange(e)}
            >
              立即註冊
            </OrgSecondaryButton>
            <OrgPrimaryButton type="submit">登入</OrgPrimaryButton>
          </ButtonContainer>
        </Form>
      </Styles>
    );
  };

  const renderUserSignup = () => {
    return (
      <Styles>
        <Form noValidate onSubmit={handleSignupSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              type="name"
              placeholder="姓名"
              required
              isInvalid={nameIsInvalid}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            <StyledFormControlFeedback type="invalid">
              請輸入姓名
            </StyledFormControlFeedback>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Email"
              required
              isInvalid={emailIsInvalid}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            <StyledFormControlFeedback type="invalid">
              請輸入正確的email
            </StyledFormControlFeedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="密碼"
              required
              isInvalid={passwordIsInvalid}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            <StyledFormControlFeedback type="invalid">
              密碼需超過6個字元
            </StyledFormControlFeedback>
          </Form.Group>
          <ButtonContainer>
            <SecondaryButton id="login" onClick={(e) => handleActionChange(e)}>
              立即登入
            </SecondaryButton>
            <PrimaryButton type="submit">註冊</PrimaryButton>
          </ButtonContainer>
        </Form>
      </Styles>
    );
  };

  const renderOrgSignup = () => {
    return (
      <Styles>
        <Form noValidate onSubmit={handleSignupSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              type="name"
              placeholder="機構名稱"
              required
              isInvalid={nameIsInvalid}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            <StyledFormControlFeedback type="invalid">
              請輸入機構名稱
            </StyledFormControlFeedback>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Email"
              required
              isInvalid={emailIsInvalid}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            <StyledFormControlFeedback type="invalid">
              請輸入正確的email
            </StyledFormControlFeedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="密碼"
              required
              isInvalid={passwordIsInvalid}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            <StyledFormControlFeedback type="invalid">
              密碼需超過6個字元
            </StyledFormControlFeedback>
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Control
              type="text"
              placeholder="0912345678"
              required
              isInvalid={phoneIsInvalid}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            <StyledFormControlFeedback type="invalid">
              請輸入正確的連絡電話
            </StyledFormControlFeedback>
          </Form.Group>
          <ButtonContainer>
            <OrgSecondaryButton
              id="login"
              onClick={(e) => handleActionChange(e)}
            >
              立即登入
            </OrgSecondaryButton>
            <OrgPrimaryButton type="submit">註冊</OrgPrimaryButton>
          </ButtonContainer>
        </Form>
      </Styles>
    );
  };

  return (
    <Container>
      <StyledModal show={loginModal} onHide={handleClose} size="sm">
        {renderModalHeader()}
        <Modal.Body className="mx-2 py-4">
          {action === "login" && identity === "user"
            ? renderUserLogin()
            : action === "login" && identity === "organization"
            ? renderOrgLogin()
            : identity === "user"
            ? renderUserSignup()
            : renderOrgSignup()}
        </Modal.Body>
      </StyledModal>
    </Container>
  );
}

export default Login;
