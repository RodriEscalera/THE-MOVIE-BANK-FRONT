import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalLanguageOpen } from "../store/modalLanguage";

function Settings() {
  const dispatch = useDispatch();
  const modalLanguage = useSelector((state) => state.modalLanguage);
  const handleChangeLanguage = () => {
    dispatch(setModalLanguageOpen(true));
  };
  return (
    <div
      style={{
        width: "100%",
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        onClick={handleChangeLanguage}
        sx={{
          width: "6rem",
          height: "3rem",
          backgroundColor: "rgb(36, 210, 111)",
          color: "black",
          "&:hover": {
            backgroundColor: "rgb(36, 210, 111)",
          },
        }}
        variant="contained"
      >
        CHANGE LANGUAGE
      </Button>
    </div>
  );
}

export default Settings;
