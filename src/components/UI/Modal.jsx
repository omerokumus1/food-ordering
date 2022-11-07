import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
}

function ModalOverlay(props) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

const overlayElement = document.getElementById('overlays');

function Modal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick} />,
        overlayElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overlayElement
      )}
    </React.Fragment>
  );
}

export default Modal;
