import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserProfile,
  userSignOut,
  getUserAttendedEvents,
} from "../../../utils/firebase.js";
import user from "../../../images/user-100.svg";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { signOutAlertText } from "../../../components/Alert.js";
import Level from "./Level.js";
import Category from "./Category.js";

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

const UserProfileHeader = styled.div`
  position: absolute;
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  background-color: #67aecaa6;
  border-radius: 10px 10px 0 0;
`;

const OrgProfileHeader = styled(UserProfileHeader)`
  background-color: #c7d8c6;
`;

const MainContent = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  z-index: 1;
  border-bottom: 1px solid #e7e7e9;
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

const ProfileName = styled.div`
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const LevelText = styled.div`
  width: 80px;
  margin: 0 auto;
  font-size: 12px;
  line-height: 16px;
  padding: 3px;
  border: 1px solid #67aeca;
  border-radius: 5px;
  color: #5c99b1;
`;

const UserLogoutButton = styled.button`
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

const HosterLogoutButton = styled.button`
  width: 80px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 18px;
  padding: 3px;
  border: 1px solid #9ab898;
  border-radius: 5px;
  color: #81997f;
  background-color: white;
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

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogoutButton = async () => {
    const logout = await userSignOut();
    if (logout) {
      dispatch({ type: "SIGN_IN", data: false });
      dispatch({ type: "GET_USERID", data: "" });
      dispatch({ type: "GET_USERROLE", data: "" });

      toast.info(signOutAlertText("已登出"), {
        position: toast.POSITION.TOP_CENTER,
      });

      history.push("/");
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [userData.attendedNum]);

  const levelProps = {
    userData: userData,
  };

  const categoryProps = {
    userId: userId,
  };

  return (
    <Container>
      {role === 0 || role === 1 ? (
        <ProfileDiv>
          {role === 0 ? <UserProfileHeader /> : <OrgProfileHeader />}
          <MainContent>
            <ProfileSubContainer>
              <ProfileImg src={user} alt="userIcon" />
            </ProfileSubContainer>
            <ProfileSubContainer>
              <ProfileName>{`哈囉，${userData.name}`}</ProfileName>
              {role === 0 && <LevelText>{levelStatus.current.name}</LevelText>}
            </ProfileSubContainer>
            {role === 0 && <Level {...levelProps} />}
            {role === 0 && <Category {...categoryProps} />}
          </MainContent>
          {role === 0 ? (
            <UserLogoutButton onClick={handleLogoutButton}>
              登出
            </UserLogoutButton>
          ) : (
            <HosterLogoutButton onClick={handleLogoutButton}>
              登出
            </HosterLogoutButton>
          )}
        </ProfileDiv>
      ) : null}
    </Container>
  );
}

export default Profile;
