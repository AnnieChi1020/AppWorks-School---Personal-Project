import styled from "styled-components";
import React, { useState } from "react";
// import {
//   getEvents,
//   updateEvent,
//   checkAuthStatus,
//   getUserProfile,
// } from "../utils/firebase.js";
import Login from "./Login.js";
import logo from "../images/logo.png";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const HeaderContent = styled.div`
  width: 100%;
  height: 50px;
  align-items: center;
  background-color: white;
  box-shadow: 0 0 1rem rgb(0 0 0 / 15%);
  position: fixed;
  top: 0;
  z-index: 5;
`;

const NavContent = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MenuContainer = styled.div`
  display: none;
  @media (max-width: 720px) {
    display: block;
    font-size: 12px;
    line-height: 16px;
    color: green;
    position: fixed;
    z-index: 10;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 720px) {
    margin: 0 auto;
  }
`;

const NavItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 720px) {
    display: none;
  }
`;

const NavItem = styled.a`
  /* color: black; */
  display: flex;
  align-items: center;
  color: #cd6248;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  padding: 5px 10px;
  margin-left: 30px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 30px;
  &:hover {
    /* text-decoration: none;
    color: black;
    font-weight: 600;
    color: #1190cb;
    border-bottom: 2px solid #1190cb; */
    line-height: 20px;
    text-decoration: none;
    background-color: #cd6248;
    color: white;
  }
`;

const Img = styled.img`
  height: 30px;
  cursor: pointer;
`;

const styles = {
  loginBtn: {
    textDecoration: "none",
    backgroundColor: "#CD6248",
    borderRadius: "30px",
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "20px",
    padding: "5px 10px",
  },
};

function Header() {
  const [click, setClick] = useState(false);
  const isLogged = useSelector((state) => state.isLogged.isLogged);
  const userRole = useSelector((state) => state.isLogged.userRole);
  const loginModal = useSelector((state) => state.modal.login);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogoClick = () => {
    history.push("/");
  };

  const handleEventsClick = () => {
    history.push("/events");
  };

  const handleCreateEventClick = () => {
    userRole === 1 ? history.push("/createEvent") : alert("請先登入機構帳號");
  };

  const handlePastEventsClick = () => {
    history.push("/pastEvents");
  };

  const handleProfileClick = () => {
    history.push("/profile");
  };

  const handleLoginClick = () => {
    loginModal === false
      ? dispatch({ type: "LOGIN", data: true })
      : dispatch({ type: "LOGIN", data: false });
  };

  const renderLoginModal = () => {
    return loginModal ? <Login></Login> : <div />;
  };

  return (
    <Container>
      <HeaderContent>
        <NavContent>
          <LogoContainer>
            <Img
              // src={logo}
              onClick={handleLogoClick}
            />
          </LogoContainer>
          <NavItemsContainer>
            <NavItem onClick={handleEventsClick}>我要當志工</NavItem>
            <NavItem onClick={handleCreateEventClick}>招募志工</NavItem>
            <NavItem onClick={handlePastEventsClick}>活動成果</NavItem>
            {isLogged === true ? (
              <NavItem onClick={handleProfileClick} style={styles.loginBtn}>
                我的活動
              </NavItem>
            ) : (
              <NavItem
                onClick={() => handleLoginClick()}
                style={styles.loginBtn}
              >
                登入 / 註冊
              </NavItem>
            )}
          </NavItemsContainer>
          <MenuContainer>
            <Img src={menu} />
          </MenuContainer>
        </NavContent>
      </HeaderContent>
      {renderLoginModal()}
    </Container>
  );
}

export default Header;
