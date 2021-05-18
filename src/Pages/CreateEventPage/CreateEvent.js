import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
// import { GoogleApiWrapper } from "google-maps-react";
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import {
  createNewDoc,
  postEventDetailtoDoc,
  getImageURL,
} from "../../utils/firebase.js";

import React, { useEffect, useState } from "react";

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  margin: 0 auto;
  margin-top: 20px;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 8px;
  border: solid 1px #979797;
`;

const Field = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const FieldName = styled.label`
  width: 80px;
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
  margin-right: 30px;
`;

const FieldInput = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
`;

const TextInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 8px;
  border: solid 1px #979797;
  padding: 0 4px;
`;

const SelectInput = styled.select`
  width: 100px;
  height: 30px;
  border-radius: 8px;
  border: solid 1px #979797;
  padding: 0 4px;
`;

const SubmitButton = styled.button`
  width: 80px;
  height: 30px;
  margin-top: 20px;
`;
const Map = styled.div`
  height: 30vh;
  width: 40vh;
`;

const Option = styled.div`
  line-height: 14px;
  font-size: 14px;
  padding: 5px 13px;
  border: solid 1px #979797;
  border-radius: 20px;
  margin-right: 5px;
`;

const OptionSelected = styled.div`
  line-height: 14px;
  font-size: 14px;
  padding: 5px 13px;
  border: solid 1px #979797;
  border-radius: 20px;
  margin-right: 5px;
  background-color: #636363;
  color: white;
