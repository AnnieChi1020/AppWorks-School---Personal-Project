import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PieChart } from "react-minimal-pie-chart";
import {
  getUserAttendedEvents,
  getEventInfo,
} from "../../../utils/firebase.js";

const ProfileSubContainer = styled.div`
  width: 100%;
  padding: 10px;
`;

const Text = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-top: 10px;
  text-align: left;
  margin-bottom: 10px;
`;

const PieChartMainContent = styled.div`
  width: 100%;
  @media (max-width: 960px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
  }
`;

const PieChartContainer = styled.div`
  width: 80%;
  max-width: 200px;
  margin: 0 auto;
  margin-top: 20px;
`;

const LabelsContainer = styled.div`
  width: 80%;
  max-width: 200px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const LabelContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ChartLabelIcon = styled.div`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`;

const ChartLabelText = styled.div`
  font-size: 12px;
  line-height: 16px;
`;

function Category(props) {
  const [pieChartData, setPieChartData] = useState([
    { title: "沒有活動", value: 1, color: "#e9ecef" },
  ]);

  const pieChartLabel = [
    { title: "社會福利", color: "#67aeca" },
    { title: "文化教育", color: "#57BC90" },
    { title: "環境保護", color: "#67caae" },
    { title: "生態保護", color: "#67c6ca" },
  ];

  const getCompletedEventIds = async () => {
    const completedEvents = await getUserAttendedEvents(props.userId);
    return completedEvents;
  };

  const getCompletedEventsInfo = async () => {
    const eventIdArray = await getCompletedEventIds();
    let dataMock = [
      { title: "社會福利", value: 0, color: "#67aeca" },
      { title: "文化教育", value: 0, color: "#57BC90" },
      { title: "環境保護", value: 0, color: "#67caae" },
      { title: "生態保護", value: 0, color: "#67c6ca" },
    ];

    if (eventIdArray.length === 0) {
      dataMock = [{ title: "沒有活動", value: 1, color: "#e9ecef" }];
    } else {
      await Promise.all(
        eventIdArray.map(async (id) => {
          const event = await getEventInfo(id);
          dataMock.forEach((type) => {
            if (event.eventTags.includes(type.title)) {
              type.value++;
            }
          });
          return null;
        })
      );
    }
    setPieChartData(dataMock);
    return dataMock;
  };

  useEffect(() => {
    getCompletedEventsInfo();
  }, [props.userId]);

  return (
    <ProfileSubContainer style={{ borderBottom: "1px solid #e7e7e9" }}>
      <Text>{`各類型志工活動參加比例 (已完成)`}</Text>
      <PieChartMainContent>
        <PieChartContainer>
          <PieChart
            data={pieChartData}
            lineWidth={50}
            paddingAngle={0.5}
            animate={true}
            radius={50}
            labelStyle={{
              fontSize: "6px",
              fontFamily: "sans-serif",
              fill: "#ffffff",
            }}
            labelPosition={75}
          />
        </PieChartContainer>
        <LabelsContainer>
          {pieChartLabel.map((label, index) => (
            <LabelContainer key={index}>
              <ChartLabelIcon style={{ backgroundColor: label.color }} />
              <ChartLabelText>{label.title}</ChartLabelText>
            </LabelContainer>
          ))}
        </LabelsContainer>
      </PieChartMainContent>
    </ProfileSubContainer>
  );
}

export default Category;
