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
  /* position: fixed;
  top: 0;
  left: 0;
  z-index: 5; */
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

function Header() {
  const isLogged = useSelector((state) => state.isLogged.isLogged);
  const userRole = useSelector((state) => state.isLogged.userRole);
  const loginModal = useSelector((state) => state.modal.login);
  const expanded = useSelector((state) => state.expanded.collapseNav);

  // const [expanded, setExpanded] = useState("false");

  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogoClick = () => {
    dispatch({ type: "SHOW_NAV", data: false });
    setTimeout(function () {
      history.push("/");
    }, 1000);
  };

  const handleEventsClick = () => {
    dispatch({ type: "SHOW_NAV", data: false });
    setTimeout(function () {
      history.push("/events");
    }, 1000);
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

  const handlePastEventsClick = () => {
    dispatch({ type: "SHOW_NAV", data: false });
    setTimeout(function () {
      history.push("/pastEvents");
    }, 1000);
  };

  const handleProfileClick = () => {
    dispatch({ type: "SHOW_NAV", data: false });
    setTimeout(function () {
      history.push("/profile");
    }, 1000);
  };

  const handleLoginClick = () => {
    dispatch({ type: "SHOW_NAV", data: false });
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
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="white"
          variant="light"
          fixed="top"
          expanded={expanded}
          // onToggle={ setExpanded(expanded ? false : true)}
        >
          <Navbar.Brand eventKey="0">
            <LogoContainer className="ml-3">
              <LogoImage src={logo} eventKey="0" onClick={handleLogoClick} />
            </LogoContainer>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() =>
              dispatch({ type: "SHOW_NAV", data: expanded ? false : true })
            }
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item>
                <Nav.Link
                  className="nav-items"
                  eventKey="1"
                  onClick={handleEventsClick}
                >
                  我要當志工
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="nav-items"
                  eventKey="2"
                  onClick={handleCreateEventClick}
                >
                  招募志工
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="nav-items"
                  eventKey="3"
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
                  eventKey="4"
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

        {renderLoginModal()}
      </Styles>
    </Container>
  );
}

export default Header;
