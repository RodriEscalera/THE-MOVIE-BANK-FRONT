import { Modal } from "antd";
import React from "react";
import spainIcon from "../assets/spainIcon.png";
import ukIcon from "../assets/ukIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { setModalLanguageOpen } from "../store/modalLanguage";
import { setRegion } from "../store/region";
function ModalLanguage() {
  const ModalLanguage = useSelector((state) => state.modalLanguage);
  const dispatch = useDispatch();

  const setSpanish = () => {
    dispatch(setRegion("ESPAÑOL"));
    window.localStorage.setItem("region", "ESPAÑOL");
    dispatch(setModalLanguageOpen(false));
  };
  const setEnglish = () => {
    dispatch(setRegion("ENGLISH"));
    window.localStorage.setItem("region", "ENGLISH");
    dispatch(setModalLanguageOpen(false));
  };
  return (
    <Modal
      style={{ marginTop: "5rem" }}
      title="Select a language"
      open={ModalLanguage}
      footer={[]}
    >
      <div onClick={setEnglish} className="option">
        <h1>ENGLISH</h1>
        <img src={ukIcon} alt="uk" />
      </div>
      <div onClick={setSpanish} className="option">
        <h1>ESPAÑOL</h1>
        <img src={spainIcon} alt="spain" />
      </div>
    </Modal>
  );
}

export default ModalLanguage;
