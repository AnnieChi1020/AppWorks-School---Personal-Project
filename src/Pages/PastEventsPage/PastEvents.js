/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {
  getEventInfo,
  getEvents,
  getParticipants,
} from "../../utils/firebase.js";
// import { useHistory } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Modal } from "react-bootstrap";

import sadFace from "../../images/sad.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const PastEventsContainer = styled.div`
  width: calc(100% - 20px);
  margin-top: 20px;
  margin-right: 20px;
  padding: 20px 20px;
  border-radius: 10px;
`;

const PastEvent = styled.div`
  width: 33%;

  display: inline-block;
  margin-top: 20px;
  filter: sepia(50%);
  cursor: pointer;
  & :before {
    content: "";
    position: absolute;
    z-index: -1;
    transition: all 0.35s;
  }
  & :hover {
    filter: none;
    transform: scale(1, 1) rotate(0deg) !important;
    transition: all 0.35s;
  }
  @media (max-width: 760px) {
    width: 50%;
  }
  @media (max-width: 540px) {
    width: 95%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  /* grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr; */
  flex-wrap: wrap;
  justify-content: center;
  & ${PastEvent}:nth-of-type(n) {
    transform: scale(0.85, 0.85) rotate(0deg);
    transition: all 0.35s;
  }
  & ${PastEvent}:nth-of-type(5n+1) {
    transform: scale(0.85, 0.85) rotate(5deg);
    transition: all 0.35s;
  }
  & ${PastEvent}:nth-of-type(5n+2) {
    transform: scale(0.85, 0.85) rotate(-5deg);
    transition: all 0.35s;
  }
  & ${PastEvent}:nth-of-type(5n+3) {
    transform: scale(0.85, 0.85) rotate(3deg);
    transition: all 0.35s;
  }
  & ${PastEvent}:nth-of-type(5n+4) {
    transform: scale(0.85, 0.85) rotate(-3deg);
    transition: all 0.35s;
  }
  & ${PastEvent}:hover {
    filter: none;
    transform: scale(1, 1) rotate(0deg) !important;
    transition: all 0.35s;
  }
`;

const PolaroidImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const Polaroid = styled.div`
  background-color: white;
  padding: 1rem;
  box-shadow: 0 0.2rem 1.2rem rgb(0, 0, 0, 0.2);
`;

const PolaroidCaption = styled.div`
  font-size: 20px;
  text-align: center;
  line-height: 24px;
  font-weight: 500;
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
  height: 15vw;
  max-height: 150px;
  min-height: 130px;
  min-width: 40%;
  flex-grow: 1;
  margin: 5px;
  position: relative;
  object-fit: cover;
  vertical-align: bottom;
  border-radius: 5px;
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

const PageButtonsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 50px 0 0 0;
`;

const PageButton = styled.div`
  /* width: 30px;
  height: 30px; */
  /* border-radius: 50%; */
  border: 1px solid transparent;
  font-size: 16px;
  font-weight: 600;
  line-height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  padding: 5px 1px;
  color: #a4a3a3;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  :hover {
    color: #57bc90;
  }
`;

const SelectedPageButton = styled(PageButton)`
  border-bottom: 1px solid #747474;
  cursor: inherit;
  pointer-events: none;
  color: #4f4f4f;
`;

const DisabledPageButton = styled(PageButton)`
  cursor: inherit;
  opacity: 0.3;
  pointer-events: none;
`;

const NoResultDiv = styled.div`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  padding: 10px 0;
  color: #949494;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const NoResultImage = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
  margin-left: 5px;
