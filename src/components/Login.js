import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createUser, userLogin, createNewUser } from "../utils/firebase.js";
import { Modal } from "react-bootstrap";

const Wrapper = styled.div`
  width: 50%;
  margin: 0 auto;
`;

const LoginDialogue = styled.div`
  width: 40%;
  height: 500px;
  margin: 0 auto;
  // border: 1px solid #979797;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  background-color: #f3f3f3;
  position: fixed;
  top: 15%;
  left: 30%;
  z-index: 2;
  padding: 20px 0;
`;

const LoginContent = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const LoginHeaders = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
`;

const LoginHeader = styled.div`
  width: 100%;
  font-size: 20px;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #979797;
`;

const Mask = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 1;
`;

const Field = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const FieldInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const TextInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 8px;
  border: solid 1px #979797;
  padding: 0 10px;
`;

const SwitchIdentity = styled.div`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  margin: 0 auto;
  text-align: center;
  margin-top: 20px;
  color: #4072d7;
  text-decoration: underline;
`;

const Button = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 20px;
  border-radius: 8px;
  border: solid 1px #979797;
  padding: 0 10px;
  background-color: #979797;
`;

function Login() {
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
    console.log(userData);
    return userData;
  };

  const constructHosterData = (userId) => {
    let hosterData = {
      id: userId,
      role: 1,
      orgEmail: signupInfo.email,
      orgName: signupInfo.name,
      orgContact: "",
      orgPhoto: "",
    };
    console.log(hosterData);
    return hosterData;
  };

  const handleActionClick = (button) => {
    setAction(button.target.id);
    console.log(action);
  };

  const handleNameChange = (e) => {
    setSignupInfo({ ...signupInfo, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setSignupInfo({ ...signupInfo, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setSignupInfo({ ...signupInfo, password: e.target.value });
  };

  const handlePhoneChange = (e) => {
    setSignupInfo({ ...signupInfo, phone: e.target.value });
  };

  const handleAddressChange = (e) => {
    setSignupInfo({ ...signupInfo, address: e.target.value });
  };

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
    console.log(signupMessage);
  };

  const handleLoginButton = async () => {
    const loginMessage = await userLogin(signupInfo.email, signupInfo.password);
    if (loginMessage === "auth/user-not-found") {
      alert("尚未註冊喔");
    } else if (loginMessage === "auth/wrong-password") {
      alert("密碼有誤喔");
    } else {
      const userId = loginMessage;
      dispatch({ type: "SIGN_IN", data: true });
      dispatch({ type: "GET_USERID", data: userId });
      alert("已登入");
    }
  };

  return (
    <Wrapper>
      <LoginDialogue>
        <LoginContent>
          <LoginHeaders>
            <LoginHeader id={"login"} onClick={(e) => handleActionClick(e)}>
              登入
            </LoginHeader>
            <LoginHeader id={"signup"} onClick={(e) => handleActionClick(e)}>
              註冊
            </LoginHeader>
          </LoginHeaders>
          <Field>
            {action === "signup" ? (
              identity === "user" ? (
                <FieldInput>
                  <TextInput
                    placeholder="姓名"
                    onChange={handleNameChange}
                  ></TextInput>
                </FieldInput>
              ) : (
                <FieldInput>
                  <TextInput
                    placeholder="機構名稱"
                    onChange={handleNameChange}
                  ></TextInput>
                </FieldInput>
              )
            ) : (
              <div></div>
            )}
            <FieldInput>
              <TextInput
                placeholder="Email"
                onChange={handleEmailChange}
              ></TextInput>
            </FieldInput>
            <FieldInput>
              <TextInput
                placeholder="密碼"
                onChange={handlePasswordChange}
              ></TextInput>
            </FieldInput>
            {identity === "user" ? (
              <div></div>
            ) : action === "signup" ? (
              <FieldInput>
                <TextInput
                  placeholder="連絡電話"
                  onChange={handlePhoneChange}
                ></TextInput>
              </FieldInput>
            ) : (
              <div></div>
            )}
            {identity === "user" ? (
              <div></div>
            ) : action === "signup" ? (
              <FieldInput>
                <TextInput
                  placeholder="機構地址"
                  onChange={handleAddressChange}
                ></TextInput>
              </FieldInput>
            ) : (
              <div></div>
            )}
          </Field>
          {action === "login" ? (
            <Button onClick={handleLoginButton}>登入</Button>
          ) : (
            <Button onClick={handleSignupButton}>註冊</Button>
          )}
          {identity === "user" ? (
            <SwitchIdentity id={"organization"} onClick={handleIdentityChange}>
              我是機構單位
            </SwitchIdentity>
          ) : (
            <SwitchIdentity id={"user"} onClick={handleIdentityChange}>
              我是志工
            </SwitchIdentity>
          )}
        </LoginContent>
      </LoginDialogue>
      <Mask></Mask>
    </Wrapper>
  );
}

export default Login;
