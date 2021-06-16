export const validateEmail = (email, callback) => {
  const validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email.match(validRegex)) {
    callback(true);
    return false;
  } else {
    callback(false);
    return true;
  }
};

export const validatePassword = (password, callback) => {
  if (password.length < 6) {
    callback(true);
    return false;
  } else {
    callback(false);
    return true;
  }
};
