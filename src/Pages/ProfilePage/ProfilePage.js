import styled from "styled-components";
import MyEvents from "./MyEvents.js";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

function ProfilePage() {
  return (
    <Wrapper>
      Hello
      <MyEvents></MyEvents>
    </Wrapper>
  );
}

export default ProfilePage;
