import { IEditorProps, IExtension, UriComponents } from './editor.definition';

export interface IWorkbenchConfiguration {
  productConfiguration: {
    applicationName?: string;
    version?: string;
    quality?: 'stable' | 'insider';
    nameShort?: string;
    nameLong?: string;

    webEndpointUrlTemplate?: string;
    webviewContentExternalBaseUrlTemplate?: string;

    extensionEnabledApiProposals?: { [extensionId: string]: string[] };
    extensionsGallery?: {
      serviceUrl: string;
      servicePPEUrl?: string;
      searchUrl?: string;
      itemUrl: string;
      publisherUrl: string;
      resourceUrlTemplate: string;
      controlUrl: string;
      nlsBaseUrl: string;
    };
  };
  configurationDefaults: Record<string, string | number | boolean>;
  additionalBuiltinExtensions: UriComponents[];
  workspace?: UriComponents;
}

export function getWorkbenchConfiguration({
  productConfiguration,
  configurationDefaults,
  additionalBuiltinExtensions = [],
  workspace,
}: Partial<IWorkbenchConfiguration>, editorBaseUrl: string): IWorkbenchConfiguration {
  return {
    productConfiguration: {
      version: '1.78.2',
      quality: 'stable',
      applicationName: 'CodeEditor',
      nameShort: 'CodeEditor',
      nameLong: 'CodeEditor',
      webEndpointUrlTemplate: `${editorBaseUrl}/1.78.2`,
      webviewContentExternalBaseUrlTemplate: `${editorBaseUrl}/1.78.2/external-template`,
      ...productConfiguration,
    },
    configurationDefaults: {
      'editor.fontSize': 14,
      'editor.minimap.autohide': true,
      'workbench.startupEditor': 'none',
      ...configurationDefaults,
    },
    additionalBuiltinExtensions: [...additionalBuiltinExtensions],
    workspace,
  };
}

export function convertToWorkbenchExtension(
  extension: IExtension,
): UriComponents {
  const url = new URL(extension.url);

  return {
    scheme: url.protocol.replace(/:$/, ''),
    authority: url.hostname,
    path: url.pathname,
    query: url.search.replace(/^\?/, ''),
  };
}

type APIProposals =
  IWorkbenchConfiguration['productConfiguration']['extensionEnabledApiProposals'];

export function getEnabledApiProposals(extensions: IExtension[]): APIProposals {
  const result: APIProposals = {};
  extensions.forEach(({ name, usedProposedAPI = [] }) => {
    if (usedProposedAPI.length > 0) {
      result[name] = usedProposedAPI;
    }
  });

  return result;
}

export function getThemeConfiguration(
  theme: IEditorProps['theme'],
): Record<string, string> {
  return {
    'workbench.colorTheme':
      theme === 'light' ? 'Default Light Modern' : 'Default Dark Modern',
  };
}
