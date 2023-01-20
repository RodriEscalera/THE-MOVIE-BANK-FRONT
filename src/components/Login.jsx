import {
  Alert,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../store/user";

function Login() {
  const isActive = useMediaQuery("(max-width:530px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [styledMediaQuery, setStyledMediaQuery] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidAccount, setIsInvalidAccount] = useState(false);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  useEffect(() => {
    isActive
      ? setStyledMediaQuery({
          height: "30rem",
          width: "21rem",
          backgroundColor: "black",
          borderRadius: "4%",
          opacity: "0.2",
          position: "absolute",
        })
      : setStyledMediaQuery({
          height: "30rem",
          width: "30rem",
          backgroundColor: "black",
          borderRadius: "4%",
          opacity: "0.2",
          position: "absolute",
        });
  }, [isActive]);

  const handleSubmit = async () => {
    try {
      const loginUser = await axios.post(
        "https://the-movie-bank-back.onrender.com/api/user/login",
        {
          email: email.toLowerCase(),
          password: password,
        }
      );
      window.localStorage.setItem("token", loginUser.data[1]);
      dispatch(setUser(loginUser.data[0]));
      navigate("/");
    } catch {
      setIsInvalidAccount(true);
    }
  };

  return (
    <>
      {isInvalidAccount ? (
        <Stack
          sx={{
            width: "100%",

            "& .css-xilmwd-MuiPaper-root-MuiAlert-root": {
              backgroundColor: "rgb(187 41 41)",
              color: "white",
            },
          }}
          spacing={2}
        >
          <Alert severity="error">Invalid email or password!</Alert>
        </Stack>
      ) : null}
      <div
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
          <TextField
            sx={{
              "& label": {
                color: "white",
              },

              "& input": {
                color: "white",
              },
              marginTop: "1rem",
              width: "20rem",
            }}
            label="Email"
            variant="filled"
            onChange={handleEmail}
          />
          <TextField
            sx={{
              "& label": {
                color: "white",
              },
              "& input": {
                color: "white",
              },
              marginTop: "1rem",
              width: "20rem",
            }}
            label="Password"
            variant="filled"
            type="password"
            onChange={handlePassword}
          />
        </div>
        <Button
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
      </div>
    </>
  );
}

export default Login;
