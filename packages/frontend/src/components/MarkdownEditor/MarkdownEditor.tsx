/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
   * Function called each time the user makes a change to the editor.
   */
  onChange?: (
    data: {
      text: string;
      html: string;
    },
    event?: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;

  /**
   * Styling properties for the editor.
   */
  style?: React.CSSProperties;

  /**
   * Initial content displayed in the editor.
   */
  value?: string;
}

/**
 * Markdown text editor used to create/edit posts and comments.
 *
 * Outline:
 *
 *  - Users are shown the raw markdown that they have typed.
 *
 *  - A toolbar at the top of the editor diplays icons that the user can click to
 *    insert the desired element e.g. a table or heading.
 *
 * @param props Properties passed to the component. See [[`MarkdownEditorProps`]].
 *
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
