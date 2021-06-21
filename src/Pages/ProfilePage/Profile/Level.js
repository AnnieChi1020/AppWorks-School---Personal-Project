import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ProgressBar } from "react-bootstrap";

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

const Styles = styled.div`
  .progress {
    border-radius: 20px;
    height: 10px;
  }
  .progress-bar {
    background-color: #48add5;
    border-radius: 20px;
  }
`;

function Level(props) {
  const levels = [
    { name: "志工小菜鳥", number: 0 },
    { name: "志工小達人", number: 5 },
    { name: "志工王中王", number: 10 },
    { name: "志工網主人", number: 100 },
  ];

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

  useEffect(() => {
    if (props.userData.attendedNum < 5) {
      setLevelStatus({
        ...levelStatus,
        current: { number: props.userData.attendedNum, name: levels[0].name },
        target: { number: levels[1].number, name: levels[1].name },
      });
    } else if (props.userData.attendedNum < 10) {
      setLevelStatus({
        ...levelStatus,
        current: { number: props.userData.attendedNum, name: levels[1].name },
        target: { number: levels[2].number, name: levels[2].name },
      });
    } else if (props.userData.attendedNum < 100) {
      setLevelStatus({
        ...levelStatus,
        current: { number: props.userData.attendedNum, name: levels[2].name },
        target: { number: levels[3].number, name: levels[3].name },
      });
    }
    // eslint-disable-next-line
  }, [props.userData.attendedNum]);

  return (
    <Styles>
      <ProfileSubContainer style={{ borderBottom: "1px solid #e7e7e9" }}>
        <Text>{`目前參與的志工活動數`}</Text>
        <LevelBarData>
          <AttendNum>{props.userData.attendedNum}</AttendNum>
          <FontAwesomeIcon icon={faStar} />
        </LevelBarData>
        <ProgressBar
          now={(levelStatus.current.number / levelStatus.target.number) * 100}
        />
        <Text2>{`再累積 ${
          levelStatus.target.number - levelStatus.current.number
        } 場活動就可成為 ${levelStatus.target.name}`}</Text2>
      </ProfileSubContainer>
    </Styles>
  );
}

export default Level;
