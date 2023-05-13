import { useRef } from 'react';
import { IEditorProps } from './base/editor.definition';
import iframeContent from './editor.html';

export type { IEditorProps };

export function Editor({
  className,
  style,
  bordered = true,
}: IEditorProps): JSX.Element {
  const editorRef = useRef<Window>();
  const initEditor = async (): Promise<void> => {
    if (!editorRef.current) {
      return;
    }
    editorRef.current.document.open();
    editorRef.current.document.write(iframeContent);
    editorRef.current.document.close();
  };

  return (
    <div
      style={{
        border: bordered ? '1px solid rgb(208, 215, 222)' : undefined,
        ...style,
      }}
    >
      <iframe
        ref={(iframeNode): void => {
          if (iframeNode?.contentWindow && !editorRef.current) {
            editorRef.current = iframeNode.contentWindow;
            initEditor();
          }
        }}
        className={className}
        style={{
          border: 'none',
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
