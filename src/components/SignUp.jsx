import {
  Button,
  createTheme,
  TextField,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { notification, Tooltip } from "antd";
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

  const [inputs, setInputs] = useState({
    userName: "",
    email: "",
    password: "",
    rePassword: "",
  });

  ////////////
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPass, setIsValidPass] = useState(false);
  const [IsSamePass, setIsSamePass] = useState(false);
  ////////////

  const [regexErr, setRegexErr] = useState(false);

  /////////////////////////////////////
  const handleInputs = (e) => {
    const { name, value } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

  const handleBlurName = (e) => {
    if (validationName(e.target.value)) {
      setIsValidName(false);
    } else {
      setIsValidName(true);
    }
  };

  const handleBlurEmail = (e) => {
    if (isEmail(e.target.value)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };
  const handleBlurPassword = (e) => {
    if (isValidPassword(e.target.value)) {
      setIsValidPass(false);
    } else {
      setIsValidPass(true);
    }
  };
  const handleBlurRePassword = (e) => {
    if (samePassword(e.target.value)) {
      setIsSamePass(false);
    } else {
      setIsSamePass(true);
    }
  };
  /////////////////////////////////////

  const handleSubmit = async () => {
    if (
      inputs.userName.length == 0 ||
      inputs.email.length == 0 ||
      inputs.password.length == 0 ||
      inputs.rePassword.length == 0 ||
      (isValidName, isValidEmail, isValidPass, IsSamePass)
    ) {
      openNotification("top");
    } else {
      try {
        const registerUser = await axios.post(
          "http://localhost:3001/api/user/register",
          {
            name: inputs.userName,
            email: inputs.email.toLowerCase(),
            password: inputs.password,
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

  const turnMessages = () => {
    setIsSamePass(false);
    setIsValidPass(false);
    setIsValidEmail(false);
    setIsValidName(false);
  };

  const cardStyle = {
    height: "36rem",
    width: "30rem",
    borderRadius: "4%",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const textFields = {
    width: isActive ? "16rem" : "20rem",
    marginTop: "2rem",
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
        <div style={cardStyle}>
          <div
            onClick={turnMessages}
            style={{
              height: "36rem",
              width: isActive ? "20rem" : "30rem",
              position: "absolute",
              borderRadius: "4%",
              opacity: 0.2,
              backgroundColor: "black",
            }}
          ></div>
          <h1
            style={{
              color: "#00FF87",
              textAlign: "center",
            }}
          >
            REGISTER
          </h1>

          <ThemeProvider theme={inputTheme}>
            <Tooltip
              placement="top"
              title="Name should have at list an upper case and 3 characters"
              color="#00BDFF"
              open={isValidName}
            >
              <TextField
                onBlur={handleBlurName}
                name="userName"
                autoComplete="off"
                label="User name"
                variant="filled"
                onChange={handleInputs}
                sx={textFields}
              />
            </Tooltip>
            <Tooltip
              placement="top"
              title="Write a valid Email"
              color="#00BDFF"
              open={isValidEmail}
            >
              <TextField
                onBlur={handleBlurEmail}
                name="email"
                autoComplete="off"
                label="Email"
                variant="filled"
                onChange={handleInputs}
                sx={textFields}
              />
            </Tooltip>
            <Tooltip
              placement="top"
              title="It should have at least 8 characters, numbers, uppercase and lowercase"
              color="#00BDFF"
              open={isValidPass}
            >
              <TextField
                onBlur={handleBlurPassword}
                name="password"
                autoComplete="off"
                type="password"
                label="Password"
                variant="filled"
                onChange={handleInputs}
                sx={textFields}
              />
            </Tooltip>

            <Tooltip
              placement="top"
              title="Write the same password"
              color="#00BDFF"
              open={IsSamePass}
            >
              <TextField
                onBlur={handleBlurRePassword}
                name="rePassword"
                autoComplete="off"
                type="password"
                label="Repeat password"
                variant="filled"
                onChange={handleInputs}
                sx={textFields}
              />
            </Tooltip>
          </ThemeProvider>

          <ThemeProvider theme={themeOptions}>
            <Button
              sx={{
                width: "4rem",
                color: "black",
                marginTop: "2rem",
              }}
              disabled={regexErr}
              variant="contained"
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
          </ThemeProvider>
        </div>
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

const inputTheme = createTheme({
  palette: {
    primary: {
      main: "#00FF6E",
    },
    secondary: {
      main: "#00FF6E",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
  },
});
