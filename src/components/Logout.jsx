import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../store/user";
function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    window.localStorage.removeItem("token");
    dispatch(
      setUser({
        id: null,
        email: null,
        name: null,
      })
    );
    navigate("/");
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{ color: "white", marginBottom: "2rem", textAlign: "center" }}
      >
        Wanna logout?
      </Typography>
      <Button
        sx={{
          backgroundColor: "rgb(36, 210, 111)",
          color: "black",
          "&:hover": {
            backgroundColor: "rgb(36, 210, 111)",
          },
        }}
        onClick={handleLogOut}
      >
        Logout
      </Button>
    </div>
  );
}

export default Logout;
