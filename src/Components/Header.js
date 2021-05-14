import styled from "styled-components";
// import { useHistory } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

const Wrapper = styled.header`
  height: 35px;
  padding: 0 30px;
  background-color: #c2c2c2;
`;

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const NavItem = styled.a`
  color: white;
  font-size: 14px;
  line-height: 20px;
  padding: 5px 10px;
  text-decoration: none;
`;

function Header() {
  return (
    <Wrapper>
      <HeaderContent>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/events">Opportunities</NavItem>
        <NavItem href="/createEvent">Recruit Volunteers</NavItem>
        <NavItem href="/profile">Profile</NavItem>
      </HeaderContent>
    </Wrapper>
  );
}

export default Header;
