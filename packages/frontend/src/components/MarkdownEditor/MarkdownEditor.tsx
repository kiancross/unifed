/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
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
  value?: string;
}

const MarkdownEditor = (props: MarkdownEditorProps): ReactElement => {
  return (
    <Editor
      value={props.value}
      style={props.style}
      onChange={props.onChange}
      renderHTML={(text) => <MarkdownViewer>{text}</MarkdownViewer>}
    />
  );
};

export default MarkdownEditor;
