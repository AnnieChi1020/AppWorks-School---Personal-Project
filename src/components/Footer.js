import styled from "styled-components";
import React from "react";
import {} from "../utils/firebase.js";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const FooterContent = styled.div`
  width: 100%;
  height: 50px;
  align-items: center;
  background-color: #87b3e5;
  margin-top: 100px;
`;

function Header() {
  return (
    <Container>
      <FooterContent></FooterContent>
    </Container>
  );
}

export default Header;
