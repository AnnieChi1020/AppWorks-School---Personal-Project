import styled from "styled-components";
import React from "react";


const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const FooterContent = styled.div`
  width: 100%;
  height: 100px;
  align-items: center;
  background-color: white;
  margin-top: 50px;
  border-top: 1px solid #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

function Header() {
  return (
    <Container>
      <FooterContent>

      </FooterContent>
    </Container>
  );
}

export default Header;
