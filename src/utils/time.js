export const getReformatedLocalTime = (time) => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const localISOTime = new Date(time - tzoffset).toISOString().slice(0, -1);
  const localDate = localISOTime.split("T")[0];
  const localTime = localISOTime.split("T")[1].slice(0, 5);
  return { date: localDate, time: localTime };
};

export const getTomorrowDate = (time) => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const localISOTime = new Date(time + 43200000 - tzoffset)
    .toISOString()
    .slice(0, -1);
  const localDate = localISOTime.split("T")[0];
  return localDate;
};

export const reformatTimestamp = (timestamp) => {
  const getDay = (day) => {
    const dayArray = ["日", "一", "二", "三", "四", "五", "六"];
    return dayArray[day];
  };
  const year = timestamp.toDate().getFullYear();
  const month = timestamp.toDate().getMonth() + 1;
  const date = timestamp.toDate().getDate();
  const day = getDay(timestamp.toDate().getDay());
  const reformatedTime = `${year}-${month}-${date} (${day})`;
  return reformatedTime;
};

export const reformatTimestamp2 = (timestamp) => {
  const getDay = (day) => {
    const dayArray = ["日", "一", "二", "三", "四", "五", "六"];
    return dayArray[day];
  };
  const year = timestamp.toDate().getFullYear();
  const month = timestamp.toDate().getMonth() + 1;
  const date = timestamp.toDate().getDate();
  const day = getDay(timestamp.toDate().getDay());
  const reformatedTime = `${year}/${month}/${date} (${day})`;
  return reformatedTime;
};

export const checkEventPassed = (event) => {
  const startT = event.startTime.seconds * 1000;
  const currentT = new Date().getTime();
  const eventPassed = startT < currentT;
  return eventPassed;
};
