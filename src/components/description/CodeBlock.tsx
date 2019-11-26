/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
// import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = (props:any) => {
  const {value} = props;
  return (
    <SyntaxHighlighter language="yaml" showLineNumbers={true} wrapLines={true}>
      {value}
    </SyntaxHighlighter>
  );
};

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
};


export default CodeBlock;
