/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {
  getEventInfo,
  getEvents,
  getParticipants,
} from "../../../utils/firebase.js";
import PageButtons from "./PageButtons.js";
import { reformatDateAndTime } from "../../../utils/time.js";
import EventModal from "./EventModal.js";

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
  const [isLoading, setIsLoading] = useState(true);

  const getPastEvents = async () => {
    const newEvents = await getEvents(1);
    let eventsArray = [];
    newEvents.forEach((event) => {
      const pastEvent = {
        id: event.eventId,
        image: event.eventCoverImage,
        title: event.eventTitle,
        startTime: reformatDateAndTime(event.startTime),
        endTime: reformatDateAndTime(event.endTime),
      };
      eventsArray.push(pastEvent);
    });
    eventsArray.slice(0, 9);
    setEvents(eventsArray);
    setIsLoading(false);
  };

  useEffect(() => {
    getPastEvents();
  }, []);

  const PASTEVENTS_LIMIT = 9;

  const getTotalPages = (events) => {
    const totalPages = Math.ceil(events.length / PASTEVENTS_LIMIT);
    let pageArray = [];
    for (let i = 0; i < totalPages; i++) {
      pageArray.push(i + 1);
    }
    setPageNumber([...pageArray]);
  };

  useEffect(() => {
    getTotalPages(events);
  }, [events]);

  const handleEventClick = async (id) => {
    await getPastEventInfo(id);
    await getUserFeedbacks(id);
    setShow(true);
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
    userData.forEach((e) => {
      if (e.participantInfo.participantRating !== 0) {
        currentFeedback.push(e.participantInfo);
      }
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

  const renderPastEvents = (page) => {
    const startItem = (page - 1) * PASTEVENTS_LIMIT;
    const endItem = startItem + PASTEVENTS_LIMIT;
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

  const pageButtonsProps = {
    showPageNum: showPageNum,
    pageNumber: pageNumber,
    changePage: handlePageChange,
    toPrevPage: handlePrevPage,
    toNextPage: handleNextPage,
  };

  const eventModalProps = {
    show: show,
    eventResult: eventResult,
    feedbacks: userFeedback,
    handleClose: handleClose,
  };

  return (
    <div>
      {!isLoading && (
        <PastEventsContainer>
          {renderPastEvents(showPageNum)}
          <PageButtons {...pageButtonsProps} />
        </PastEventsContainer>
      )}
      <EventModal {...eventModalProps} />
    </div>
  );
}

export default PastEvents;
