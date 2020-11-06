import React from "react";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import "./../App.scss";

export default function App() {
  const mdEditor = React.useRef(null);
  const [value, setValue] = React.useState("Write here");

  const handleClick = () => {
    if (mdEditor.current) {
        //send query to db
      alert(mdEditor.current.getMdValue());
    }
  };

  const handleEditorChange = ({ html, text }) => {
    const newValue = text.replace(/\d/g, "");
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <div>
      <Editor
        ref={mdEditor}
        value={value}
        style={{
          height: "300px"
        }}
        onChange={handleEditorChange}
        renderHTML={text => <ReactMarkdown source={text} />}
      />
      <button className="Submit-button" onClick={handleClick}>Submit Post</button>
    </div>
  );
}
