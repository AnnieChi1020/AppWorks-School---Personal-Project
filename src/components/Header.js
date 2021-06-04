import styled from "styled-components";
import React, { useState } from "react";
import Login from "./Login.js";
import logo from "../images/logo_3.png";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
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
  /* box-shadow: 0 0 1rem rgb(0 0 0 / 15%); */
  box-shadow: inset 0px -1px 0px #f3f3f4;
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

    flex-direction: column;
    position: absolute;
    top: 50px;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: white;
  }
`;

const NavItem = styled.a`
  /* color: black; */
  height: 32px;
  display: flex;
  align-items: center;
  color: #3d3d3d;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  padding: 5px 13px;
  margin-left: 20px;
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
    background-color: #57bc90;
    color: white;
  }
  @media (max-width: 720px) {
    width: 100%;
    margin-top: 20px;
    margin-left: 30px;
  }
`;

const MenuImage = styled.img`
  height: 30px;
  cursor: pointer;
`;

const LogoImage = styled.img`
  height: 35px;
  cursor: pointer;
`;

const styles = {
  loginBtn: {
    height: "32px",
    textDecoration: "none",
    backgroundColor: "#57bc90",
    borderRadius: "30px",
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "20px",
    padding: "5px 13px",
    marginLeft: "30px",
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

  const handleMenuClick = () => {
    document.querySelector("#navItemsContainer").style.display = "flex";
  };

  return (
    <Container>
      <HeaderContent>
        <NavContent>
          <LogoContainer>
            <LogoImage src={logo} onClick={handleLogoClick} />
          </LogoContainer>
          <NavItemsContainer id="navItemsContainer">
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
            <MenuImage src={menu} onClick={() => handleMenuClick()} />
          </MenuContainer>
        </NavContent>
      </HeaderContent>
      {renderLoginModal()}
    </Container>
  );
}

export default Header;
