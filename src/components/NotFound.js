import styled from "styled-components";
import notFoundImage from "../images/404.png";

const NotFoundDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

const NotFoundImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  margin: 0 auto;
`;

function NotFound() {
  return (
    <NotFoundDiv data-testid="notFoundImage">
      <NotFoundImage src={notFoundImage} alt="notFoundImage" />
    </NotFoundDiv>
  );
}

export default NotFound;
