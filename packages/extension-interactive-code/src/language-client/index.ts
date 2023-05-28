import { Uri } from 'vscode';
import { LanguageClient } from 'vscode-languageclient/browser';
import { MemFS } from '@/base/memfs';
import { getExtensionContext } from '@/base/context';

export function initializeLanguageClient() {
  const context = getExtensionContext();
  const languageServerUri = Uri.joinPath(context.extensionUri, 'dist/language-server.js');
  const languageServerWorker = new Worker(languageServerUri.toString());
  const languageClient = new LanguageClient(
    'interactive-code-client',
    'Interactive Code Client',
    {
      documentSelector: [{ scheme: MemFS.scheme }],
    },
    languageServerWorker,
  );

  languageClient.start();
}
