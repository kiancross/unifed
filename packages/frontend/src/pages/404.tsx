import React from "react";
import { Link } from "react-router-dom";

const buttonStyle = "Submit-button";

const PageNotFound = (): JSX.Element => {
  return (
    <div>
      <h1>Whoops!</h1>
      <Link to="/home">
        <button className={buttonStyle}> Take me Home! </button>
      </Link>
    </div>
  );
};

export default PageNotFound;
