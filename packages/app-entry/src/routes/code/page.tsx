import { FC, useMemo } from 'react';
import { Helmet } from '@modern-js/runtime/head';
import { Editor, IExtension } from '@interactive-space/code-editor';
import useSWRImmutable from 'swr/immutable';
import { isDevelopment, isPreview } from '@/utils/env';

const editorBaseUrl =
  isDevelopment || isPreview
    ? 'https://pre.editor.incca.cn'
    : 'https://editor.incca.cn';

const CodePage: FC = () => {
  const { data } = useSWRImmutable('/configuration/editor-extensions');

  const extensions = useMemo<IExtension[]>(() => {
    if (Array.isArray(data?.data)) {
      return data.data;
    }
    return [];
  }, [data]);

  if (extensions.length === 0) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Code</title>
      </Helmet>
      <main style={{ height: '100%' }}>
        <Editor
          editorBaseUrl={editorBaseUrl}
          style={{ height: '100%' }}
          bordered={false}
          extensions={extensions}
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
};

export default CodePage;
