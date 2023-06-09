import { ExtensionContext, window } from 'vscode';
import { getWorkspaceContext, setExtensionContext } from '@/base/context';
import { MemFS } from '@/base/memfs';
import { WebviewProvider } from '@/base/Webview/Provider';
import { initializeLayout } from '@/base/layout';
import { UnZip } from '@/base/unzip';
import { initializeLanguageClient } from '@/language-client';

export async function activate(context: ExtensionContext): Promise<void> {
  setExtensionContext(context);

  initializeLayout();

  const workspaceContext = await getWorkspaceContext();

  const memfs = new MemFS(workspaceContext.rootPath);
  context.subscriptions.push(memfs);

  const unzip = new UnZip(workspaceContext.zipUrl);
  unzip.loadFileToWorkspace(memfs);

  const webviewProvider = new WebviewProvider({ pathname: '/chat' });
  context.subscriptions.push(
    window.registerWebviewViewProvider('interactive-code-chat', webviewProvider, {
      webviewOptions: { retainContextWhenHidden: true },
    }),
  );

  initializeLanguageClient();
}

export function deactivate() {}
