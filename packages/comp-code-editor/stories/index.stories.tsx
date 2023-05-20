import React from 'react';
import { Editor } from '@interactive/code-editor';

export const Default = () => (
  <Editor
    style={{ height: 600 }}
    extensions={[
      {
        name: 'interactive-studio.extension-interactive-code',
        url: 'https://editor.incca.cn/extensions/interactive-code/1.0/',
      },
    ]}
  />
);

export default {
  title: 'CodeEditor',
};
