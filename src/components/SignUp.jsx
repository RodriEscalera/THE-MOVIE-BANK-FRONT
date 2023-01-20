import {
  Button,
  createTheme,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
  useMediaQuery,
  ClickAwayListener,
} from "@mui/material";
import { notification } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  isEmail,
  isValidPassword,
  samePassword,
  validationName,
} from "../utils/regex";
function SignUp() {
  const isActive = useMediaQuery("(max-width:530px)");
  const navigate = useNavigate();
  const [styledMediaQuery, setStyledMediaQuery] = useState({});
  /////////////////////////////////////////////////////////////////////////
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  ////////////
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPass, setIsValidPass] = useState(true);
  const [areSamePass, setAreSamePass] = useState(true);
  ////////////

  const [regexErr, setRegexErr] = useState(false);

  /////////////////////////////////////////////////////////////////////////

  const handleUserName = (e) => {
    const userNameInput = e.target.value;
    setUserName(userNameInput);
    validationName(userNameInput)
      ? setIsValidName(true)
      : setIsValidName(false);
  };
  const handleEmail = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    isEmail(emailInput) ? setIsValidEmail(true) : setIsValidEmail(false);
  };
  const handlePassword = (e) => {
    const passwordInput = e.target.value;
    setPassword(passwordInput);
    isValidPassword(passwordInput)
      ? setIsValidPass(true)
      : setIsValidPass(false);
  };

  const handleRepeatPassword = (e) => {
    const passwordInput = e.target.value;
    setRepeatPassword(passwordInput);
    samePassword(password, passwordInput)
      ? setAreSamePass(true)
      : setAreSamePass(false);
  };
  useEffect(() => {
    isActive
      ? setStyledMediaQuery({
          height: "36rem",
          width: "21rem",
          backgroundColor: "black",
          borderRadius: "4%",
          opacity: "0.2",
          position: "absolute",
        })
      : setStyledMediaQuery({
          height: "36rem",
          width: "30rem",
          backgroundColor: "black",
          borderRadius: "4%",
          opacity: "0.2",
          position: "absolute",
        });
  }, [isActive]);

  useEffect(() => {
    if (!isValidPass || !areSamePass || !isValidEmail || !isValidName)
      setRegexErr(true);
    else {
      setRegexErr(false);
    }
  }, [isValidPass, areSamePass, isValidEmail, isValidName]);

  const handleSubmit = async () => {
    if (
      userName.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      repeatPassword.length == 0
    ) {
      openNotification("top");
    } else {
      try {
        const registerUser = await axios.post(
          "https://the-movie-bank-back.onrender.com/api/user/register",
          {
            name: userName,
            email: email.toLowerCase(),
            password: password,
          }
        );
        console.log("success");
        navigate("/login");
      } catch {
        console.log("error");
      }
    }
  };

  const openNotification = (placement) => {
    notification.open({
      description: "Complete all fields please!!",
      placement,
      className: "notification",
      style: {
        backgroundColor: "#585858",
        color: "#00FF87",
      },
    });
  };

  return (
    <>
      <div
        style={{
          height: "90vh",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "3rem",
        }}
      >
        <div style={styledMediaQuery}></div>

        <h1
          style={{
            color: "#00FF87",
            marginTop: "-6rem",
            textAlign: "center",
            position: "absolute",
            marginBottom: "20rem",
          }}
        >
          REGISTER
        </h1>
        <div
          style={{
            display: "grid",
            flexDirection: "column",
          }}
        >
          <TextField
            name="userName"
            autoComplete="off"
            sx={inputStyle}
            label="User name"
            variant="filled"
            onChange={handleUserName}
          />

          <TextField
            name="email"
            autoComplete="off"
            sx={inputStyle}
            label="Email"
            variant="filled"
            onChange={handleEmail}
          />

          <TextField
            name="password"
            autoComplete="off"
            sx={inputStyle}
            type="password"
            label="Password"
            variant="filled"
            onChange={handlePassword}
          />

          <TextField
            name="rePassword"
            autoComplete="off"
            sx={inputStyle}
            type="password"
            label="Repeat password"
            variant="filled"
            onChange={handleRepeatPassword}
          />
        </div>
        <ThemeProvider theme={themeOptions}>
          <Button
            sx={{
              width: "4rem",
              color: "black",

              position: "absolute",
              marginTop: "27rem",
            }}
            disabled={regexErr}
            variant="contained"
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </ThemeProvider>
      </div>
    </>
  );
}

export default SignUp;

const themeOptions = createTheme({
  palette: {
    primary: {
      main: "#00FF87",
    },
    action: {
      disabledBackground: "#858585",
      disabled: "#black",
    },
  },
});

const inputStyle = {
  "& label": {
    color: "white",
  },
  "& input": {
    color: "white",
  },
  "& .css-1wc848c-MuiFormHelperText-root": {
    color: "aqua",
  },
  marginTop: "1rem",
  width: "20rem",
};
