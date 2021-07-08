import React, { useEffect } from "react";
import styled from "styled-components";
import Profile from "./Profile";
import HosterEvents from "./HosterEvents";
import UserEvents from "./UserEvents";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 80px;
  min-height: calc(100vh);
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 20px;
  padding-bottom: 50px;

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
  const loading = useSelector((state) => state.isLogged.loading);
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!loading && role !== 0 && role !== 1) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [loading]);

  return (
    <Container
      className="container-xl"
      onClick={() => dispatch({ type: "SHOW_NAV", data: false })}
    >
      <Background />
      <Profile />
      {role === USER && <UserEvents />}
      {role === ORGANIZATION && <HosterEvents />}
    </Container>
  );
}

export default ProfilePage;
