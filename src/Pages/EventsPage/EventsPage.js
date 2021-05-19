import styled from "styled-components";
import Events from "./Events.js";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 70px;
`;

function EventsPage() {
  return (
    <Wrapper>
      <Events />
    </Wrapper>
  );
}

export default EventsPage;
