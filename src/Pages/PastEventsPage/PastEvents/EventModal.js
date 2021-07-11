import { Modal } from "react-bootstrap";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import sadFace from "../../../images/sad.svg";
import { reformatDateAndTime } from "../../../utils/time.js";

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

const PastEventTitle = styled.div`
  font-size: 20px;
  line-height: 30px;
  margin: 10px 0;
  font-weight: 600;
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

function EventModal(props) {
  const renderNoFeedbackMessage = () => {
    return (
      <NoResultDiv>
        <NoResultImage src={sadFace} alt="sadFace" />
        <div>尚未收到參加者回饋</div>
        <NoResultImage src={sadFace} alt="sadFace" />
      </NoResultDiv>
    );
  };

  return (
    <Modal show={props.show} onHide={props.handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="pl-2">活動成果</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PastEventImages>
          <PastEventImage src={props.eventResult.coverImage} alt="eventImage" />
          {props.eventResult.resultImages.map((image, index) => (
            <PastEventImage src={image} key={index} alt="eventImage" />
          ))}
        </PastEventImages>

        {props.eventResult.startTime && (
          <PastEventText className="pl-2">
            {`${reformatDateAndTime(
              props.eventResult.startTime
            )} ~ ${reformatDateAndTime(props.eventResult.endTime)}`}
          </PastEventText>
        )}

        <PastEventText className="pl-2">
          {props.eventResult.address.formatted_address}
        </PastEventText>
        <PastEventTitle className="pl-2">
          {props.eventResult.title}
        </PastEventTitle>
        <PastEventResult className="pl-2">
          {props.eventResult.eventResult ? props.eventResult.eventResult : null}
        </PastEventResult>
      </Modal.Body>

      <Modal.Footer>
        <UserFeedbacks className="pl-2">
          {props.feedbacks.length !== 0
            ? props.feedbacks.map((feedback, index) => (
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
  );
}

export default EventModal;
