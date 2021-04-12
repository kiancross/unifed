/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import { Typography, TypographyVariant } from "@material-ui/core";
import math from "remark-math";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import TeX from "@matejmazur/react-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import "react-markdown-editor-lite/lib/index.css";
import "katex/dist/katex.min.css";

/**
 * Properties for the [[`MarkdownViewer`]] component.
 *
 * @internal
 */
export interface MarkdownViewerProps {
  /**
   * The raw markdown to be rendered.
   */
  children: string;
}

const renderers = {
  inlineMath({ value }: { value: string }) {
    return <TeX math={value} />;
  },
  math({ value }: { value: string }) {
    return <TeX math={value} block />;
  },
  code({ language, value }: { language: string; value: string }) {
    if (!value) return null;

    return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
  },
  paragraph({ children }: { children: ReactElement }) {
    return (
      <Typography color="textPrimary" variant="body1">
        {children}
      </Typography>
    );
  },
  heading({ children, level }: { children: ReactElement; level: number }) {
    return (
      <Typography color="textPrimary" variant={`h${level}` as TypographyVariant}>
        {children}
      </Typography>
    );
  },
};

/**
 * Used to display raw markdown as rendered HTML to the user.
 *
 * This is used for comments and posts when they are displayed.
 *
 * @param props Properties passed to the component. See [[`MarkdownViewerProps`]].
 *
 * @internal
 */
export function MarkdownViewer(props: MarkdownViewerProps): ReactElement {
  return (
    <ReactMarkdown plugins={[math, gfm]} renderers={renderers} className="custom-html-style">
      {props.children}
    </ReactMarkdown>
  );
}
