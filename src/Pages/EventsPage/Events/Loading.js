import styled from "styled-components";
import ReactLoading from "react-loading";

const Container = styled.div`
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

function Loading() {
  return (
    <Container>
      <ReactLoading
        type={"spinningBubbles"}
        color={"#d1d1d1"}
        height={"150px"}
        width={"150px"}
      />
    </Container>
  );
}

export default Loading;
