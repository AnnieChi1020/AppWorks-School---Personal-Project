import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { getEventInfo, getEvents, getUserList } from "../../utils/firebase.js";
import { useHistory } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Modal, Button } from "react-bootstrap";

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 20px;
  padding: 10px 0;
`;

const Event = styled.div`
  height: 25vh;
  flex-grow: 1;
  margin: 5px;
  position: relative;
`;

const EventImage = styled.img`
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
  cursor: pointer;
`;

// const EventTime = styled.div`
//   font-size: 12px;
//   margin-top: 5px;
// `;

const EventTitle = styled.div`
  font-size: 16px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  padding: 5px 10px;
  background-color: #b3b3b35e;
`;

const PastEvent = styled.div`
  width: 100%;
  border-radius: 8px;
  border: solid 1px #979797;
  padding: 20px 20px 50px 20px;
  margin-bottom: 20px;
`;

const PastEventTitle = styled.div`
  font-size: 20px;
  line-height: 30px;
  margin: 10px 0;
  font-weight: 600;
`;

const PastEventImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const PastEventImage = styled.img`
  height: 15vh;
  flex-grow: 1;
  margin: 5px;
  position: relative;
  object-fit: cover;
  vertical-align: bottom;
`;

const PastEventText = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #00000073;
`;

const PastEventResult = styled.div`
  font-size: 14px;
  line-height: 18px;
  margin-top: 10px;
  font-weight: 400;
`;

const UserFeedbacks = styled.div`
  width: 100%;
  padding: 5px 0;
`;

const UserImage = styled.img`
  height: 60px;
  width: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
`;

const UserFeedback = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const UserComment = styled.div`
  font-size: 14px;
  line-height: 18px;
