import React, { useState } from "react";
import styled from "styled-components";
// import { getHosterEvents } from "../../../utils/firebase.js";
// import { useHistory } from "react-router-dom";
import ActiveEvents from "./ActiveEvents.js";
import ClosedEvents from "./ClosedEvents.js";
import CancelledEvents from "./CancelledEvents.js";

const TabsContainer = styled.div`
  width: 90%;
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
  margin-bottom: 20px;
  font-weight: bold;
`;

const Tabs = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const Tab = styled.div`
  font-size: 16px;
  line-height: 20px;
  margin-right: 10px;
  padding: 5px 15px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  cursor: pointer;
`;

const TabActive = styled.div`
  font-size: 16px;
  line-height: 20px;
  margin-right: 10px;
  padding: 5px 15px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  background-color: #1190cb;
  color: white;
  cursor: pointer;
`;

function HosterEvents() {
  const [eventStatus, setEventStatus] = useState("招募中");
  const [tabs, setTabs] = useState([
    {
      name: "招募中",
      selected: true,
    },
    {
      name: "已結束",
      selected: false,
    },
    {
      name: "已取消",
      selected: false,
    },
  ]);

  const handleTabClick = (tabId) => {
    setEventStatus(tabId);
    let currentTabs = tabs;
    currentTabs.map((tab) => {
      if (tab.name === tabId) {
        tab.selected = true;
      } else {
        tab.selected = false;
      }
      return null;
    });
    setTabs(currentTabs);
  };

  return (
    <TabsContainer>
      <Title>我的志工活動</Title>
      <Tabs>
        {tabs.map((tab, index) =>
          tab.selected === false ? (
            <Tab
              key={index}
              id={tab.name}
              onClick={(e) => handleTabClick(e.target.id)}
            >
              {tab.name}
            </Tab>
          ) : (
            <TabActive
              key={index}
              id={tab.name}
              onClick={(e) => handleTabClick(e.target.id)}
            >
              {tab.name}
            </TabActive>
          )
        )}
      </Tabs>
      {eventStatus === "招募中" && <ActiveEvents />}
      {eventStatus === "已結束" && <ClosedEvents />}
      {eventStatus === "已取消" && <CancelledEvents />}
    </TabsContainer>
  );
}

export default HosterEvents;
