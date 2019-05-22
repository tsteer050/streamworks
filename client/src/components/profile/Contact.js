import React from "react";
import "./contact.css";
import * as logo from "../../images/spotify.png";

const Contact = () => {
  return (
    <section className="contact-main  text-center">
      <header className="contact-header">
        <img src={logo} alt="logo" />
        <h5>StreamWorks</h5>
      </header>
      <article className="main-contact">
        <h3>Thank </h3>
      </article>
      <div className="contact-div">
        <ul className="contact-us-li">
          <li>
            <h5>Trevor</h5>
          </li>
          <li>
            <h5>Shannon</h5>
          </li>
          <li>
            <h5>Koy</h5>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Contact;
