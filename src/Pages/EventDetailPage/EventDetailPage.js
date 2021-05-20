import styled from "styled-components";
import EventSignUp from "./SignUp.js";
import Detail from "./Detail.js";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 70px;
`;

function EventDetail() {
  return (
    <Wrapper>
      <Detail />
      <EventSignUp />
    </Wrapper>
  );
}

export default EventDetail;
