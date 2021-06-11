import styled from "styled-components";
import React, { useEffect, useState } from "react";
import userImg from "../../images/user-100.svg";
import plant from "../../images/plant.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { getAllUsers, getUserAttendedEvents } from "../../utils/firebase.js";

const LeaderBoardContainer = styled.div`
  width: 300px;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 20px;
  display: grid;
  grid-template-rows: 340px 1fr;
  @media (max-width: 960px) {
    order: -1;
  }
`;

const PlantImageContainer = styled.div`
  width: 100%;
  height: 290px;
  display: flex;
  align-items: center;
  padding: 5px;
  margin-bottom: 40px;
`;

const PlantImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const LeaderBoardDiv = styled.div`
  width: 100%;
  height: 300px;
  padding: 20px 10px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const MainContent = styled.div`
  padding: 5px 10px;
  margin-top: 30px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  padding: 8px 5px 8px 5px;
  margin: 0 auto;
  margin-bottom: 10px;
  background-color: #66ab8c;
  border-radius: 10px 10px 0 0;
  text-align: center;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
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
    setLeaderboard([]);
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
      setLeaderboard((leaderboard) => [...leaderboard.splice(0, 10)]);
    });
  };

  useEffect(() => {
    getCompletedNumber();
  }, []);

  useEffect(() => {
    const sortedArray = leaderboard.sort(function (a, b) {
      return a.number > b.number ? -1 : 1;
    });
    setSortedData(sortedArray.slice(0, 5));
  }, [leaderboard]);

  if (!sortedData.length) {
    return null;
  }

  return (
    <LeaderBoardContainer>
      <PlantImageContainer>
        <PlantImage src={plant} />
      </PlantImageContainer>
      <LeaderBoardDiv>
        <Title>志工達人榜</Title>
        <MainContent>
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
