import type { CSSProperties } from 'react';

export interface IEditorProps {
  theme?: 'dark' | 'light';
  workspace?: UriComponents;
  bordered?: boolean;
  className?: string;
  style?: CSSProperties;
  extensions?: IExtension[];
}

export interface IExtension {
  /** 扩展名称 */
  name: string;
  /** 扩展 URL */
  url: string;
  /**
   * 如果使用了处于提案状态的 API，通过 usedProposedAPI 进行配置
   */
  usedProposedAPI?: string[];
}

export interface UriComponents {
  scheme: string;
  authority: string;
  path: string;
  query?: string;
  fragment?: string;
}
