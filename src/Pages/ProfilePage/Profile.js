/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserProfile,
  userSignOut,
  getUserAttendedEvents,
  getUserEvents,
  getEventInfo,
} from "../../utils/firebase.js";
import { useSelector, useDispatch } from "react-redux";
import userImg from "../../images/user-100.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { PieChart } from "react-minimal-pie-chart";
import { ProgressBar } from "react-bootstrap";

const Container = styled.div`
  width: 300px;
  height: 100%;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-right: 20px;
  @media (max-width: 960px) {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  @media (max-width: 540px) {
    width: 100%;
  }
`;

const ProfileDiv = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 15px 20px;
  background-color: white;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ProfileHeader = styled.div`
  position: absolute;
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  background-color: #67aecaa6;
  border-radius: 10px 10px 0 0;
`;

const MainContent = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  z-index: 1;
  @media (max-width: 960px) {
    width: 90%;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const ProfileSubContainer = styled.div`
  width: 100%;
  padding: 10px;
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  background-color: grey;
  @media (max-width: 760px) {
    margin: 0 auto;
  }
`;

// const ProfileDetial = styled.div`
//   margin: 10px;
//   text-align: left;
//   @media (max-width: 960px) {
//     width: 90%;
//     min-width: 300px;
//     margin: 0 auto;
//   }
// `;

const ProfileName = styled.div`
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
`;

const LevelText = styled.div`
  width: 80px;
  margin: 0 auto;
  margin-top: 10px;
  font-size: 12px;
  line-height: 16px;
  padding: 3px;
  border: 1px solid #67aeca;
  border-radius: 5px;
  color: #5c99b1;
`;

const Text = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-top: 10px;
  text-align: left;
  margin-bottom: 10px;
`;

const LevelBarData = styled.div`
  font-size: 18px;
  line-height: 20px;
  text-align: left;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  color: #5d5d5d;
  align-items: center;
`;

const AttendNum = styled.div`
  font-size: 20px;
  line-height: 20px;
  font-weight: 700;
  color: #5d5d5d;
  vertical-align: baseline;
  display: flex;
  align-items: baseline;
  /* margin-left: 5px; */
  margin-right: 5px;
`;

const Text2 = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-top: 10px;
  text-align: left;
  margin-bottom: 10px;
  color: #8a8a8a;
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

const Button = styled.button`
  width: 80px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 18px;
  padding: 3px;
  border: 1px solid #67aeca;
  border-radius: 5px;
  color: #5c99b1;
  background-color: white;
`;

const Styles = styled.div`
  .progress {
    border-radius: 20px;
  }
  .progress-bar {
    background-color: #48add5;
    border-radius: 20px;
  }
`;

function Profile() {
  const id = useSelector((state) => state.isLogged.userId);
  const role = useSelector((state) => state.isLogged.userRole);

  const [userId, setUserId] = useState("");
  const [levelStatus, setLevelStatus] = useState({
    current: {
      name: "",
      number: "",
    },
    target: {
      name: "",
      number: "",
    },
  });

  const [pieChartData, setPieChartData] = useState([
    { title: "社會福利", value: 0, color: "#67aeca" },
    { title: "文化教育", value: 0, color: "#57BC90" },
    { title: "環境保護", value: 0, color: "#67caae" },
    { title: "生態保護", value: 0, color: "#67c6ca" },
  ]);

  const levels = [
    { name: "志工小菜鳥", number: 0 },
    { name: "志工小達人", number: 5 },
    { name: "志工王中王", number: 10 },
    { name: "志工網主人", number: 100 },
  ];

  useEffect(() => {
    setUserId(id);
  }, [id]);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    photo: "",
    attendedNum: "",
  });

  const getUserData = async () => {
    if (userId) {
      const data = await getUserProfile(userId);
      const number = await getAttendedEventsNumber(userId);
      data.role === 0
        ? setUserData({
            ...userData,
            name: data.userName,
            email: data.userEmail,
            photo: data.userPhoto,
            attendedNum: number,
          })
        : setUserData({
            ...userData,
            name: data.orgName,
            email: data.orgEmail,
            photo: data.orgPhoto,
          });
    }
  };

  useEffect(() => {}, [userData]);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogoutButton = async () => {
    const logout = await userSignOut();
    if (logout) {
      dispatch({ type: "SIGN_IN", data: false });
      dispatch({ type: "GET_USERID", data: "" });
      dispatch({ type: "GET_USERROLE", data: "" });
      alert("已登出");
      history.push("/");
    }
  };

  useEffect(() => {
    getUserData();
  }, [userId]);

  const getAttendedEventsNumber = async (id) => {
    const attendedEvents = await getUserAttendedEvents(id);
    return attendedEvents.length;
  };

  useEffect(() => {
    if (userData.attendedNum < 5) {
      setLevelStatus({
        ...levelStatus,
        current: { number: userData.attendedNum, name: levels[0].name },
        target: { number: levels[1].number, name: levels[1].name },
      });
    } else if (userData.attendedNum < 10) {
      setLevelStatus({
        ...levelStatus,
        current: { number: userData.attendedNum, name: levels[1].name },
        target: { number: levels[2].number, name: levels[2].name },
      });
    } else if (userData.attendedNum < 100) {
      setLevelStatus({
        ...levelStatus,
        current: { number: userData.attendedNum, name: levels[2].name },
        target: { number: levels[3].number, name: levels[3].name },
      });
    }
  }, [userData.attendedNum]);

  const checkEventPassed = (event) => {
    const startT = event.startTime.seconds * 1000;
    const currentT = new Date().getTime();
    const eventPassed = startT < currentT;
    return eventPassed;
  };

  const getCompletedEventIds = async () => {
    const applyingEvents = await getUserEvents(userId, 1);
    return applyingEvents;
  };

  const getCompletedEventsInfo = async () => {
    const eventIdArray = await getCompletedEventIds();
    let dataMock = [
      { title: "社會福利", value: 0, color: "#67aeca" },
      { title: "文化教育", value: 0, color: "#57BC90" },
      { title: "環境保護", value: 0, color: "#67caae" },
      { title: "生態保護", value: 0, color: "#67c6ca" },
    ];

    await Promise.all(
      eventIdArray.map(async (id) => {
        const event = await getEventInfo(id);
        if (checkEventPassed(event)) {
          dataMock.forEach((type) => {
            if (event.eventTags.includes(type.title)) {
              type.value++;
              return;
            } else {
              return;
            }
          });
        }
      })
    );
    setPieChartData(dataMock);
    console.log(dataMock);
    return dataMock;
  };

  useEffect(() => {
    console.log(getCompletedEventsInfo());
  }, [userId]);

  useEffect(() => {
    console.log(pieChartData);
  }, [pieChartData]);

  const renderLevelData = () => {
    return (
      <ProfileSubContainer style={{ borderBottom: "1px solid #e7e7e9" }}>
        <Text>{`目前參與的志工活動數`}</Text>
        <LevelBarData>
          <AttendNum>{userData.attendedNum}</AttendNum>
          <FontAwesomeIcon icon={faStar} />
        </LevelBarData>
        <ProgressBar
          now={(levelStatus.current.number / levelStatus.target.number) * 100}
        />
        <Text2>{`再累積 ${
          levelStatus.target.number - levelStatus.current.number
        } 場活動就可成為 ${levelStatus.target.name}`}</Text2>
      </ProfileSubContainer>
    );
  };

  const renderCategoryData = () => {
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
              // label={({ dataEntry }) => `${dataEntry.value}`}
              labelStyle={{
                fontSize: "6px",
                fontFamily: "sans-serif",
                fill: "#ffffff",
              }}
              labelPosition={75}
            />
          </PieChartContainer>
          <LabelsContainer>
            {pieChartData.map((label, index) => (
              <LabelContainer>
                <ChartLabelIcon style={{ backgroundColor: label.color }} />
                <ChartLabelText>{label.title}</ChartLabelText>
              </LabelContainer>
            ))}
          </LabelsContainer>
        </PieChartMainContent>
      </ProfileSubContainer>
    );
  };

  return (
    <Container>
      <Styles>
        <ProfileDiv>
          <ProfileHeader />
          <MainContent>
            <ProfileSubContainer>
              {userData.userPhoto ? (
                <ProfileImg src={userData.photo} />
              ) : (
                <ProfileImg src={userImg} />
              )}
            </ProfileSubContainer>
            <ProfileSubContainer>
              <ProfileName>{`哈囉，${userData.name}`}</ProfileName>
              <LevelText>{levelStatus.current.name}</LevelText>
            </ProfileSubContainer>
            {role === 0 && renderLevelData()}
            {role === 0 && renderCategoryData()}
          </MainContent>
          <Button onClick={handleLogoutButton}>登出</Button>
        </ProfileDiv>
      </Styles>
    </Container>
  );
}

export default Profile;
