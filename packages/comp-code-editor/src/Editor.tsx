import React, { useRef } from 'react';
import { IEditorProps } from './base/editor.definition';
import { InternalEvent } from './base/event';
import { Messenger } from './base/Messenger';
import {
  convertToWorkbenchExtension,
  getEnabledApiProposals,
  getWorkbenchConfiguration,
} from './base/workbench';
import iframeContent from './editor.html';

export type { IEditorProps };

export function Editor({
  className,
  style,
  bordered = true,
  extensions = [],
}: IEditorProps): JSX.Element {
  const editorRef = useRef<Window>();
  const messengerRef = useRef<Messenger>();

  const initEditor = async (): Promise<void> => {
    const { current: editor } = editorRef;
    const { current: messenger } = messengerRef;
    if (!editor || !messenger) {
      return;
    }
    editor.document.open();
    const content = iframeContent.replace(
      '{{receiverId}}',
      messenger.receiverId,
    );
    editor.document.write(content);
    editor.document.close();

    await messenger.handshake();
    const customExtensions = extensions.map(convertToWorkbenchExtension);
    const apiProposals = getEnabledApiProposals(extensions);
    messenger.send(
      InternalEvent.WorkbenchInit,
      getWorkbenchConfiguration({
        additionalBuiltinExtensions: customExtensions,
        productConfiguration: {
          extensionEnabledApiProposals: apiProposals,
        },
      }),
    );
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
            messengerRef.current = new Messenger(
              iframeNode.contentWindow,
              Messenger.getReceiverId(),
            );
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
