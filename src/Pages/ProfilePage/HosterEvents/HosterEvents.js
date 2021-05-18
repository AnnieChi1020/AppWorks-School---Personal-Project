import React, { useState } from "react";
import styled from "styled-components";
// import { getHosterEvents } from "../../../utils/firebase.js";
// import { useHistory } from "react-router-dom";
import ActiveEvents from "./ActiveEvents.js";
import ClosedEvents from "./ClosedEvents.js";
import CancelledEvents from "./CancelledEvents.js";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Title = styled.div`
  width: 90%;
  font-size: 20px;
  line-height: 30px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Tabs = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-bottom: 5px;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const Tab = styled.div`
  font-size: 16px;
  line-height: 20px;
  padding-right: 20px;
`;

function HosterEvents() {
  const [eventStatus, setEventStatus] = useState("招募中");

  const handleTabClick = (status) => {
    setEventStatus(status);
  };

  return (
    <Wrapper>
      <Title>我主辦的活動</Title>
      <Tabs>
        <Tab value="招募中" onClick={(e) => handleTabClick(e.target.innerHTML)}>
          招募中
        </Tab>
        <Tab value="已結束" onClick={(e) => handleTabClick(e.target.innerHTML)}>
          已結束
        </Tab>
        <Tab value="已取消" onClick={(e) => handleTabClick(e.target.innerHTML)}>
          已取消
        </Tab>
      </Tabs>
      {eventStatus === "招募中" && <ActiveEvents />}
      {eventStatus === "已結束" && <ClosedEvents />}
      {eventStatus === "已取消" && <CancelledEvents />}
    </Wrapper>
  );
}

export default HosterEvents;
