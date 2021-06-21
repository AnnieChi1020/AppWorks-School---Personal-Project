import styled from "styled-components";
import React from "react";
// import logo from "../images/logo.jpg";
// import logoText from "../images/logo_3.png";

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

// const LogoImage = styled.img`
//   width: 30px;
//   height: 30px;
//   margin-left: 30px;
// `;

// const LogoText = styled.img`
//   width: auto;
//   height: 40px;
//   margin-left: 20px;
// `;

function Header() {
  return (
    <Container>
      <FooterContent>
        {/* <LogoImage src={logo} />
        <LogoText src={logoText} /> */}
      </FooterContent>
    </Container>
  );
}

export default Header;