`;

const constructHourArray = () => {
  let hourArray = [];
  for (let i = 0; i < 10; i++) {
    hourArray.push({ name: `0${i}`, value: i });
  }
  for (let i = 10; i < 24; i++) {
    hourArray.push({ name: `${i}`, value: i });
  }
  return hourArray;
};

const constructMinuteArray = () => {
  let minuteArray = [
    { name: `00`, value: 0 },
    { name: `05`, value: 5 },
  ];
  let minute = 5;
  for (let i = 0; i < 10; i++) {
    minute += 5;
    minuteArray.push({ name: `${minute}`, value: minute });
  }
  return minuteArray;
};

function CreateEvent() {
  // const initEvnetInput = {eventName:"",};
  // const [eventInput, setEventInput] = useState(initEvnetInput);
  const [eventName, setEventName] = useState("");
  const [eventContent, setEventContent] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startHour, setStartHour] = useState(0);
  const [startMinute, setStartMinute] = useState(0);
  const [endHour, setEndHour] = useState("00");
  const [endMinute, setEndMinute] = useState("00");
  const [city, setCity] = useState("台北市");
  const [address, setAddress] = useState("");
  // const [geopoint, setGeopoint] = useState("");
  const [geoAddress, setGeoAddress] = useState("");
  const [file, setFile] = useState(null);

  const [tags, setTags] = useState([
    { name: "社會福利", id: "socialWelfare", select: false },
    { name: "文化教育", id: "cultureEducation", select: false },
    { name: "環境保護", id: "environment", select: false },
    { name: "生態保護", id: "conservation", select: false },
  ]);

  const hourArray = constructHourArray();
  const minuteArray = constructMinuteArray();
  const cityArray = [
    "台北市",
    "新北市",
    "桃園市",
    "新竹縣",
    "苗栗縣",
    "台中市",
    "彰化縣",
    "雲林縣",
    "嘉義縣",
    "台南市",
    "高雄市",
    "屏東縣",
    "宜蘭縣",
    "花蓮縣",
    "台東縣",
  ];

  const getGeopoint = (city, address) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city},${address}&key=AIzaSyBSxAwCKVnvEIIRw8tk4y0KAjaUjn3Zn18`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result.results[0]);
        // setGeopoint(result.results[0].geometry.location);
        setGeoAddress(result.results[0]);
      });
  };

  useEffect(() => {
    getGeopoint(city, address);
  }, [city, address]);

  const createEventDetails = (id, imageURL) => {
    return {
      eventId: id,
      eventTitle: eventName,
      eventContent: eventContent,
      // eventLocation: geopoint,
      eventAddress: geoAddress,
      eventCoverImage: imageURL,
      startTime: new Date(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate(),
        startHour,
        startMinute,
        0
      ),
      endTime: new Date(
        endDate.getUTCFullYear(),
        endDate.getUTCMonth(),
        endDate.getUTCDate(),
        endHour,
        endMinute,
        0
      ),
      eventStatus: 0,
      eventTags: getSelectedTags(tags),
      hosterId: "szKr1hWragbubtIilQnV",
      resultImage: [],
      resultContent: "",
    };
  };

  let history = useHistory();
  async function handelClickSubmit() {
    const imageUrl = await getImageURL(file);
    const newEventRef = createNewDoc();
    const eventDetail = createEventDetails(newEventRef.id, imageUrl);
    console.log(eventDetail);
    const eventId = await postEventDetailtoDoc(newEventRef, eventDetail);
    alert("已創建志工活動");
    history.go(0);
    console.log(eventId);
  }

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
      tag.select === true ? selectedTags.push(tag.id) : console.log("none");
    });
    return selectedTags;
  };

  // let map;
  // const initMap = () => {
  //   map = new google.maps.Map(document.getElementById("map"), {
  //     center: { lat: 40.689104, lng: -74.044599 },
  //     zoom: 16,
  //   });
  // };

  return (
    <Wrapper>
      <Field>
        <FieldName>活動名稱</FieldName>
        <FieldInput>
          <TextInput onChange={(e) => setEventName(e.target.value)}></TextInput>
        </FieldInput>
      </Field>
      <Field>
        <FieldName>活動內容</FieldName>
        <FieldInput>
          <TextInput
            onChange={(e) => setEventContent(e.target.value)}
          ></TextInput>
        </FieldInput>
      </Field>
      <Field>
        <FieldName>開始時間</FieldName>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy/MM/dd (EEE)"
          showYearDropdown
          scrollableMonthYearDropdown
        />
        <SelectInput onChange={(e) => setStartHour(e.target.value)}>
          {hourArray.map((hour, hourId) => (
            <option value={hour.value} key={hourId}>
              {hour.name}
            </option>
          ))}
        </SelectInput>
        <SelectInput onChange={(e) => setStartMinute(e.target.value)}>
          {minuteArray.map((minute, minuteId) => (
            <option value={minute.value} key={minuteId}>
              {minute.name}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field>
        <FieldName>結束時間</FieldName>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy/MM/dd (EEE)"
          showYearDropdown
          scrollableMonthYearDropdown
        />
        <SelectInput onChange={(e) => setEndHour(e.target.value)}>
          {hourArray.map((hour, hourId) => (
            <option value={hour.value} key={hourId}>
              {hour.name}
            </option>
          ))}
        </SelectInput>
        <SelectInput onChange={(e) => setEndMinute(e.target.value)}>
          {minuteArray.map((minute, minuteId) => (
            <option value={minute.value} key={minuteId}>
              {minute.name}
            </option>
          ))}
        </SelectInput>
      </Field>
      <Field>
        <FieldName>活動地址</FieldName>
        <SelectInput onChange={(e) => setCity(e.target.value)}>
          {cityArray.map((city, cityId) => (
            <option value={city} key={cityId}>
              {city}
            </option>
          ))}
        </SelectInput>
        <FieldInput>
          <TextInput onChange={(e) => setAddress(e.target.value)}></TextInput>
        </FieldInput>
      </Field>
      <Map></Map>
      <Field>
        <FieldName>活動類型</FieldName>
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
            <Option id={tag.id} key={index} onClick={(e) => handleTagClick(e)}>
              {tag.name}
            </Option>
          )
        )}
      </Field>
      <Field>
        <FieldName>封面圖片</FieldName>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </Field>
      <SubmitButton onClick={handelClickSubmit}>創建活動</SubmitButton>
    </Wrapper>
  );
}

export default CreateEvent;
