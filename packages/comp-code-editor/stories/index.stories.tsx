import React from 'react';
import { Editor } from '@interactive-space/code-editor';

const editorBaseUrl = 'https://editor.incca.cn';

export const ThemeDark = () => (
  <Editor editorBaseUrl={editorBaseUrl} style={{ height: 600 }} />
);

export const ThemeLight = () => (
  <Editor editorBaseUrl={editorBaseUrl} theme="light" style={{ height: 600 }} />
);

export const InteractiveCode = () => (
  <Editor
    editorBaseUrl={editorBaseUrl}
    style={{ height: 600 }}
    extensions={[
      {
        name: 'interactive-studio.extension-interactive-code',
        url: `${editorBaseUrl}/extensions/interactive-code/1.0/`,
      },
    ]}
  />
);

export default {
  title: 'CodeEditor',
};
