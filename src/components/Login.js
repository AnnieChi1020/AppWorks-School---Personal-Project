import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAuth,
  userSignIn,
  addNewUserInfo,
  getCurrentUser,
  getUserProfile,
} from "../utils/firebase.js";
import { Modal, Form } from "react-bootstrap";
import { successAlertText, errorAlertText } from "../components/Alert.js";

import { toast } from "react-toastify";
// import ErrorIcon from "@material-ui/icons/Error";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
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

const HeaderActive = styled.div`
  width: 100%;
  font-size: 20px;
  text-align: center;
  padding-bottom: 10px;
  font-weight: 600;
  cursor: default;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

const SwitchButton = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 20px;
  border-radius: 8px;
  border: solid 1px #40a3cb;
  padding: 0 10px;
  background-color: white;
  color: #40a3cb;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 20px;
  border-radius: 8px;
  border: solid 1px #dee2e6;
  padding: 0 10px;
  background-color: #40a3cb;
  color: white;
`;

const TestAccount = styled.div`
  padding: 5px 12px 5px 5px;
  font-size: 12px;
  line-height: 14px;
  color: #a5a5a5;
`;

const styles = {
  modal: {
    marginTop: "100px",
  },
  modalHeader: {
    justifyContent: "space-evenly",
    border: "none",
  },
  modalTitle: {
    paddingBottom: "5px",
  },
  modalFooter: {
    border: "none",
  },
};

