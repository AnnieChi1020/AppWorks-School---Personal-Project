import styled from "styled-components";
import Events from "./Events.js";
import { useSelector, useDispatch } from "react-redux";
import { getAuthStateChange } from "../../utils/firebase.js";
import { useEffect } from "react";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 70px;
`;

function EventsPage() {
  const logStatus = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();
  console.log(logStatus);

  const checkLogingStatus = async () => {
    const userId = await getAuthStateChange();
    console.log(userId);
    // if (userId) {
    //   console.log(userId);
    //   dispatch({ type: "SIGN_IN", data: true });
    //   dispatch({ type: "GET_USERID", data: userId });
    // } else {
    //   console.log("noooo");
    // }
  };

  useEffect(() => {
    checkLogingStatus();
  }, []);

  return (
    <Container className="container-xl">
      <Events />
    </Container>
  );
}

export default EventsPage;
