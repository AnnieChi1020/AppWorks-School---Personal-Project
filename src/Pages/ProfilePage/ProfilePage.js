import styled from "styled-components";
import Profile from "./Profile.js";
import HosterEvents from "./HosterEvents/HosterEvents.js";
import UserEvents from "./UserEvents/UserEvents.js";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-bottom: 100px;
`;

function ProfilePage() {
  return (
    <Wrapper>
      <Profile />
      <HosterEvents />
      <UserEvents />
    </Wrapper>
  );
}

export default ProfilePage;
