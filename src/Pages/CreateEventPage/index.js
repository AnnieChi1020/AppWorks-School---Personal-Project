import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import background from "../../images/background.jpg";
import { Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import Autocomplete from "react-google-autocomplete";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import {
  createNewDoc,
  postEventInfo,
  getImageURL,
} from "../../utils/firebase.js";

import { toast } from "react-toastify";
import { successAlertText, errorAlertText } from "../../components/Alert.js";

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
  @media (max-width: 760px) {
    font-size: 14px;
    padding: 5px 15px;
    margin-right: 5px;
  }
`;

const OptionSelected = styled.div`
  line-height: 20px;
  font-size: 1rem;
  padding: 5px 25px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: #636363;
  color: white;
  text-align: center;
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
`;

function CreateEvent() {
  const dispatch = useDispatch();
  const hosterId = useSelector((state) => state.isLogged.userId);

  const [timeIsInvalid, setTimeIsInvalid] = useState(false);
  const [titleIsInvalid, setTitleIsInvalid] = useState(false);
  const [contentIsInvalid, setContentIsInvalid] = useState(false);
  const [addressIsInvalid, setAddressIsInvalid] = useState(false);
  const [imageIsInvalid, setImageIsInvalid] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState("");

  const getCurrentTime = () => {
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    const localISOTime = new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, -1);
    const localDate = localISOTime.split("T")[0];
    const localTime = localISOTime.split("T")[1].slice(0, 5);
    return { date: localDate, time: localTime };
  };

  const getTomorrow = () => {
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    const localISOTime = new Date(Date.now() + 43200000 - tzoffset)
      .toISOString()
      .slice(0, -1);
    const localDate = localISOTime.split("T")[0];
    return localDate;
  };

  const [eventTime, setEventTime] = useState({
    startDate: getTomorrow(),
    startTime: getCurrentTime().time,
    endDate: getTomorrow(),
    endTime: getCurrentTime().time,
  });

  const [address, setAddress] = useState("台灣");

  const [tags, setTags] = useState([
    { name: "社會福利", id: "社會福利", select: false },
    { name: "文化教育", id: "文化教育", select: false },
    { name: "環境保護", id: "環境保護", select: false },
    { name: "生態保護", id: "生態保護", select: false },
  ]);

  const getGeopoint = async (address) => {
    let location;
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBSxAwCKVnvEIIRw8tk4y0KAjaUjn3Zn18`
    )
      .then((res) => res.json())
      .then((result) => {
        location = result.results[0];
      });
    return location;
  };

  let history = useHistory();

  const handleTagClick = (tag) => {
    let selectedId = tag.target.id;
    setTags(
      tags.map((tag) =>
        tag.id === selectedId && tag.select === false
          ? { ...tag, select: true }
          : tag.id === selectedId && tag.select === true
          ? { ...tag, select: false }
          : tag
      )
    );
  };

  const getSelectedTags = (tags) => {
    let selectedTags = [];
    tags.forEach((tag) => {
      if (tag.select === true) {
        selectedTags.push(tag.name);
      }
    });
    return selectedTags;
  };

  useEffect(() => {
    const selectedTags = getSelectedTags(tags);
    dispatch({ type: "ADD_TAGS", data: selectedTags });
  }, [tags]);

  const handleAddressChange = (e) => {
    const address = e.target.value;
    setAddress(address);
  };

  const constructEventData = async (inputs) => {
    const imageUrl = await getImageURL(hosterId, inputs.coverImage.files[0]);
    const geopoint = await getGeopoint(address);
    console.log(geopoint);
    const newEventRef = createNewDoc();
    console.log(imageUrl);
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
    if (input === "startDate") {
      setEventTime({ ...eventTime, startDate: value });
    } else if (input === "startTime") {
      setEventTime({ ...eventTime, startTime: value });
    } else if (input === "endDate") {
      setEventTime({ ...eventTime, endDate: value });
    } else {
      setEventTime({ ...eventTime, endTime: value });
    }
  };

  useEffect(() => {
    setTimeIsInvalid(false);
  }, []);

  const checkIfTimeIsInvalid = () => {
    const start = new Date(
      eventTime.startDate + " " + eventTime.startTime
    ).valueOf();
    const end = new Date(eventTime.endDate + " " + eventTime.endTime).valueOf();
    console.log(start < end);
    if (start >= end) {
      setTimeIsInvalid(true);
    } else {
      setTimeIsInvalid(false);
    }
  };

  // const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const inputs = event.currentTarget;

    if (!inputs.title.value) {
      setTitleIsInvalid(true);
    } else {
      setTitleIsInvalid(false);
    }

    if (!inputs.content.value) {
      setContentIsInvalid(true);
    } else {
      setContentIsInvalid(false);
    }

    checkIfTimeIsInvalid();

    if (!inputs.address.value) {
      setAddressIsInvalid(true);
    } else {
      setAddressIsInvalid(false);
    }

    if (!inputs.coverImage.files[0]) {
      setImageIsInvalid(true);
    } else {
      setImageIsInvalid(false);
    }

    event.preventDefault();
    event.stopPropagation();

    if (inputs.checkValidity() === true && !timeIsInvalid) {
      const eventData = await constructEventData(inputs);
      console.log(eventData);
      await postEventInfo(eventData.id, eventData.data);
      toast.success(successAlertText("已創建志工活動"), {
        position: toast.POSITION.TOP_CENTER,
      });
      history.push("/events");
    } else {
      toast.error(errorAlertText("請確認活動資料"));
    }
  };

  const customAddressSelector = React.forwardRef(
    ({ children, onChange }, ref) => {
      return (
        <GooglePlacesAutocomplete
          apiKey="AIzaSyC9Rq_urtS76m8vtjJzBzCmcYIhYiwPMYQ"
          selectProps={{
            selectedAddress,
            onChange: setSelectedAddress,
          }}
        />
      );
    }
  );

  useEffect(() => {
    console.log(selectedAddress);
  }, [selectedAddress]);

  return (
    <Styles>
      <Container className="container-xl">
        <Background />
        <Mask />
        <CreateEventContainer>
          <Form
            className="px-0 py-3 p-4"
            noValidate
            // validated={validated}
            onSubmit={handleSubmit}
          >
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
                    defaultValue={getTomorrow()}
                    min={getTomorrow()}
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
                    defaultValue={getCurrentTime().time}
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
                    defaultValue={getTomorrow()}
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
                    defaultValue={getCurrentTime().time}
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
                  tag.select === true ? (
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

              {/* <Form.Control
                type="text"
                required
                onChange={(e) => handleAddressChange(e)}
                isInvalid={addressIsInvalid}
                className="mb-1"
              ></Form.Control> */}
              <Form.Control
                as={customAddressSelector}
                className="mb-1"
              ></Form.Control>
              {/* <GooglePlacesAutocomplete
                placeholder="地址"
                apiKey="AIzaSyC9Rq_urtS76m8vtjJzBzCmcYIhYiwPMYQ"
                selectProps={{
                  selectedAddress,
                  onChange: setSelectedAddress,
                }}
              /> */}
              <Form.Control.Feedback
                type="invalid"
                style={{ position: "inherit" }}
              >
                請填寫正確地址
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Map
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBSxAwCKVnvEIIRw8tk4y0KAjaUjn3Zn18
    &q=${address}`}
              ></Map>
            </Form.Group>
            <Form.Group controlId="coverImage">
              <Form.Label>上傳活動封面</Form.Label>
              <Form.Control
                type="file"
                required
                className="mb-1"
                isInvalid={imageIsInvalid}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ position: "inherit" }}
              >
                請選擇封面圖片
              </Form.Control.Feedback>
              <Form></Form>
            </Form.Group>
            {/* <PlacesAutocomplete
          // value={this.state.address}
          // onChange={this.handleChange}
          // onSelect={this.handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input",
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete> */}
            <Button type="submit">創建活動</Button>
          </Form>
        </CreateEventContainer>
      </Container>
    </Styles>
  );
}

export default CreateEvent;
