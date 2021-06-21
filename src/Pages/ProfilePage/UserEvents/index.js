import React, { useState } from "react";
import styled from "styled-components";
import ApplyingEvents from "./ApplyingEvents";
import ConfirmedEvents from "./ConfirmedEvents";
import CompletedEvents from "./CompletedEvents";
import CancelledEvents from "./CancelledEvents";

const TabsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: white;
  padding-bottom: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);

  @media (max-width: 960px) {
    width: 90%;
  }
  @media (max-width: 540px) {
    width: 100%;
  }
`;

const Title = styled.div`
  width: 90%;
  font-size: 20px;
  line-height: 30px;
  margin: 0 auto;
  margin-top: 20px;
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
  background-color: white;
  display: flex;
  align-items: center;
  @media (max-width: 540px) {
    font-size: 14px;
    line-height: 16px;
    padding: 5px 10px;
    margin-right: 5px;
  }
`;

const TabActive = styled.div`
  font-size: 16px;
  line-height: 20px;
  margin-right: 10px;
  padding: 5px 15px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  background-color: #67aeca;
  color: white;
  cursor: pointer;
  @media (max-width: 540px) {
    font-size: 14px;
    line-height: 16px;
    padding: 5px 10px;
    margin-right: 5px;
  }
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

  const [participateStatus, setParticipateStatus] = useState("申請中");

  const handleTabClick = (tabId) => {
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
