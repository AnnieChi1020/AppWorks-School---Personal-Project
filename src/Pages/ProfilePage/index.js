import React from "react";
import styled from "styled-components";
import Profile from "./Profile.js";
import HosterEvents from "./HosterEvents/HosterEvents.js";
import UserEvents from "./UserEvents/UserEvents.js";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 80px;
  min-height: calc(100vh - 200px);
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 20px;

  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
    grid-gap: 0px;
  }
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #80808012;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

function ProfilePage() {
  const USER = 0;
  const ORGANIZATION = 1;

  const role = useSelector((state) => state.isLogged.userRole);
  const history = useHistory();

  const dispatch = useDispatch();

  const renderEventsData = () => {
    if (role === USER) {
      return <UserEvents />;
    } else if (role === ORGANIZATION) {
      return <HosterEvents />;
    } else {
      history.push("/");
    }
  };

  return (
    <Container
      className="container-xl"
      onClick={() => dispatch({ type: "SHOW_NAV", data: false })}
    >
      <Background></Background>
      <Profile />
      {renderEventsData()}
    </Container>
  );
}

export default ProfilePage;
