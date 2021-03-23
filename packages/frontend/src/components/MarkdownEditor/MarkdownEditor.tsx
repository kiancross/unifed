/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { useTheme } from "@material-ui/core";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { MarkdownViewer } from "..";

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

export const MarkdownEditor = (props: MarkdownEditorProps): ReactElement => {
  const theme = useTheme().palette;

  const styleSettings = `         
  .rc-md-editor, .rc-md-editor * {                            
    background-color: ${theme.secondary.main} !important;      
    color: ${theme.text.primary} !important; 
  },
  `;
  return (
    <>
      <style>{styleSettings}</style>
      <Editor
        value={props.value}
        style={props.style}
        onChange={props.onChange}
        htmlClass=" "
        renderHTML={(text) => <MarkdownViewer>{text}</MarkdownViewer>}
      />
    </>
  );
};