`;

const styles = {
  modal: {
    // width: "600px",
    // margin: "0 auto",
  },
};

function PastEvents() {
  const [events, setEvents] = useState([]);
  // const [viewEvent, setViewEvent] = useState("");
  const [eventResult, setEventResult] = useState({
    title: "",
    startTime: "",
    endTime: "",
    address: {},
    coverImage: "",
    resultImages: [],
    feedbacks: [],
    eventResult: "",
  });
  const [userFeedback, setUserFeedback] = useState([]);

  const getPastEvents = async () => {
    const newEvents = await getEvents(1);
    let eventsArray = [];
    newEvents.map((event) => {
      const pastEvent = {
        id: event.eventId,
        image: event.eventCoverImage,
        title: event.eventTitle,
        startTime: reformatTimestamp(event.startTime),
        endTime: reformatTimestamp(event.endTime),
      };
      eventsArray.push(pastEvent);
      console.log(pastEvent);
      return true;
    });
    setEvents(eventsArray);
  };

  const getDay = (day) => {
    const dayArray = ["日", "一", "二", "三", "四", "五", "六"];
    return dayArray[day];
  };

  const reformatTimestamp = (timestamp) => {
    if (timestamp) {
      const year = timestamp.toDate().getFullYear();
      const month = timestamp.toDate().getMonth() + 1;
      const date = timestamp.toDate().getDate();
      const day = getDay(timestamp.toDate().getDay());
      const time = timestamp.toDate().toTimeString().slice(0, 5);
      const reformatedTime = `${year}-${month}-${date}(${day}) ${time}`;
      return reformatedTime;
    }
  };

  useEffect(() => {
    getPastEvents();
  }, []);

  useEffect(() => {
    console.log(eventResult);
  }, [eventResult]);

  let history = useHistory();
  const handleEventClick = (id) => {
    // setViewEvent(id);
    setShow(true);
    getPastEventInfo(id);
    getUserFeedbacks(id);
    // history.push(`/past-events/${id}`);
  };

  const getPastEventInfo = async (id) => {
    const eventInfo = await getEventInfo(id);
    setEventResult({
      ...eventResult,
      title: eventInfo.eventTitle,
      startTime: eventInfo.startTime,
      endTime: eventInfo.endTime,
      address: eventInfo.eventAddress,
      coverImage: eventInfo.eventCoverImage,
      resultImages: eventInfo.resultImage,
      eventResult: eventInfo.resultContent,
    });
    console.log(eventInfo);
  };

  const getUserFeedbacks = async (id) => {
    const userData = await getUserList(id, 1);
    console.log(userData);
    let currentFeedback = [];
    userData.map((e) => {
      if (e.participantInfo.participantRating !== 0) {
        currentFeedback.push(e.participantInfo);
      }
    });
    setUserFeedback(currentFeedback);
    console.log(currentFeedback);
    console.log(userData);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <div>
      <Wrapper>
        {events.map((event, index) => (
          <Event key={index}>
            <EventImage
              src={event.image}
              onClick={() => handleEventClick(event.id)}
            ></EventImage>
            {/* <EventTitle>{event.startTime}</EventTitle> */}
            <EventTitle>{event.title}</EventTitle>
          </Event>
        ))}
      </Wrapper>

      <Modal show={show} onHide={handleClose} style={styles.modal}>
        <Modal.Header closeButton>
          <Modal.Title className="pl-2">活動成果</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PastEventImages>
            <PastEventImage src={eventResult.coverImage} />
            {eventResult.resultImages.map((image, index) => (
              <PastEventImage src={image} />
            ))}
          </PastEventImages>

          <PastEventText className="pl-2">
            {`${reformatTimestamp(eventResult.startTime)} ~ ${reformatTimestamp(
              eventResult.endTime
            )}`}
          </PastEventText>
          <PastEventText className="pl-2">
            {eventResult.address.formatted_address}
          </PastEventText>
          <PastEventTitle className="pl-2">{eventResult.title}</PastEventTitle>
          <PastEventResult className="pl-2">
            {eventResult.eventResult}
          </PastEventResult>
        </Modal.Body>
        <Modal.Footer>
          <UserFeedbacks className="pl-2">
            {userFeedback.map((feedback, index) => (
              <UserFeedback key={index}>
                {/* <div>
                  <UseImage
                    src={`https://image.slidesharecdn.com/random-120815092541-phpapp02/95/cute-cat-1-728.jpg?cb=1345022928`}
                  />
                  <UserComment>{feedback.participantName}</UserComment>
                </div> */}
                <div>
                  {/* <UserComment>{`參加者${index}`}</UserComment> */}
                  <ReactStars
                    count={5}
                    edit={false}
                    value={feedback.participantRating}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <UserComment>{feedback.participantComment}</UserComment>
                </div>
              </UserFeedback>
            ))}
          </UserFeedbacks>
        </Modal.Footer>
      </Modal>

      {/* <Wrapper>
        {eventResult && (
          <PastEvent>
            <PastEventImages>
              <PastEventImage src={eventResult.eventCoverImage} />
              {eventResult.resultImage.map((image, index) => (
                <PastEventImage src={image} />
              ))}
            </PastEventImages>
            <PastEventTitle>{eventResult.eventTitle}</PastEventTitle>
            <PastEventText>
              {`活動時間 | ${reformatTimestamp(
                eventResult.startTime
              )} ~ ${reformatTimestamp(eventResult.endTime)}`}
            </PastEventText>
            <PastEventText>{`活動成果 | ${eventResult.resultContent}`}</PastEventText>
            <UserFeedbacks>
              {userFeedback.map((feedback, index) => (
                <UserFeedback>
                  <div>
                    <UseImage
                      src={`https://image.slidesharecdn.com/random-120815092541-phpapp02/95/cute-cat-1-728.jpg?cb=1345022928`}
                    />
                    <UserComment>{feedback.participantName}</UserComment>
                  </div>
                  <div>
                    <ReactStars
                      count={5}
                      edit={false}
                      value={feedback.participantRating}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <UserComment>{feedback.participantComment}</UserComment>
                  </div>
                </UserFeedback>
              ))}
            </UserFeedbacks>
          </PastEvent>
        )}
      </Wrapper> */}
    </div>
  );
}

export default PastEvents;
