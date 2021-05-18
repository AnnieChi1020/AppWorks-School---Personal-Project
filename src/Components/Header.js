import styled from "styled-components";
import React, { useState } from "react";
import { getEvents, updateEvent } from "../utils/firebase.js";
import Login from "./Login.js";

// import { useHistory } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

const Wrapper = styled.header`
  width: 100%;
  margin: 0 auto;
`;

const HeaderContent = styled.div`
  width: 100%;
  align-items: center;
  background-color: #c2c2c2;
`;

const NavContent = styled.div`
  width: 90%;
  margin: 0 auto;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: row;
`;

const NavItem = styled.a`
  color: white;
  font-size: 16px;
  line-height: 20px;
  padding: 10px 10px;
  text-decoration: none;
`;

function Header() {
  const [click, setClick] = useState(false);
  // const [isLogin, setIsLogin] = useState(false);

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

  const handleLoginClick = () => {
    click === false ? setClick(true) : setClick(false);
  };

  updatePassedEvent();

  return (
    <Wrapper>
      <HeaderContent>
        <NavContent>
          <NavItem href="/">Volunteer</NavItem>
          <NavItems>
            <NavItem href="/events">我要當志工</NavItem>
            <NavItem href="/createEvent">招募志工</NavItem>
            <NavItem href="/past-events">活動成果</NavItem>
            <NavItem onClick={() => handleLoginClick()}>個人頁</NavItem>
          </NavItems>
        </NavContent>
      </HeaderContent>
      {click ? <Login></Login> : console.log("close")}
    </Wrapper>
  );
}

export default Header;
