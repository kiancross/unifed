/*
 * CS3099 Group A3
 */

import React from "react";
import math from "remark-math";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import TeX from "@matejmazur/react-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import "katex/dist/katex.min.css";

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
};

const MarkdownViewer = (props: any) => (
  <ReactMarkdown plugins={[math, gfm]} renderers={renderers}>
    {props.children}
  </ReactMarkdown>
);

export default MarkdownViewer;
