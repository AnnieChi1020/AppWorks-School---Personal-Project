import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {
  getEvents,
  updateEvent,
  checkAuthStatus,
  getUserProfile,
} from "../utils/firebase.js";
import Login from "./Login.js";
import logo from "../images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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

const NavItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NavItem = styled.a`
  color: black;
  font-size: 16px;
  line-height: 20px;
  padding: 5px 0px;
  margin-left: 30px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    color: black;
    font-weight: 600;
    color: #1190cb;
    border-bottom: 2px solid #1190cb;
  }
`;

const Img = styled.img`
  height: 30px;
  cursor: pointer;
`;

function Header() {
  const [click, setClick] = useState(false);
  const isLogged = useSelector((state) => state.isLogged.isLogged);
  const userRole = useSelector((state) => state.isLogged.userRole);
  const dispatch = useDispatch();

  const history = useHistory();

  const updatePassedEvent = async () => {
    const activeEvents = await getEvents(0);
    activeEvents.map((event) => {
      const startT = event.startTime.seconds * 1000;
      const currentT = new Date().getTime();
      if (startT < currentT) {
        event.eventStatus = 1;
        updateEvent(event.eventId, event);
      }
      return true;
    });
  };
  updatePassedEvent();

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
    click === false ? setClick(true) : setClick(false);
  };

  const checkLoginStatus = async () => {
    const userId = await checkAuthStatus();
    const userProfile = await getUserProfile(userId);
    if (userId) {
      dispatch({ type: "SIGN_IN", data: true });
      dispatch({ type: "GET_USERID", data: userId });
      dispatch({ type: "GET_USERROLE", data: userProfile.role });
    }
    return;
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <Container>
      <HeaderContent>
        <NavContent className="container-xl mb-5">
          <NavItems>
            <Img src={logo} onClick={handleLogoClick} />
          </NavItems>
          <NavItems>
            <NavItem onClick={handleEventsClick}>我要當志工</NavItem>
            <NavItem onClick={handleCreateEventClick}>招募志工</NavItem>
            <NavItem onClick={handlePastEventsClick}>活動成果</NavItem>
            {isLogged === true ? (
              <NavItem onClick={handleProfileClick}>我的活動</NavItem>
            ) : (
              <NavItem onClick={() => handleLoginClick()}>登入 / 註冊</NavItem>
            )}
          </NavItems>
        </NavContent>
      </HeaderContent>
      {click ? <Login></Login> : <div />}
    </Container>
  );
}

export default Header;
