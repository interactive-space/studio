import { Helmet } from '@modern-js/runtime/head';
import { Editor } from '@interactive/code-editor';

const CodePage = () => (
  <>
    <Helmet>
      <title>Interactive Code</title>
    </Helmet>
    <main style={{ height: '100%' }}>
      <Editor
        style={{ height: '100%' }}
        bordered={false}
        extensions={[
          {
            name: 'interactive-studio.extension-interactive-code',
            url: 'https://editor.incca.cn/extensions/interactive-code/1.0/',
          },
        ]}
      />
    </main>
  </>
);

export default CodePage;
