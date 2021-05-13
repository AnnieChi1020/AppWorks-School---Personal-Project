import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMyEvents } from "../../utils/firebase.js";

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

function MyEvents() {
  // const hosterId = "H0001";
  // let [events, setEvents] = useState({});

  // useEffect(() => {
  //   async function getEvents() {
  //     const data = await getMyEvents(hosterId);
  //     console.log(data);
  //   }
  //   getEvents();
  // }, []);

  return <Wrapper></Wrapper>;
}

export default MyEvents;
