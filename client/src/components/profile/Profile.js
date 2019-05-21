import React from "react";
import "./Profile.css";
import * as profile from "../../images/profile.png";
import { Link } from "react-router-dom";
import Queries from "../graphql/queries";
const { IS_LOGGED_IN } = Queries;

const Profile = () => {
  return (
    <div>
      <div className="bg-div">
        <img src={profile} alt="profile" />
        <h3>account name</h3>
        <Link to="overview">VIEW ACCOUNT</Link>
        <Link to="/helo">HELP</Link>
      </div>
    </div>
  );
};

export default Profile;
