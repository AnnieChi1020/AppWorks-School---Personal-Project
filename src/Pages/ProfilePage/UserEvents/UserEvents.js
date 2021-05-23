import React, { useState } from "react";
import styled from "styled-components";
import ApplyingEvents from "./ApplyingEvents.js";
import ConfirmedEvents from "./ConfirmedEvents.js";
import CompletedEvents from "./CompletedEvents.js";
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
`;

function UserEvents() {
  const [tabs, setTabs] = useState([
    {
      name: "申請中",
      selected: true,
    },
    {
      name: "已報名",
      selected: false,
    },
    {
      name: "已完成",
      selected: false,
    },
    {
      name: "已取消",
      selected: false,
    },
  ]);

  // const userId = useSelector((state) => state.isLogged.userId);
  const [participateStatus, setParticipateStatus] = useState("申請中");

  const handleTabClick = (tabId) => {
    console.log(tabId);
    setParticipateStatus(tabId);
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
      <Title>我報名的活動</Title>
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
      {participateStatus === "申請中" && <ApplyingEvents />}
      {participateStatus === "已報名" && <ConfirmedEvents />}
      {participateStatus === "已完成" && <CompletedEvents />}
      {participateStatus === "已取消" && <CancelledEvents />}
    </TabsContainer>
  );
}

export default UserEvents;
