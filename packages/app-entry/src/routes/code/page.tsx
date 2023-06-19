import { Helmet } from '@modern-js/runtime/head';
import { Editor } from '@interactive-space/code-editor';
import { isDevelopment, isPreview } from '@/utils/env';

const editorBaseUrl =
  isDevelopment || isPreview
    ? 'https://pre.editor.incca.cn'
    : 'https://editor.incca.cn';

const CodePage = () => (
  <>
    <Helmet>
      <title>Code</title>
    </Helmet>
    <main style={{ height: '100%' }}>
      <Editor
        editorBaseUrl={editorBaseUrl}
        style={{ height: '100%' }}
        bordered={false}
        extensions={[
          {
            name: 'interactive-studio.extension-interactive-code',
            url: `${editorBaseUrl}/extensions/interactive-code/1.0/`,
            usedProposedAPI: ['fileSearchProvider', 'textSearchProvider'],
          },
        ]}
        workspace={{
          scheme: 'memfs',
          authority: '',
          path: '/koa',
          query: new URLSearchParams({
            zip: 'https://editor.incca.cn/koa.zip',
          }).toString(),
        }}
      />
    </main>
  </>
);

export default CodePage;
