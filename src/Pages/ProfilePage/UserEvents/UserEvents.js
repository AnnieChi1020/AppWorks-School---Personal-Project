import React, { useState } from "react";
import styled from "styled-components";
// import {
//   getUserEvents,
//   getCurrentStatus,
//   getEventInfo,
//   updateNewStatus,
// } from "../../../utils/firebase.js";
// import { useHistory } from "react-router-dom";
import ApplyingEvents from "./ApplyingEvents.js";
import ConfirmedEvents from "./ConfirmedEvents.js";
import CompletedEvents from "./CompletedEvents.js";
import CancelledEvents from "./CancelledEvents.js";
import { useSelector, useDispatch } from "react-redux";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

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
  /* border-bottom: 1px solid #ced4da; */
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

  const userId = useSelector((state) => state.isLogged.userId);
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

  // const updatePassedEvent = async () => {
  //   const confirmedEvents = await getUserEvents(userId, 1);
  //   confirmedEvents.map(async (eventId) => {
  //     const eventInfo = await getEventInfo(eventId);
  //     console.log(eventInfo);
  //     const startT = eventInfo.startTime.seconds * 1000;
  //     const currentT = new Date().getTime();
  //     console.log(startT, currentT);
  //     if (startT < currentT) {
  //       console.log("oh no");
  //       const currentStatus = await getCurrentStatus(eventId, userId);
  //       currentStatus.participantInfo.participantStatus = 2;
  //       console.log(currentStatus);
  //       updateNewStatus(eventId, userId, currentStatus);
  //     }
  //   });
  //   console.log(confirmedEvents);
  // };

  // updatePassedEvent();

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
        {/* <TabActive id="申請中" onClick={(e) => handleTabClick(e.target.id)}>
          申請中
        </TabActive>
        <Tab id="已報名" onClick={(e) => handleTabClick(e.target.id)}>
          已報名
        </Tab>
        <Tab id="已完成" onClick={(e) => handleTabClick(e.target.id)}>
          已完成
        </Tab>
        <Tab id="已取消" onClick={(e) => handleTabClick(e.target.id)}>
          已取消
        </Tab> */}
      </Tabs>
      {participateStatus === "申請中" && <ApplyingEvents />}
      {participateStatus === "已報名" && <ConfirmedEvents />}
      {participateStatus === "已完成" && <CompletedEvents />}
      {participateStatus === "已取消" && <CancelledEvents />}
    </TabsContainer>
  );
}

export default UserEvents;
