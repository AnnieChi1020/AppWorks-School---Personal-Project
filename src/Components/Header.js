import styled from "styled-components";
import { getEvents, updateEvent } from "../utils/firebase.js";

// import { useHistory } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

const Wrapper = styled.header`
  height: 35px;
  padding: 0 30px;
  background-color: #c2c2c2;
  align-items: center;
`;

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: row;
`;

const NavItem = styled.a`
  color: white;
  font-size: 14px;
  line-height: 20px;
  padding: 5px 10px;
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
        <NavItem href="/">Volunteer</NavItem>
        <NavItems>
          <NavItem href="/events">Opportunities</NavItem>
          <NavItem href="/createEvent">Recruit Volunteers</NavItem>
          <NavItem href="/past-events">Past Events</NavItem>
          <NavItem href="/profile">Profile</NavItem>
        </NavItems>
      </HeaderContent>
    </Wrapper>
  );
}

export default Header;
