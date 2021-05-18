import styled from "styled-components";
import { getEvents, updateEvent } from "../utils/firebase.js";

// import { useHistory } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

const Wrapper = styled.header`
  width: 100%;
  margin: 0 auto;
`;

const HeaderContent = styled.div`
  width: 100%;
  align-items: center;
  background-color: #c2c2c2;
`;

const NavContent = styled.div`
  width: 90%;
  margin: 0 auto;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: row;
`;

const NavItem = styled.a`
  color: white;
  font-size: 16px;
  line-height: 20px;
  padding: 10px 10px;
  text-decoration: none;
`;

function Header() {
  const updatePassedEvent = async () => {
    const activeEvents = await getEvents(0);
    activeEvents.map((event) => {
      console.log(event);
      const startT = event.startTime.seconds * 1000;
      const currentT = new Date().getTime();
      if (startT < currentT) {
        console.log("over");
        event.eventStatus = 1;
        updateEvent(event.eventId, event);
      }
      return true;
    });
  };

  updatePassedEvent();

  return (
    <Wrapper>
      <HeaderContent>
        <NavContent>
          <NavItem href="/">Volunteer</NavItem>
          <NavItems>
            <NavItem href="/events">我要當志工</NavItem>
            <NavItem href="/createEvent">招募志工</NavItem>
            <NavItem href="/past-events">活動成果</NavItem>
            <NavItem href="/profile">個人頁</NavItem>
          </NavItems>
        </NavContent>
      </HeaderContent>
    </Wrapper>
  );
}

export default Header;
