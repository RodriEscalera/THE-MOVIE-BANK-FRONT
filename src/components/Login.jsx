import {
  Button,
  createTheme,
  TextField,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../store/user";
import { message } from "antd";
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";
function Login() {
  const isActive = useMediaQuery("(max-width:530px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  ///////////////////////////////////////////////
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [charging, setCharging] = useState(false);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  /////////////////////////////////////////////

  const styledMediaQuery = {
    height: "30rem",
    width: isActive ? "21rem" : "30rem",
    backgroundColor: "black",
    borderRadius: "4%",
    opacity: "0.2",
    position: "absolute",
  };

  const [messageApi, contextHolder] = message.useMessage();

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Invalid email or password",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    eventCharge(true);
    try {
      const loginUser = await axios.post(
        "http://localhost:3001/api/user/login",
        {
          email: email.toLowerCase(),
          password: password,
        }
      );

      window.localStorage.setItem("token", loginUser.data[1]);
      dispatch(setUser(loginUser.data[0]));
      navigate("/");
    } catch {
      eventCharge(false);
      error();
    }
  };

  const variants = {
    initial: {
      top: -100,
    },
    animate: {
      top: 100,
    },
  };
  const eventCharge = (bool) => {
    setCharging(bool);
  };
  return (
    <>
      {contextHolder}

      <motion.div
        variants={variants}
        initial={charging ? "initial" : "animate"}
        animate={charging ? "animate" : "initial"}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <ThemeProvider theme={circleCharge}>
          <CircularProgress />
        </ThemeProvider>
      </motion.div>

      <form
        onSubmit={handleSubmit}
        style={{
          height: "90vh",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={styledMediaQuery}></div>

        <h1
          style={{
            color: "#00FF87",
            marginTop: "1rem",
            textAlign: "center",
            position: "absolute",
            marginBottom: "20rem",
          }}
        >
          LOGIN
        </h1>
        <div
          style={{
            display: "grid",
            flexDirection: "column",
            marginTop: "3rem",
          }}
        >
          <ThemeProvider theme={inputTheme}>
            <TextField
              sx={{
                marginTop: "1rem",
                width: "20rem",
              }}
              label="Email"
              variant="filled"
              onChange={handleEmail}
            />
            <TextField
              sx={{
                marginTop: "1rem",
                width: "20rem",
              }}
              label="Password"
              variant="filled"
              type="password"
              onChange={handlePassword}
            />
          </ThemeProvider>
        </div>
        <Button
          type="submit"
          sx={{
            width: "4rem",
            color: "black",
            backgroundColor: "#00FF87",
            position: "absolute",
            marginTop: "25rem",
            "&:hover": {
              backgroundColor: "#00FF87",
            },
          }}
          onClick={handleSubmit}
          variant="contained"
        >
          SUBMIT
        </Button>
      </form>
    </>
  );
}

export default Login;

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

const circleCharge = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#00FF6E",
    },
  },
});
