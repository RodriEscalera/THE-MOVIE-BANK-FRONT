import {
  Button,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
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
    try {
      const registerUser = await axios.post(
        "https://the-movie-bank-back.onrender.com/api/user/register",
        {
          name: userName,
          email: email,
          password: password,
        }
      );
      console.log("todo lay");
      navigate("/login");
    } catch {
      console.log("todo mal");
    }
  };

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

  return (
    <>
      <div
        style={{
          height: "90vh",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
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
            marginTop: "3rem",
          }}
        >
          <TextField
            sx={inputStyle}
            label="User name"
            variant="filled"
            helperText="The user name must have at least 1 uppercase and 1 lowercase letter"
            onChange={handleUserName}
          />

          <TextField
            sx={inputStyle}
            label="Email"
            variant="filled"
            helperText="Email must to have @ and . "
            onChange={handleEmail}
          />
          <TextField
            sx={inputStyle}
            type="password"
            label="Password"
            variant="filled"
            helperText="Password must to have at least 6 characters, 1 uppercase letter and 1 special character"
            onChange={handlePassword}
          />

          <TextField
            sx={inputStyle}
            type="password"
            label="Repeat password"
            variant="filled"
            onChange={handleRepeatPassword}
            helperText="Must to be the same password"
          />
        </div>

        <Button
          sx={{
            width: "4rem",
            color: "black",
            backgroundColor: "#00FF87",
            position: "absolute",
            marginTop: "33rem",
            "&:hover": {
              backgroundColor: "#00FF87",
            },
          }}
          disabled={regexErr}
          variant="contained"
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </div>
    </>
  );
}

export default SignUp;
