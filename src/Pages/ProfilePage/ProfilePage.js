import styled from "styled-components";
import Profile from "./Profile.js";
import HosterEvents from "./HosterEvents/HosterEvents.js";
import UserApplyingEvents from "./UserEvents/UserApplyingEvents.js";


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

function ProfilePage() {
  return (
    <Wrapper>
      <Profile />
      <HosterEvents />
      <UserApplyingEvents/>
    </Wrapper>
  );
}

export default ProfilePage;
