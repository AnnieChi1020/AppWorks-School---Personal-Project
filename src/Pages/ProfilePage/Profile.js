/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserProfile,
  userSignOut,
  getUserAttendedEvents,
  getUserEvents,
} from "../../utils/firebase.js";
import { useSelector, useDispatch } from "react-redux";
import user from "../../images/user.png";
import userImg from "../../images/user-100.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router";

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const ProfileDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px 0;
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  /* border-bottom: solid 1px #979797; */
  padding: 15px 8px;
  background-color: white;
`;

const LevelTextContainer = styled.div`
  width: 90%;
  font-size: 12px;
  line-height: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 5px;
  color: #4f4f4f;
`;

const LevelBarContainer = styled.div`
  width: 90%;
  height: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 15px;
`;

const LevelBarFirst = styled.div`
  width: 100%;
  height: 100%;
  background-color: #05c3dd;
`;

const LevelBarSecond = styled.div`
  width: 100%;
  height: 100%;
  background-color: #00a9ce;
`;

const LevelBarThird = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0092bc;
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin: 20px;
  border-radius: 50%;
  background-color: grey;
`;

const ProfileDetial = styled.div`
  margin: 10px;
`;

const ProfileName = styled.div`
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const ProfileText = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-top: 5px;
`;

const Button = styled.button`
  margin: 0 auto;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #e9e9e9b3;
  color: #2e2e2f;
  font-size: 14px;
  line-height: 20px;
  padding: 5px 15px;
`;

function Profile() {
  const id = useSelector((state) => state.isLogged.userId);
  const role = useSelector((state) => state.isLogged.userRole);

  const [userId, setUserId] = useState("");

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
      alert("已登出");
      history.push("/");
    }
  };

  useEffect(() => {
    getUserData();
  }, [userId]);

  const getAttendedEventsNumber = async (id) => {
    console.log(id);
    const attendedEvents = await getUserAttendedEvents(id);
    console.log(attendedEvents);
    return attendedEvents.length;
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <ProfileContainer>
      <ProfileDiv>
        {userData.userPhoto ? (
          <ProfileImg src={userData.photo} />
        ) : (
          <ProfileImg src={userImg} />
        )}
        <ProfileDetial>
          {role === 0 ? (
            <div>
              <LevelTextContainer>
                <div>
                  {`志工初心者 `}
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div>
                  {`志工初心者 `}
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div>
                  {`志工達人 `}
                  <FontAwesomeIcon icon={faStar} />
                </div>
              </LevelTextContainer>
              <LevelBarContainer>
                <LevelBarFirst></LevelBarFirst>
                <LevelBarSecond></LevelBarSecond>
                <LevelBarThird></LevelBarThird>
              </LevelBarContainer>
            </div>
          ) : (
            <div />
          )}

          <ProfileName>{`哈囉，${userData.name}`}</ProfileName>
          {role === 0 ? (
            <div>
              <ProfileText>{`您目前是 志工初心者`}</ProfileText>
              <ProfileText>{`您已經參加了 ${userData.attendedNum} 場志工活動`}</ProfileText>
            </div>
          ) : (
            <div />
          )}
        </ProfileDetial>
        <Button onClick={handleLogoutButton}>登出</Button>
      </ProfileDiv>
    </ProfileContainer>
  );
}

export default Profile;
