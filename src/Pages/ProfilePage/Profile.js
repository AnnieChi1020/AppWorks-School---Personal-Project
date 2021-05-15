import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserProfile } from "../../utils/firebase.js";
// import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
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
  grid-template-columns: 1fr 5fr 1fr;
  align-items: center;
  justify-content: space-around;
  border-radius: 8px;
  border: solid 1px #979797;
  padding: 0 4px;
`;

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 10px;
`;

const ProfileDetial = styled.div`
  margin: 10px;
`;

const ProfileText = styled.div`
  font-size: 14px;
  line-height: 20px;
`;

const Button = styled.button`
  width: 80px;
  height: 30px;
`;

function Profile() {
  const userId = "U0001";
  const [userData, setUserData] = useState("");

  const getUserData = async () => {
    const data = await getUserProfile(userId);
    setUserData(data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Wrapper>
      <ProfileDiv>
        <ProfileImg src={userData.userPhoto} />
        <ProfileDetial>
          <ProfileText>{userData.userName}</ProfileText>
          <ProfileText>{userData.userEmail}</ProfileText>
        </ProfileDetial>
        <Button>登出</Button>
      </ProfileDiv>
    </Wrapper>
  );
}

export default Profile;
