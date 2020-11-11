import React from "react"
import PostEditor from "../components/PostEditor" 
import { Link } from "react-router-dom";
import "./../App.scss";

const CreatePost = () => {
    return (
        <div>
            <PostEditor />
            <Link to="/home">
                <button className="Submit-button">
                    Back to home
                </button>
            </Link>
        </div>
    )
}

export default CreatePost