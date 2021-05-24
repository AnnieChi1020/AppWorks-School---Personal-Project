import styled from "styled-components";
import React, { useState } from "react";
import {} from "../utils/firebase.js";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const FooterContent = styled.div`
  width: 100%;
  height: 30px;
  align-items: center;
  background-color: #1190cb;
`;

function Header() {
  return (
    <Container>
      <FooterContent></FooterContent>
    </Container>
  );
}

export default Header;
