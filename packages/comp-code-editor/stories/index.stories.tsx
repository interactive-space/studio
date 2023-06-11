import React from 'react';
import { Editor } from '@interactive-space/code-space';

export const ThemeDark = () => <Editor style={{ height: 600 }} />;

export const ThemeLight = () => (
  <Editor theme="light" style={{ height: 600 }} />
);

export const InteractiveCode = () => (
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
