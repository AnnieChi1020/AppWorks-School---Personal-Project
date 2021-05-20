import styled from "styled-components";
// import Signup from "./SignUp.js";
import Detail from "./Detail.js";
// import { useSelector, useDispatch } from "react-redux";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
`;

function EventDetail() {
  return (
    <Container className="container-xl">
      <Detail />
      {/* <Signup /> */}
    </Container>
  );
}

export default EventDetail;
