/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { Typography, TypographyVariant } from "@material-ui/core";
import math from "remark-math";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import TeX from "@matejmazur/react-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import "react-markdown-editor-lite/lib/index.css";
import "katex/dist/katex.min.css";

interface MarkdownViewerProps {
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

const MarkdownViewer = (props: MarkdownViewerProps): ReactElement => (
  <ReactMarkdown plugins={[math, gfm]} renderers={renderers} className="custom-html-style">
    {props.children}
  </ReactMarkdown>
);

export default MarkdownViewer;
