import styled from "styled-components";
import noEventImage from "../../../images/noEvent-min.png";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
  padding: 20px 0;
  text-align: center;
`;

const NoEventImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
`;

const NoEventText = styled.div`
  width: 100%;
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  margin-top: 20px;
  padding: 10px;
  color: #656565; ;
`;

function NoEvent() {
  return (
    <Container>
      <NoEventImage src={noEventImage} />
      <NoEventText>目前沒有活動哦</NoEventText>
    </Container>
  );
}

export default NoEvent;
