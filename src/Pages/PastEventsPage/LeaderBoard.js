import styled from "styled-components";
import React, { useEffect, useState } from "react";
import userImg from "../../images/user-100.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { getAllUsers, getUserAttendedEvents } from "../../utils/firebase.js";

const LeaderBoardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 20px;
`;

const LeaderBoardDiv = styled.div`
  width: 100%;
  padding: 20px 10px;
  background-color: white;
  border-radius: 10px;
`;

const MainContent = styled.div`
  padding: 5px 10px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: #3b3b3b;
  padding: 0px 5px 8px 5px;
  margin: 0 auto;
  margin-bottom: 10px;
  /* border-bottom: 1px solid #ced4da; ; */
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

// const ImageContainer = styled.div`
//   width: 50px;
//   flex-grow: 0;
// `;

const Image = styled.img`
  width: 30px;
  height: 30px;
  margin: 5px 10px 5px 5px;
  background: rgba(196, 196, 196, 0.5);
  border-radius: 5px;
  border: none;
`;

const TextContainer = styled.div`
  width: 50px;
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const NumContainer = styled.div`
  width: 20px;
  flex-grow: 0;
  display: flex;
  align-items: center;
`;

const StarContainer = styled.div`
  width: 25px;
  flex-grow: 0;
  display: flex;
  align-items: center;
`;

const styles = {
  star: {
    display: "flex",
    alignItems: "center",
    color: "#ffc107",
  },
};

function LeaderBoard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  const getUserArray = async () => {
    const userArray = await getAllUsers();
    return userArray;
  };

  const getCompletedNumber = async () => {
    const userArray = await getUserArray();
    await userArray.forEach(async (user) => {
      const attendedEvents = await getUserAttendedEvents(user.id);
      const name = user.userName;
      const number = attendedEvents.length;
      const data = {
        name: name,
        number: number,
      };
      setLeaderboard((leaderboard) => [...leaderboard, data]);
    });
  };

  useEffect(() => {
    getCompletedNumber();
  }, []);

  useEffect(() => {
    console.log(leaderboard);
    const sortedArray = leaderboard.sort(function (a, b) {
      return a.number > b.number ? -1 : 1;
    });
    console.log(sortedArray);
    setSortedData(sortedArray);
  }, [leaderboard]);

  if (!sortedData.length) {
    return null;
  }

  return (
    <LeaderBoardContainer>
      <LeaderBoardDiv>
        <MainContent>
          <Title>志工達人榜</Title>
          {sortedData.map((user, index) => (
            <Row key={index}>
              <Image src={userImg} />
              <TextContainer>{user.name}</TextContainer>
              <NumContainer>{user.number}</NumContainer>
              <StarContainer>
                <FontAwesomeIcon icon={faStar} style={styles.star} />
              </StarContainer>
            </Row>
          ))}
        </MainContent>
      </LeaderBoardDiv>
    </LeaderBoardContainer>
  );
}

export default LeaderBoard;
