import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserProfile } from "../../utils/firebase.js";
import { useSelector } from "react-redux";
import user from "../../images/user.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { Card, Row, Col } from "react-bootstrap";
// import { useHistory } from "react-router-dom";

const ProfileContainer = styled.div`
  width: 90%;
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
  border-radius: 8px;
  border: solid 1px #979797;
  padding: 0 4px;
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
`;

const ProfileText = styled.div`
  font-size: 14px;
  line-height: 20px;
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
  const userId = useSelector((state) => state.isLogged.userId);
  const [userData, setUserData] = useState("");

  const getUserData = async () => {
    const data = await getUserProfile(userId);
    setUserData(data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <ProfileContainer>
      <ProfileDiv>
        {userData.userPhoto ? (
          <ProfileImg src={userData.userPhoto} />
        ) : (
          <ProfileImg src={user} />
        )}
        <ProfileDetial>
          <ProfileName>{userData.userName}</ProfileName>
          <ProfileText>{userData.userEmail}</ProfileText>
        </ProfileDetial>
        <Button>登出</Button>
      </ProfileDiv>
    </ProfileContainer>
  );
}

export default Profile;
