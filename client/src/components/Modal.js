import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Modal = () => {
  return (
    <Fragment>
      <div className="modal-header">
        <h1>StreamWorks</h1>
      </div>
      <div className="modal-body">
        <h1>StreamWorks is Free</h1>
        <ul className="modal-list">
          <li className="modal-li">No credit card, ever</li>
          <li className="modal-li">Create a playlist</li>
          <li className="modal-li">Play your favorite music</li>
        </ul>
        <div className="modal-sign-in">
          <Link className="modal-signup" to="/signup">
            SIGN UP FREE
          </Link>
          <Link className="modal-login" to="/login">
            LOG IN
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
