import React from "react";
import PostEditor from "../components/PostEditor";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./../App.scss";

interface Params {
  server: string;
  community: string;
}

const MakePost = () => {
  const { community, server } = useParams<Params>();

  return (
    <div>
      <PostEditor community={community} server={server} />
      <Link to="/home">
        <button className="Submit-button">Back to home</button>
      </Link>
    </div>
  );
};

export default MakePost;