`;

function PastEvents() {
  const [events, setEvents] = useState([]);
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
  const [pageNumber, setPageNumber] = useState([]);
  const [showPageNum, setShowPageNum] = useState(1);

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
      return true;
    });
    eventsArray.slice(0, 9);
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

  const getTotalPages = (events) => {
    const totalPages = Math.ceil(events.length / 9);
    let pageArray = [];
    for (let i = 0; i < totalPages; i++) {
      pageArray.push(i + 1);
    }
    console.log(pageArray);
    setPageNumber([...pageArray]);
    console.log(totalPages);
  };

  useEffect(() => {
    console.log(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    getTotalPages(events);
  }, [events]);

  // let history = useHistory();
  const handleEventClick = async (id) => {
    // setViewEvent(id);
    await getPastEventInfo(id);
    await getUserFeedbacks(id);
    setShow(true);
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
  };

  const getUserFeedbacks = async (id) => {
    const userData = await getParticipants(id, 1);
    let currentFeedback = [];
    userData.map((e) => {
      if (e.participantInfo.participantRating !== 0) {
        currentFeedback.push(e.participantInfo);
      }
      return true;
    });
    setUserFeedback(currentFeedback);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handlePageChange = (page) => {
    setShowPageNum(parseInt(page));
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    setShowPageNum(showPageNum + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevPage = () => {
    setShowPageNum(showPageNum - 1);
    window.scrollTo(0, 0);
  };

  const itemLimit = 9;
  const renderPastEvents = (page) => {
    const startItem = (page - 1) * itemLimit;
    const endItem = startItem + itemLimit;
    return (
      <Wrapper>
        {events.slice(startItem, endItem).map((event, index) => (
          <PastEvent key={index}>
            <Polaroid>
              <PolaroidImage
                src={event.image}
                onClick={() => handleEventClick(event.id)}
              />
              <PolaroidCaption>{event.title}</PolaroidCaption>
            </Polaroid>
          </PastEvent>
        ))}
      </Wrapper>
    );
  };

  const renderPageButton = () => {
    return (
      <PageButtonsContainer>
        {showPageNum === 1 ? (
          <DisabledPageButton>
            <FontAwesomeIcon disabled icon={faChevronLeft} />
          </DisabledPageButton>
        ) : (
          <PageButton
            onClick={() => {
              handlePrevPage();
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </PageButton>
        )}

        {pageNumber.map((page, index) =>
          showPageNum === page ? (
            <SelectedPageButton
              key={index}
              id={`${page}`}
              disabled
              onClick={(e) => handlePageChange(e.target.id)}
            >
              {page}
            </SelectedPageButton>
          ) : (
            <PageButton
              key={index}
              id={`${page}`}
              onClick={(e) => handlePageChange(e.target.id)}
            >
              {page}
            </PageButton>
          )
        )}
        {showPageNum === pageNumber.length ? (
          <DisabledPageButton>
            <FontAwesomeIcon disabled icon={faChevronRight} />
          </DisabledPageButton>
        ) : (
          <PageButton
            onClick={() => {
              handleNextPage();
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </PageButton>
        )}
      </PageButtonsContainer>
    );
  };

  const renderNoFeedbackMessage = () => {
    return (
      <NoResultDiv>
        <NoResultImage src={sadFace} />
        <div>尚未收到參加者回饋</div>
        <NoResultImage src={sadFace} />
      </NoResultDiv>
    );
  };

  return (
    <div>
      <PastEventsContainer>
        {/* <Wrapper>
          {events.slice(0, 9).map((event, index) => (
            <PastEvent key={index}>
              <Polaroid>
                <PolaroidImage
                  src={event.image}
                  onClick={() => handleEventClick(event.id)}
                />
                <PolaroidCaption>{event.title}</PolaroidCaption>
              </Polaroid>
            </PastEvent>
          ))}
        </Wrapper> */}
        {renderPastEvents(showPageNum)}
        {renderPageButton(showPageNum)}
      </PastEventsContainer>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="pl-2">活動成果</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PastEventImages>
            <PastEventImage src={eventResult.coverImage} />
            {eventResult.resultImages.map((image, index) => (
              <PastEventImage src={image} key={index} />
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
            {eventResult.eventResult ? (
              eventResult.eventResult
            ) : (
              // renderNoResultMessage()
              <div />
            )}
          </PastEventResult>
        </Modal.Body>
        <Modal.Footer>
          <UserFeedbacks className="pl-2">
            {userFeedback.length !== 0
              ? userFeedback.map((feedback, index) => (
                  <UserFeedback key={index}>
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
                ))
              : renderNoFeedbackMessage()}
          </UserFeedbacks>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PastEvents;
