const isEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const validationName = (name) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z]){1,15}(\S*)$/g;

  return regex.test(name);
};

const isValidPassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/g;
  return regex.test(password);
};

const samePassword = (password1, password2) => {
  return password1 === password2;
};

export { isEmail, isValidPassword, samePassword, validationName };
