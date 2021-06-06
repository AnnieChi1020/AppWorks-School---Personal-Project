import styled from "styled-components";
import React from "react";
import {} from "../utils/firebase.js";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const FooterContent = styled.div`
  width: 100%;
  height: 100px;
  align-items: center;
  background-color: white;
  margin-top: 80px;
  border-top: 1px solid #f5f5f5;
`;

function Header() {
  return (
    <Container>
      <FooterContent></FooterContent>
    </Container>
  );
}

export default Header;
