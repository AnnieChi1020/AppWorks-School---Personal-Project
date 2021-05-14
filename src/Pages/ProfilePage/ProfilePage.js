import styled from "styled-components";
import HosterEvents from "./HosterEvents.js";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
`;

function ProfilePage() {
  return (
    <Wrapper>
      <HosterEvents></HosterEvents>
    </Wrapper>
  );
}

export default ProfilePage;
