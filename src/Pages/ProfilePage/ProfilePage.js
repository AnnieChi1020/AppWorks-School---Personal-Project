import styled from "styled-components";
import Profile from "./Profile.js";
import HosterEvents from "./HosterEvents/HosterEvents.js";
import UserEvents from "./UserEvents/UserEvents.js";
import { useSelector, useDispatch } from "react-redux";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 70px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-bottom: 100px;
`;

function ProfilePage() {
  const role = useSelector((state) => state.isLogged.userRole);

  return (
    <Container className="container-xl mb-5">
      {/* <Wrapper> */}
      <Profile />
      {role === 1 ? <HosterEvents /> : <div />}
      {role === 0 ? <UserEvents /> : <div />}

      {/* </Wrapper> */}
    </Container>
  );
}

export default ProfilePage;
