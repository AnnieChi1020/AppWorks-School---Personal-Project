import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import photo from "../../images/photo.jpg";
import { Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import background from "../../images/manageBackground.jpg";
import {
  createNewDoc,
  postEventInfo,
  getImageURL,
} from "../../utils/firebase.js";
import { toast } from "react-toastify";
import { successAlertText, errorAlertText } from "../../components/Alert.js";
import { getReformatedLocalTime, getTomorrowDate } from "../../utils/time.js";
import { validateInput, validateEventTime } from "../../utils/validation.js";
import { getGeopoint } from "../../utils/googleMap.js";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Mask = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 0px;
`;

const CreateEventContainer = styled.div`
  max-width: 600px;
  width: 95%;
  display: flex;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 100px;
  flex-direction: column;
  padding: 10px 20px;
  background-color: white;
  border-radius: 8px;
  border: solid 1px #979797;
  min-height: calc(100vh - 200px);
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Option = styled.div`
  line-height: 20px;
  font-size: 1rem;
  padding: 5px 25px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
  color: #495057;
  cursor: pointer;
  @media (max-width: 760px) {
    font-size: 14px;
    padding: 5px 15px;
    margin-right: 5px;
  }
  :hover {
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  }
`;

const OptionSelected = styled(Option)`
  background-color: #67aeca;
  color: white;
`;

const Map = styled.iframe`
  width: 100%;
  height: 30vw;
  max-height: 300px;
  border-radius: 10px;
`;

const Button = styled.button`
  width: 120px;
  background-color: #0e6cd0;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  line-height: 1.5;
  padding: 5px 20px;
  margin-left: calc(50% - 60px);
  margin-top: 40px;
  margin-bottom: 20px;
`;

const DisabledButton = styled(Button)`
  opacity: 0.6;
  cursor: inherit;
`;

const ImagePreviewDiv = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f8f8f8;
  border-radius: 5px;
  margin-bottom: 5px;
  position: relative;
  display: flex;
  justify-content: center;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 200px;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  border-radius: 5px;
`;

const StyledFormControl = styled(Form.Control)`
  width: 100%;
  height: 200px;
  margin: 0 auto;
  overflow: hidden;
  z-index: 4;
  ::-webkit-file-upload-button {
    visibility: hidden;
  }
  ::before {
    width: 100%;
    height: 200px;
    content: "選擇檔案";
    display: inline-block;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    cursor: pointer;
    font-size: 16px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    background-color: transparent;
    color: transparent;
    text-align: center;
  }
`;

const Styles = styled.div`
  .form-label {
    @media (max-width: 760px) {
      font-size: 14px;
    }
  }
  .form-control {
    @media (max-width: 760px) {
      font-size: 14px;
    }
  }
  .form-control-file {
    @media (max-width: 760px) {
      font-size: 14px;
    }
  }
  .form-control .is-invalid {
    background-image: none;
  }
  .invalid-feedback {
    margin-top: 5px;
  }
  .css-yk16xz-control {
    @media (max-width: 760px) {
      font-size: 14px;
    }
  }
`;

function CreateEvent() {
  const ORGANIZATION = 1;

  const dispatch = useDispatch();
  const hosterId = useSelector((state) => state.isLogged.userId);
  const userRole = useSelector((state) => state.isLogged.userRole);

  const [timeIsInvalid, setTimeIsInvalid] = useState(false);
  const [titleIsInvalid, setTitleIsInvalid] = useState(false);
  const [contentIsInvalid, setContentIsInvalid] = useState(false);
  const [imageIsInvalid, setImageIsInvalid] = useState(false);

  const TAIWAN_PLACEID = "ChIJL1cHXAbzbjQRaVScvwTwEec";
  const [selectedAddress, setSelectedAddress] = useState({
    value: { place_id: TAIWAN_PLACEID },
  });
  const [uploadImage, setUploadImage] = useState(photo);

  const [submmited, setSubmmited] = useState(false);

  const history = useHistory();
  useEffect(() => {
    if (userRole !== ORGANIZATION) {
      history.push("/");
    }
  }, [userRole, history]);

  const currentTime = getReformatedLocalTime(Date.now());
  const tomorrowDate = getTomorrowDate(Date.now());

  const [eventTime, setEventTime] = useState({
    startDate: tomorrowDate,
    startTime: currentTime.time,
    endDate: tomorrowDate,
    endTime: currentTime.time,
  });

  const [tags, setTags] = useState([
    { name: "社會福利", id: "社會福利", select: false },
    { name: "文化教育", id: "文化教育", select: false },
    { name: "環境保護", id: "環境保護", select: false },
    { name: "生態保護", id: "生態保護", select: false },
  ]);

  const handleTagClick = (tag) => {
    const selectedTagId = tag.target.id;
    setTags(
      tags.map((tag) =>
        tag.id === selectedTagId ? { ...tag, select: !tag.select } : tag
      )
    );
  };

  // 改成map
  const getSelectedTags = (tags) => {
    const selectedTags = [];
    tags.forEach((tag) => {
      if (tag.select) {
        selectedTags.push(tag.name);
      }
    });
    return selectedTags;
  };

  const constructEventData = async (inputs) => {
    const imageUrl = await getImageURL(hosterId, inputs.coverImage.files[0]);
    const geopoint = await getGeopoint(selectedAddress.label);

    const newEventRef = createNewDoc();
    const eventData = {
      eventId: newEventRef.id,
      eventTitle: inputs.title.value,
      eventContent: inputs.content.value,
      eventAddress: geopoint,
      eventCoverImage: imageUrl,
      startTime: new Date(
        inputs.startTime[0].value + " " + inputs.startTime[1].value
      ),
      endTime: new Date(
        inputs.endTime[0].value + " " + inputs.endTime[1].value
      ),
      eventStatus: 0,
      eventTags: getSelectedTags(tags),
      hosterId: hosterId,
      resultImage: [],
      resultContent: "",
    };
    return { id: newEventRef, data: eventData };
  };

  const handleTimeChange = (input, value) => {
    console.log(process.env.REACT_APP_AUTOCOMPLETE);
    console.log(process.env.REACT_APP_AUTOCOMPLETE);

    const inputType = input;
    switch (inputType) {
      case "startDate":
        setEventTime({ ...eventTime, startDate: value });
        break;
      case "startTime":
        setEventTime({ ...eventTime, startTime: value });
        break;
      case "endDate":
        setEventTime({ ...eventTime, endDate: value });
        break;
      case "endTime":
        setEventTime({ ...eventTime, endTime: value });
        break;
      default:
        return null;
    }
  };

  const handleFileChange = (file) => {
    let fileURL;
    if (file) {
      fileURL = URL.createObjectURL(file);
      setUploadImage(fileURL);
    } else {
      setUploadImage(photo);
    }
  };

  const createEvent = async (inputs) => {
    const eventDetail = await constructEventData(inputs);
    const createdEvent = await postEventInfo(eventDetail.id, eventDetail.data);
    if (createdEvent) {
      toast.success(successAlertText("已創建志工活動"), {
        position: toast.POSITION.TOP_CENTER,
      });
      history.push("/events");
    } else {
      toast.error(errorAlertText("活動創建失敗"));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const inputs = event.currentTarget;

    const titleIsValid = validateInput(inputs.title.value, setTitleIsInvalid);
    const contentIsValid = validateInput(
      inputs.content.value,
      setContentIsInvalid
    );
    const timeIsValid = validateEventTime(eventTime, setTimeIsInvalid);

    if (selectedAddress.value) {
      document.querySelector(".css-yk16xz-control").style.border =
        "1px solid hsl(0, 0%, 80%)";
    } else {
      document.querySelector(".css-yk16xz-control").style.border =
        "1px solid red";
    }

    if (inputs.coverImage.files[0]) {
      setImageIsInvalid(false);
      document.querySelector("#coverImage").style.border = "none";
    } else {
      setImageIsInvalid(true);
      document.querySelector("#coverImage").style.border = "1px solid red";
      document.querySelector("#coverImage").style.borderRadius = "5px";
    }

    if (
      titleIsValid &&
      contentIsValid &&
      timeIsValid &&
      selectedAddress.value &&
      inputs.coverImage.files[0]
    ) {
      setSubmmited(true);
      await createEvent(inputs);
    } else {
      toast.error(errorAlertText("請確認活動資料"));
    }
  };

  return (
    <Styles>
      {userRole === 1 && (
        <Container
          className="container-xl"
          onClick={() => dispatch({ type: "SHOW_NAV", data: false })}
        >
          <Background />
          <Mask />

          <CreateEventContainer>
            <Form className="px-0 py-3 p-4" noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>活動名稱</Form.Label>
                <Form.Control
                  type="text"
                  required
                  isInvalid={titleIsInvalid}
                  className="mb-1"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ position: "inherit" }}
                >
                  請輸入活動名稱
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="content">
                <Form.Label>活動內容</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  rows={3}
                  required
                  isInvalid={contentIsInvalid}
                  className="mb-1"
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ position: "inherit" }}
                >
                  請輸入活動內容
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="startTime">
                <Row>
                  <Col>
                    <Form.Label>開始日期</Form.Label>
                    <Form.Control
                      type="date"
                      defaultValue={tomorrowDate}
                      min={tomorrowDate}
                      className="mb-1"
                      isInvalid={timeIsInvalid}
                      onChange={(e) => {
                        handleTimeChange("startDate", e.target.value);
                      }}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ position: "inherit" }}
                    >
                      開始時間需早於結束時間
                    </Form.Control.Feedback>
                    <Form.Control.Feedback
                      type="valid"
                      style={{ display: "none" }}
                    ></Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Label>時間</Form.Label>
                    <Form.Control
                      type="time"
                      defaultValue={currentTime.time}
                      className="mb-1"
                      isInvalid={timeIsInvalid}
                      onChange={(e) => {
                        handleTimeChange("startTime", e.target.value);
                      }}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ position: "inherit" }}
                    ></Form.Control.Feedback>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="endTime">
                <Row>
                  <Col>
                    <Form.Label>結束日期</Form.Label>
                    <Form.Control
                      type="date"
                      defaultValue={tomorrowDate}
                      min={eventTime.startDate}
                      isInvalid={timeIsInvalid}
                      className="mb-1"
                      onChange={(e) => {
                        handleTimeChange("endDate", e.target.value);
                      }}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ position: "inherit" }}
                    ></Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Label>時間</Form.Label>
                    <Form.Control
                      type="time"
                      defaultValue={currentTime.time}
                      isInvalid={timeIsInvalid}
                      className="mb-1"
                      onChange={(e) => {
                        handleTimeChange("endTime", e.target.value);
                      }}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ position: "inherit" }}
                    ></Form.Control.Feedback>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formEventCoverImage">
                <Form.Label>活動類型</Form.Label>
                <Tags>
                  {tags.map((tag, index) =>
                    tag.select ? (
                      <OptionSelected
                        id={tag.id}
                        key={index}
                        onClick={(e) => handleTagClick(e)}
                      >
                        {tag.name}
                      </OptionSelected>
                    ) : (
                      <Option
                        id={tag.id}
                        key={index}
                        onClick={(e) => handleTagClick(e)}
                      >
                        {tag.name}
                      </Option>
                    )
                  )}
                </Tags>
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>地址</Form.Label>
                <GooglePlacesAutocomplete
                  placeholder="地址"
                  apiKey={process.env.REACT_APP_AUTOCOMPLETE}
                  selectProps={{
                    selectedAddress,
                    onChange: setSelectedAddress,
                    placeholder: "請輸入地址",
                  }}
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ position: "inherit" }}
                >
                  請填寫正確地址
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Map
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLEMAP}&q=place_id:${selectedAddress.value.place_id}`}
                ></Map>
              </Form.Group>
              <Form.Group controlId="coverImage">
                <Form.Label>上傳活動封面</Form.Label>
                <ImagePreviewDiv>
                  <ImagePreview src={uploadImage} />
                  <StyledFormControl
                    type="file"
                    required
                    className="mb-1"
                    isInvalid={imageIsInvalid}
                    onChange={(e) => handleFileChange(e.target.files[0])}
                  />
                </ImagePreviewDiv>

                <Form.Control.Feedback
                  type="invalid"
                  style={{ position: "inherit" }}
                  title=""
                >
                  請選擇封面圖片
                </Form.Control.Feedback>
                <Form></Form>
              </Form.Group>
              {submmited ? (
                <DisabledButton disabled>創建活動</DisabledButton>
              ) : (
                <Button type="submit">創建活動</Button>
              )}
            </Form>
          </CreateEventContainer>
        </Container>
      )}
    </Styles>
  );
}

export default CreateEvent;
