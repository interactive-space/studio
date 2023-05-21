import { ExtensionContext } from 'vscode';
import { MemFS } from './base/memfs';
import { getWorkspaceContext } from './base/context';
import { UnZip } from './base/unzip';

export async function activate(context: ExtensionContext): Promise<void> {
  const workspaceContext = await getWorkspaceContext();

  const memfs = new MemFS(workspaceContext.rootPath);
  context.subscriptions.push(memfs);

  const unzip = new UnZip(workspaceContext.zipUrl);
  unzip.loadFileToWorkspace(memfs);
}

export function deactivate() {}
