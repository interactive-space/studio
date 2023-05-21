import { workspace } from 'vscode';

interface IWorkspaceContext {
  rootPath: string;
  zipUrl: string;
}

export async function getWorkspaceContext(): Promise<IWorkspaceContext> {
  const workspaceContext: IWorkspaceContext = {
    rootPath: '',
    zipUrl: '',
  };
  workspace.workspaceFolders?.forEach(folder => {
    if (folder.uri.scheme === 'memfs') {
      workspaceContext.rootPath = folder.uri.path.replace(/^\//, '');
      const query = new URLSearchParams(folder.uri.query);
      workspaceContext.zipUrl = query.get('zip') || '';
    }
  });

  return workspaceContext;
}
