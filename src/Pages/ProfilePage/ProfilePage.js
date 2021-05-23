import styled from "styled-components";
import Profile from "./Profile.js";
import HosterEvents from "./HosterEvents/HosterEvents.js";
import UserEvents from "./UserEvents/UserEvents.js";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory, Redirect } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 70px;
`;

function ProfilePage() {
  // const isLogged = useSelector((state) => state.isLogged.isLogged);
  const role = useSelector((state) => state.isLogged.userRole);

  return (
    <Container className="container-xl mb-5">
      <Profile />
      {role === 1 ? <HosterEvents /> : <div />}
      {role === 0 ? <UserEvents /> : <div />}
    </Container>
  );
}

export default ProfilePage;