const Styles = styled.div`
  .invalid-feedback {
    margin-top: 5px;
  }
  input:focus {
    outline: none !important;
  }
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
    let userData = {
      id: userId,
      role: 0,
      userEmail: email,
      userName: name,
      userPhoto: "",
    };
    return userData;
  };

  const constructHosterData = (userId, email, name, phone) => {
    let hosterData = {
      id: userId,
      role: 1,
      orgEmail: email,
      orgName: name,
      orgContact: phone,
      orgPhoto: "",
    };
    return hosterData;
  };

  const clearValidationStatus = () => {
    setEmailIsInvalid(false);
    setPasswordIsInvalid(false);
    setNameIsInvalid(false);
    setPhoneIsInvalid(false);
  };

  const handleActionChange = (e) => {
    setAction(e.target.id);
    setValidated(false);
    clearValidationStatus();
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  const handleIdentityChange = (e) => {
    setIdentity(e.target.id);
    setValidated(false);
    clearValidationStatus();
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });
    return;
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

  const [validated, setValidated] = useState(false);

  const handleLoginSubmit = async (event) => {
    const inputs = event.currentTarget;
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log(inputs.email.value);
    if (!inputs.email.value.match(validRegex)) {
      setEmailIsInvalid(true);
    } else {
      setEmailIsInvalid(false);
    }

    if (inputs.password.value.length < 6) {
      setPasswordIsInvalid(true);
    } else {
      setPasswordIsInvalid(false);
    }

    if (inputs.checkValidity() === true) {
      login(inputs);
    }

    event.preventDefault();
    event.stopPropagation();
  };

  const handleSignupSubmit = async (event) => {
    const inputs = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (!inputs.name.value) {
      setNameIsInvalid(true);
    } else {
      setNameIsInvalid(false);
    }

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!inputs.email.value.match(validRegex)) {
      setEmailIsInvalid(true);
    } else {
      setEmailIsInvalid(false);
    }

    if (inputs.password.value.length < 6) {
      setPasswordIsInvalid(true);
    } else {
      setPasswordIsInvalid(false);
    }

    if (inputs.phone) {
      const phoneno = /^\d{10}$/;
      if (!inputs.phone.value.match(phoneno)) {
        setPhoneIsInvalid(true);
      } else {
        setPhoneIsInvalid(false);
      }
    }

    if (inputs.checkValidity() === true) {
      signup(inputs);
    }
  };

  const renderModalHeader = () => {
    return identity === "user" && action === "login" ? (
      <Modal.Header style={styles.modalHeader} className="mx-2 pb-0">
        <HeaderActive
          id={"user"}
          style={{ borderBottom: "2px solid #40a3cb", color: "#40a3cb" }}
          onClick={(e) => handleIdentityChange(e)}
        >
          志工登入
        </HeaderActive>
        <Header id={"organization"} onClick={(e) => handleIdentityChange(e)}>
          機構登入
        </Header>
      </Modal.Header>
    ) : identity === "user" ? (
      <Modal.Header style={styles.modalHeader} className="mx-2 pb-0">
        <HeaderActive
          id={"user"}
          style={{ borderBottom: "2px solid #40a3cb", color: "#40a3cb" }}
          onClick={(e) => handleIdentityChange(e)}
        >
          志工註冊
        </HeaderActive>
        <Header id={"organization"} onClick={(e) => handleIdentityChange(e)}>
          機構註冊
        </Header>
      </Modal.Header>
    ) : action === "login" ? (
      <Modal.Header style={styles.modalHeader} className="mx-2 pb-0">
        <Header id={"user"} onClick={(e) => handleIdentityChange(e)}>
          志工登入
        </Header>
        <HeaderActive
          id={"organization"}
          onClick={(e) => handleIdentityChange(e)}
          style={{ borderBottom: "2px solid #54a783", color: "#54a783" }}
        >
          機構登入
        </HeaderActive>
      </Modal.Header>
    ) : (
      <Modal.Header style={styles.modalHeader} className="mx-2 pb-0">
        <Header id={"user"} onClick={(e) => handleIdentityChange(e)}>
          志工註冊
        </Header>
        <HeaderActive
          id={"organization"}
          onClick={(e) => handleIdentityChange(e)}
          style={{ borderBottom: "2px solid #54a783", color: "#54a783" }}
        >
          機構註冊
        </HeaderActive>
      </Modal.Header>
    );
  };

  const userLogin = () => {
    return (
      <Styles>
        <Form
          noValidate
          // validated={validated}
          onSubmit={handleLoginSubmit}
        >
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="jennie@gmail.com"
              className="mb-1 formInput"
              required
              isInvalid={emailIsInvalid}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              請輸入正確的email
            </Form.Control.Feedback>

            {/* <TestAccount>測試帳號：jeannie@gmail.com</TestAccount> */}
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="000000"
              className="mb-1"
              required
              isInvalid={passwordIsInvalid}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              密碼需超過6個字元
            </Form.Control.Feedback>
          </Form.Group>
          <ButtonContainer>
            <SwitchButton id="signup" onClick={(e) => handleActionChange(e)}>
              立即註冊
            </SwitchButton>
            <SubmitButton type="submit">登入</SubmitButton>
          </ButtonContainer>
        </Form>
      </Styles>
    );
  };

  const organizationLogin = () => {
    return (
      <Styles>
        <Form noValidate validated={validated} onSubmit={handleLoginSubmit}>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="doggy_place@gmail.com"
              className="mb-1"
              required
              isInvalid={emailIsInvalid}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              請輸入正確的email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="000000"
              className="mb-1"
              required
              isInvalid={passwordIsInvalid}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              密碼需超過6個字元
            </Form.Control.Feedback>
          </Form.Group>
          <ButtonContainer>
            <SwitchButton
              id="signup"
              onClick={(e) => handleActionChange(e)}
              style={{ border: "1px solid #57BC90", color: "#57BC90" }}
            >
              立即註冊
            </SwitchButton>
            <SubmitButton type="submit" style={{ backgroundColor: "#57BC90" }}>
              登入
            </SubmitButton>
          </ButtonContainer>
        </Form>
      </Styles>
    );
  };

  const userSignup = () => {
    return (
      <Styles>
        <Form noValidate validated={validated} onSubmit={handleSignupSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              type="name"
              placeholder="姓名"
              className="mb-1"
              required
              isInvalid={nameIsInvalid}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              請輸入姓名
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Email"
              className="mb-1"
              required
              isInvalid={emailIsInvalid}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              請輸入正確的email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="密碼"
              className="mb-1"
              required
              isInvalid={passwordIsInvalid}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              密碼需超過6個字元
            </Form.Control.Feedback>
          </Form.Group>
          <ButtonContainer>
            <SwitchButton id="login" onClick={(e) => handleActionChange(e)}>
              立即登入
            </SwitchButton>
            <SubmitButton type="submit">註冊</SubmitButton>
          </ButtonContainer>
        </Form>
      </Styles>
    );
  };

  const organizationSignup = () => {
    return (
      <Styles>
        <Form noValidate validated={validated} onSubmit={handleSignupSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              type="name"
              placeholder="機構名稱"
              className="mb-1"
              required
              isInvalid={nameIsInvalid}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              請輸入機構名稱
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Email"
              className="mb-1"
              required
              isInvalid={emailIsInvalid}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              請輸入正確的email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="密碼"
              className="mb-1"
              required
              isInvalid={passwordIsInvalid}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              密碼需超過6個字元
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Control
              type="text"
              placeholder="0912345678"
              className="mb-1"
              required
              isInvalid={phoneIsInvalid}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ position: "inherit" }}
            >
              請輸入連絡電話
            </Form.Control.Feedback>
          </Form.Group>
          <ButtonContainer>
            <SwitchButton
              id="login"
              onClick={(e) => handleActionChange(e)}
              style={{ border: "1px solid #57BC90", color: "#57BC90" }}
            >
              立即登入
            </SwitchButton>
            <SubmitButton type="submit" style={{ backgroundColor: "#57BC90" }}>
              註冊
            </SubmitButton>
          </ButtonContainer>
        </Form>
      </Styles>
    );
  };

  return (
    <Wrapper>
      <Modal
        show={loginModal}
        onHide={handleClose}
        style={styles.modal}
        size="sm"
      >
        {renderModalHeader()}
        <Modal.Body className="mx-2 py-4">
          {action === "login" && identity === "user"
            ? userLogin()
            : action === "login" && identity === "organization"
            ? organizationLogin()
            : identity === "user"
            ? userSignup()
            : organizationSignup()}
        </Modal.Body>
      </Modal>
    </Wrapper>
  );
}

export default Login;
