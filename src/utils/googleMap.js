export const getGeopoint = async (address) => {
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
