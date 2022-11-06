import { Fragment } from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onHide} />;
};

const Overlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children} </div>
    </div>
  );
};

const portaElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(<Backdrop onHide={props.onHide} />, portaElement)}
      {ReactDom.createPortal(
        <Overlay>{props.children} </Overlay>,
        portaElement
      )}
    </Fragment>
  );
};

export default Modal;
