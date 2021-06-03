import styled from "styled-components";
import Events from "./Events.js";
// import { useSelector, useDispatch } from "react-redux";
// import { getAuthStateChange } from "../../utils/firebase.js";
import { useEffect } from "react";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
  min-height: calc(100vh - 200px);
`;

const Background = styled.div`
  height: calc(100vh - 70px);
  width: 100%;
  background-color: #fffaee;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

function EventsPage() {
  // const logStatus = useSelector((state) => state.isLogged);
  // const dispatch = useDispatch();

  const checkLogingStatus = async () => {
    // const userId = await getAuthStateChange();
    // if (userId) {
    //   dispatch({ type: "SIGN_IN", data: true });
    //   dispatch({ type: "GET_USERID", data: userId });
    // } else {
    // }
  };

  useEffect(() => {
    checkLogingStatus();
  }, []);

  return (
    <Container className="container-xl mb-5">
      <Background />
      <Events />
    </Container>
  );
}

export default EventsPage;
