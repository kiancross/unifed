/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { Typography } from "@material-ui/core";
import MarkdownViewer from "../../components/MarkdownViewer";

interface MarkdownEditorProps {
  onChange?: (
    data: {
      text: string;
      html: string;
    },
    event?: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  style?: React.CSSProperties;
}

const MarkdownEditor = (props: MarkdownEditorProps): ReactElement => {
  return (
    <Editor
      style={props.style}
      onChange={props.onChange}
      renderHTML={(text) => (
        <Typography variant="body2">
          <MarkdownViewer>{text}</MarkdownViewer>
        </Typography>
      )}
    />
  );
};

export default MarkdownEditor;
