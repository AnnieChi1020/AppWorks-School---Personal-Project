import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Login from "./Login.js";
// import logo from "../images/logo_3.png";
import logo from "../images/newLogo.png";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { warningAlertText } from "./Alert.js";
import { Navbar, Nav } from "react-bootstrap";

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
  /* box-shadow: inset 0px -1px 0px #f3f3f4; */
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;

  @media (max-width: 720px) {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 50px;
    left: 0;
    height: 100vh;
    width: 250px;
    background-color: rgb(251, 251, 251, 0.7);
    padding-top: 40px;
  }
`;

const NavItem = styled.a`
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
    text-decoration: none;
    color: black;
    font-weight: 600;
    color: #42a178;
  }
  @media (max-width: 720px) {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 15px 30px;
    &:hover {
      background-color: white;
      color: #3b3b3b;
      border-radius: 0;
    }
  }
`;

const LoginButton = styled.a`
  height: 32px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  padding: 5px 13px;
  margin-left: 30px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 30px;
  background-color: #57bc90;
  color: white;

  &:hover {
    line-height: 20px;
    text-decoration: none;
    background-color: #57bc90;
    color: white;
    font-weight: 600;
  }

  @media (max-width: 720px) {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 15px 30px;
    color: #3d3d3d;
    background-color: initial;
    &:hover {
      background-color: white;
      color: #3b3b3b;
      border-radius: 0;
    }
  }
`;

const MenuImage = styled.img`
  height: 20px;
  cursor: pointer;
`;

const LogoImage = styled.img`
  height: 40px;
  cursor: pointer;
`;

const Styles = styled.div`
  .navbar-toggler-icon {
    background-image: url(${menu});
    width: 20px;
    height: 20px;
  }
  .nav-items {
    padding: 8px 15px !important;
    :hover {
      color: #57bc90 !important;
      font-weight: 600;
    }
    @media (max-width: 991px) {
      padding: 15px 15px !important;
    }
  }
  .loginBtn {
    background-color: #57bc90;
    color: white !important;
    padding: 5px 15px !important;
    border-radius: 20px;
    @media (max-width: 991px) {
      background-color: inherit;
      color: rgba(0, 0, 0, 0.55) !important;
      padding: 15px 15px !important;
      :hover {
        color: #57bc90 !important;
        font-weight: 600;
      }
    }
  }
`;

const StyledNavItem = styled(Nav.Item)`
  color: #3d3d3d;
`;

const styles = {
  navItem: {
    color: "#3d3d3d",
  },
};

function Header() {
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
    userRole === 1
      ? history.push("/createEvent")
      : toast.warning(warningAlertText("請先登入機構帳號"), {
          position: toast.POSITION.TOP_CENTER,
        });
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
      <Styles>
        <HeaderContent>
          <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
            <Navbar.Brand>
              <LogoContainer className="ml-3">
                <LogoImage src={logo} onClick={handleLogoClick} />
              </LogoContainer>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Item>
                  <Nav.Link className="nav-items" onClick={handleEventsClick}>
                    我要當志工
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="nav-items"
                    onClick={handleCreateEventClick}
                  >
                    招募志工
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="nav-items"
                    onClick={handlePastEventsClick}
                  >
                    活動成果
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Nav>
                {isLogged === true ? (
                  <Nav.Link
                    onClick={handleProfileClick}
                    className="mr-3 loginBtn"
                  >
                    我的活動
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    onClick={() => handleLoginClick()}
                    className="mr-3 loginBtn"
                  >
                    登入 / 註冊
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </HeaderContent>
        {/* <HeaderContent>
        <NavContent>
          <LogoContainer>
            <LogoImage src={logo} onClick={handleLogoClick} />
          </LogoContainer>
          <NavItemsContainer id="navItemsContainer">
            <NavItem onClick={handleEventsClick}>我要當志工</NavItem>
            <NavItem onClick={handleCreateEventClick}>招募志工</NavItem>
            <NavItem onClick={handlePastEventsClick}>活動成果</NavItem>
            {isLogged === true ? (
              <LoginButton onClick={handleProfileClick}>我的活動</LoginButton>
            ) : (
              <LoginButton onClick={() => handleLoginClick()}>
                登入 / 註冊
              </LoginButton>
            )}
          </NavItemsContainer>
          <MenuContainer>
            <MenuImage src={menu} onClick={() => handleMenuClick()} />
          </MenuContainer>
        </NavContent>
      </HeaderContent> */}
        {renderLoginModal()}
      </Styles>
    </Container>
  );
}

export default Header;
