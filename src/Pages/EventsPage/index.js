import styled from "styled-components";
import Events from "./Events.js";
import { useSelector, useDispatch } from "react-redux";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 70px;
`;

function EventsPage() {
  const logStatus = useSelector((state) => state.isLogged);
  console.log(logStatus);

  return (
    <Container className="container-xl">
      <Events />
    </Container>
  );
}

export default EventsPage;
