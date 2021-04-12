/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { useTheme } from "@material-ui/core";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { MarkdownViewer } from "..";

/**
 * Properties for the [[`MarkdownEditor`]] component.
 * 
 * @internal
 */
export interface MarkdownEditorProps {
  /**
   * Function to update the text the user has typed.
   */
  onChange?: (
    data: {
      text: string;
      html: string;
    },
    event?: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;

  /**
   * Styling for the editor.
   */
  style?: React.CSSProperties;

  /**
   * Text shown in the editor.
   */
  value?: string;
}

/**
 * Markdown text editor used to make/edit posts and comments.
 *
 * Outline:
 *
 *  - Users are shown the raw text they have typed.
 *
 *  - A toolbar at the top of the editor diplays icons that the user can click to insert the desired element e.g. a table or heading.
 *
 * @param props Properties passed to the component. See [[`MarkdownEditorProps`]].
 * @internal
 */
export function MarkdownEditor(props: MarkdownEditorProps): ReactElement {
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
}
