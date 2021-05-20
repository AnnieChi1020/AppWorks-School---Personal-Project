import styled from "styled-components";
import React, { useState } from "react";
import { getEvents, updateEvent } from "../utils/firebase.js";
import Login from "./Login.js";
import logo from "../images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import isLoggedReducer from "../Redux/reducers/isLogged.js";

const Wrapper = styled.header`
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
  margin-right: 30px;
  text-decoration: none;
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
`;

const styles = {
  link: {
    color: "black",
    textDecoration: "none",
  },
};

function Header() {
  const [click, setClick] = useState(false);
  const isLogged = useSelector((state) => state.isLogged.isLogged);
  console.log(isLogged);

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
        <NavContent className="container-md">
          <NavItems>
            <Link to="/">
              <Img src={logo} />
            </Link>
          </NavItems>
          <NavItems>
            <NavItem>
              <Link to="/events" style={styles.link}>
                我要當志工
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/createEvent" style={styles.link}>
                招募志工
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/past-events" style={styles.link}>
                活動成果
              </Link>
            </NavItem>
            {isLogged === true ? (
              <NavItem>
                <Link to="/profile" style={styles.link}>
                  我的活動
                </Link>
              </NavItem>
            ) : (
              <NavItem onClick={() => handleLoginClick()}>登入 / 註冊</NavItem>
            )}
          </NavItems>
        </NavContent>
      </HeaderContent>
      {click ? <Login></Login> : console.log("close")}
    </Wrapper>
  );
}

export default Header;
