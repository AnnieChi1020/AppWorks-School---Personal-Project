import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createUser,
  userLogin,
  createNewUser,
  getCurrentUser,
  getUserProfile,
} from "../utils/firebase.js";
import { Modal, Form } from "react-bootstrap";

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
`;

const HeaderActive = styled.div`
  width: 100%;
  font-size: 20px;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 2px solid #1190cb;
  color: #1190cb;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
`;

const SwitchButton = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 20px;
  margin: 20px 5px 0 10px;
  border-radius: 8px;
  border: solid 1px #dee2e6;
  padding: 0 10px;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 20px;
  margin: 20px 10px 0 5px;
  border-radius: 8px;
  border: solid 1px #dee2e6;
  padding: 0 10px;
  background-color: #1190cb;
  color: white;
`;

const styles = {
  modal: {
    marginTop: "30px",
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

function Login() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [action, setAction] = useState("login");
  const [identity, setIdentity] = useState("user");
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const dispatch = useDispatch();
  const logStatus = useSelector((state) => state.isLogged);

  const constructUserData = (userId) => {
    let userData = {
      id: userId,
      role: 0,
      userEmail: signupInfo.email,
      userName: signupInfo.name,
      userPhoto: "",
    };
    return userData;
  };

  const constructHosterData = (userId) => {
    let hosterData = {
      id: userId,
      role: 1,
      orgEmail: signupInfo.email,
      orgName: signupInfo.name,
      orgContact: signupInfo.phone,
      orgPhoto: "",
    };
    return hosterData;
  };

  const handleActionChange = (e) => {
    setAction(e.target.id);
  };

  const handleInputChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.id]: e.target.value });
  };

  useEffect(() => {}, [signupInfo]);

  const handleIdentityChange = (e) => {
    setIdentity(e.target.id);
  };

  const handleSignupButton = async () => {
    const signupMessage = await createUser(
      signupInfo.email,
      signupInfo.password
    );
    if (signupMessage === "auth/email-already-in-use") {
      alert("此Email已被註冊");
    } else {
      const userId = signupMessage;
      let userData;
      identity === "user"
        ? (userData = constructUserData(userId))
        : (userData = constructHosterData(userId));
      await createNewUser(userId, userData);
      dispatch({ type: "SIGN_IN", data: true });
      dispatch({ type: "GET_USERID", data: userId });
      alert("已註冊成功");
    }
  };

  const handleLoginButton = async () => {
    const loginMessage = await userLogin(signupInfo.email, signupInfo.password);
    if (loginMessage === "auth/user-not-found") {
      alert("尚未註冊喔");
    } else if (loginMessage === "auth/wrong-password") {
      alert("密碼有誤喔");
    } else {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        const userId = loginMessage;
        const userData = await getUserProfile(userId);
        if (identity === "user" && userData.role === 0) {
          dispatch({ type: "SIGN_IN", data: true });
          dispatch({ type: "GET_USERID", data: userId });
          dispatch({ type: "GET_USERROLE", data: 0 });
          alert("已登入");
        } else if (identity === "organization" && userData.role === 1) {
          dispatch({ type: "SIGN_IN", data: true });
          dispatch({ type: "GET_USERID", data: userId });
          dispatch({ type: "GET_USERROLE", data: 1 });
          alert("已登入");
        } else if (identity === "user") {
          alert("請以機構身分登入");
        } else {
          alert("請以志工身分登入");
        }
      }
    }
  };

  return (
    <Wrapper>
      <Modal show={show} onHide={handleClose} style={styles.modal}>
        {identity === "user" && action === "login" ? (
          <Modal.Header style={styles.modalHeader} className="mx-5 pb-0">
            <HeaderActive id={"user"} onClick={(e) => handleIdentityChange(e)}>
              志工登入
            </HeaderActive>
            <Header
              id={"organization"}
              onClick={(e) => handleIdentityChange(e)}
            >
              機構登入
            </Header>
          </Modal.Header>
        ) : identity === "user" ? (
          <Modal.Header style={styles.modalHeader} className="mx-5 pb-0">
            <HeaderActive id={"user"} onClick={(e) => handleIdentityChange(e)}>
              志工註冊
            </HeaderActive>
            <Header
              id={"organization"}
              onClick={(e) => handleIdentityChange(e)}
            >
              機構註冊
            </Header>
          </Modal.Header>
        ) : action === "login" ? (
          <Modal.Header style={styles.modalHeader} className="mx-5 pb-0">
            <Header id={"user"} onClick={(e) => handleIdentityChange(e)}>
              志工登入
            </Header>
            <HeaderActive
              id={"organization"}
              onClick={(e) => handleIdentityChange(e)}
            >
              機構登入
            </HeaderActive>
          </Modal.Header>
        ) : (
          <Modal.Header style={styles.modalHeader} className="mx-5 pb-0">
            <Header id={"user"} onClick={(e) => handleIdentityChange(e)}>
              志工註冊
            </Header>
            <HeaderActive
              id={"organization"}
              onClick={(e) => handleIdentityChange(e)}
            >
              機構註冊
            </HeaderActive>
          </Modal.Header>
        )}
        <Modal.Body className="mx-5 py-4">
          {action === "login" ? (
            <Form>
              <Form.Group controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  placeholder="密碼"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          ) : identity === "user" ? (
            <Form>
              <Form.Group controlId="name">
                <Form.Control
                  type="name"
                  placeholder="姓名"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  placeholder="密碼"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          ) : (
            <Form>
              <Form.Group controlId="name">
                <Form.Control
                  type="name"
                  placeholder="機構名稱"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  placeholder="密碼"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Control
                  type="password"
                  placeholder="連絡電話"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer className="mx-5 mb-4 pt-0" style={styles.modalFooter}>
          {action === "login" ? (
            <ButtonContainer>
              <SwitchButton id="signup" onClick={(e) => handleActionChange(e)}>
                立即註冊
              </SwitchButton>
              <SubmitButton onClick={handleLoginButton}>登入</SubmitButton>
            </ButtonContainer>
          ) : (
            <ButtonContainer>
              <SwitchButton id="login" onClick={(e) => handleActionChange(e)}>
                立即登入
              </SwitchButton>
              <SubmitButton onClick={handleSignupButton}>註冊</SubmitButton>
            </ButtonContainer>
          )}
        </Modal.Footer>
      </Modal>
    </Wrapper>
  );
}

export default Login;
