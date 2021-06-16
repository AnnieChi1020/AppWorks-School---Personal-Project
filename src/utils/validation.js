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

export const validatePhoneNum = (phoneNum, callback) => {
  const phoneno = /^[09]{2}[0-9]{8}$/;
  if (!phoneNum.match(phoneno)) {
    callback(true);
    return false;
  } else {
    callback(false);
    return true;
  }
};

export const validateName = (name, callback) => {
  if (!name) {
    callback(true);
    return false;
  } else {
    callback(false);
    return true;
  }
};
