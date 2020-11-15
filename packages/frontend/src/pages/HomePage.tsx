import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./../App.scss";

import { accountsClient } from "../utils/accounts";

const HomePage = (): JSX.Element => {
  const [logged, setLogged] = useState<boolean | null>(null);

  async function isUserLoggedIn() {
    const result = await accountsClient.getUser();
    setLogged(result !== null);
  }

  isUserLoggedIn();

  if (logged === true)
    return <Redirect to={`/instances/${window.location.host}/communities/all/posts`} />;
  if (logged === false) return <Redirect to="/login" />;

  return <div></div>;
};

export default HomePage;
