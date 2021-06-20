export const getGeopoint = async (address) => {
  let location;
  await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLEMAP}`
  )
    .then((res) => res.json())
    .then((result) => {
      location = result.results[0];
    });
  return location;
};
