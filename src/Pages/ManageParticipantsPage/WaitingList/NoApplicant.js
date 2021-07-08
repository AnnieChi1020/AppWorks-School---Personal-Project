import styled from "styled-components";
import noApplicantImage from "../../../images/noApplicant-min.png";

const NoResultDiv = styled.div`
  width: 200px;
  font-size: 16px;
  line-height: 20px;
  padding: 10px 0;
  color: #949494;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const NoResultImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-right: 5px;
  margin-left: 5px;
`;

const NoResultText = styled.div`
  position: absolute;
  top: 28px;
  left: 35px;
  color: #3d3d3d;
`;

function NoApplicant() {
  return (
    <NoResultDiv>
      <NoResultImage src={noApplicantImage} alt="noApplicantImage" />
      <NoResultText>目前沒有申請</NoResultText>
    </NoResultDiv>
  );
}

export default NoApplicant;
