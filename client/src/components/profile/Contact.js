import React from "react";
import { Link } from "react-router-dom";
import "./contact.css";
import * as logo from "../../images/spotify.png";

const Contact = () => {
  return (
    <section className="contact-main  text-center">
      <header className="contact-header">
        <Link to="/">
          <img src={logo} alt="logo" />
          <h5>StreamWorks</h5>
        </Link>
      </header>
      <article className="main-contact">
        <h1>Thank you for visiting StreamWorks</h1>

        <h5>StreamWorks is a duplicate website inspired by Spotify,</h5>
        <h5>built with the following technologies.</h5>

        <div className="tech-list-div">
          <ul className="tech-list">
            <li className="tech-li">Node/express for the backend.</li>
            <li className="tech-li">MongoDb/GraphQL for the database.</li>
            <li className="tech-li">React/Redux for the frontend.</li>
            <li className="tech-li">Bootstrap/css for the styling.</li>
          </ul>
        </div>
        <h5>StreamWorks was built by a small team of collaborators.</h5>

        <h5>Please feel free to look around.</h5>
        <h5>
          Explore our app, listen to some music, add music to you playlists, and
          please visit us:
        </h5>
      </article>
      <div className="contact-div">
        <ul className="contact-us-li">
          <li>
            <h5>Trevor</h5>
            <a href="https://github.com/tsteer050">GitHub</a>
            <a href="#">LinkedIn</a>
            <a href="mailto:trevor.piano@gmail.com">Email</a>
          </li>
          <li>
            <h5>Shannon</h5>
            <a href="https://github.com/shanp77">GitHub</a>
            <a href="#">LinkedIn</a>
            <a href="mailto:shanp77@hotmail.com">Email</a>
          </li>
          <li>
            <h5>Koy</h5>
            <a href="https://github.com/kscali">GitHub</a>
            <a href="http://www.linkedin.com/in/koy-saeteurn-98169a167">
              LinkedIn
            </a>
            <a href="mailto:kosatun@aol.com">Email</a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Contact;
