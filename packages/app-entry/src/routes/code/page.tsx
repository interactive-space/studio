import { Helmet } from '@modern-js/runtime/head';
import { Editor } from '@interactive/code-editor';

const CodePage = () => (
  <>
    <Helmet>
      <title>Interactive Code</title>
    </Helmet>
    <main style={{ height: '100%' }}>
      <Editor style={{ height: '100%' }} bordered={false} />
    </main>
  </>
);

export default CodePage;
