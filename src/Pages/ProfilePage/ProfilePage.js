import React from "react";
import styled from "styled-components";
import Profile from "./Profile.js";
import HosterEvents from "./HosterEvents/HosterEvents.js";
import UserEvents from "./UserEvents/UserEvents.js";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 80px;
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: row;
  @media (max-width: 960px) {
    flex-direction: column;
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
  const role = useSelector((state) => state.isLogged.userRole);
  const history = useHistory();

  const renderEventsData = () => {
    if (role === 0) {
      return <UserEvents />;
    } else if (role === 1) {
      return <HosterEvents />;
    }
    // else {
    //   history.push("/");
    // }
  };

  return (
    <Container className="container-xl">
      <Background></Background>
      <Profile />
      {renderEventsData()}
    </Container>
  );
}

export default ProfilePage;
