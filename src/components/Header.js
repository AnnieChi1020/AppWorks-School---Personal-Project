import styled from "styled-components";
import React from "react";
import Login from "./Login";
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

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 720px) {
    margin: 0 auto;
  }
`;

const LogoImage = styled.img`
  height: 40px;
  cursor: pointer;
`;

const StyledNavLink = styled(Nav.Link)`
  padding: 8px 15px !important;
  :hover {
    color: #57bc90 !important;
    font-weight: 600;
  }
  @media (max-width: 991px) {
    padding: 15px 15px !important;
  }
`;

const StyledLoginButton = styled(Nav.Link)`
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
`;

const Styles = styled.div`
  .navbar-toggler-icon {
    background-image: url(${menu});
    width: 20px;
    height: 20px;
  }
`;

function Header() {
  const isLogged = useSelector((state) => state.isLogged.isLogged);
  const userRole = useSelector((state) => state.isLogged.userRole);
  const loginModal = useSelector((state) => state.modal.login);
  const expanded = useSelector((state) => state.expanded.collapseNav);

  const dispatch = useDispatch();

  const history = useHistory();

  const switchPage = (page) => {
    dispatch({ type: "SHOW_NAV", data: false });
    setTimeout(function () {
      history.push(`${page}`);
    }, 1000);
  };

  const handleLogoClick = () => {
    switchPage("/");
  };

  const handleEventsClick = () => {
    switchPage("/events");
  };

  const handlePastEventsClick = () => {
    switchPage("/pastEvents");
  };

  const handleCreateEventClick = () => {
    dispatch({ type: "SHOW_NAV", data: false });
    userRole === 1
      ? setTimeout(function () {
          history.push("/createEvent");
        }, 1000)
      : toast.warning(warningAlertText("請先登入機構帳號"), {
          position: toast.POSITION.TOP_CENTER,
        });
  };

  const handleProfileClick = () => {
    switchPage("/profile");
  };

  const handleLoginClick = () => {
    dispatch({ type: "SHOW_NAV", data: false });
    dispatch({ type: "LOGIN", data: !loginModal });
  };

  const handleToggleClick = () => {
    dispatch({ type: "SHOW_NAV", data: !expanded });
  };

  return (
    <Container>
      <Styles>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="white"
          variant="light"
          fixed="top"
          expanded={expanded}
        >
          <Navbar.Brand eventkey="0">
            <LogoContainer className="ml-3">
              <LogoImage src={logo} eventkey="0" onClick={handleLogoClick} />
            </LogoContainer>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={handleToggleClick}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item>
                <StyledNavLink eventkey="1" onClick={handleEventsClick}>
                  我要當志工
                </StyledNavLink>
              </Nav.Item>
              <Nav.Item>
                <StyledNavLink eventkey="2" onClick={handleCreateEventClick}>
                  招募志工
                </StyledNavLink>
              </Nav.Item>
              <Nav.Item>
                <StyledNavLink eventkey="3" onClick={handlePastEventsClick}>
                  活動成果
                </StyledNavLink>
              </Nav.Item>
            </Nav>

            <Nav>
              {isLogged ? (
                <StyledLoginButton
                  onClick={handleProfileClick}
                  eventkey="4"
                  className="mr-3"
                >
                  我的活動
                </StyledLoginButton>
              ) : (
                <StyledLoginButton
                  onClick={() => handleLoginClick()}
                  className="mr-3"
                >
                  登入 / 註冊
                </StyledLoginButton>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {loginModal ? <Login></Login> : <div />}
      </Styles>
    </Container>
  );
}

export default Header;
