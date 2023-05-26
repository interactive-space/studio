import type { WebviewView, WebviewViewProvider } from 'vscode';
import { DeferredPromise } from '@open-draft/deferred-promise';
import { EventListener, EventName, WebviewContainer } from './Container';

interface IWebviewProviderOptions {
  pathname: string;
}

export class WebviewProvider implements WebviewViewProvider {
  private view: DeferredPromise<WebviewView>;
  private container: DeferredPromise<WebviewContainer>;
  private pathname: string;

  constructor({ pathname }: IWebviewProviderOptions) {
    this.pathname = pathname;
    this.view = new DeferredPromise();
    this.container = new DeferredPromise();
  }

  resolveWebviewView(webviewView: WebviewView): void {
    const { webview } = webviewView;
    this.container.resolve(new WebviewContainer({ webview, pathname: this.pathname, }));
    this.view.resolve(webviewView);
  }

  /**
   * 发送事件到 Webview Container
   * @param {EventName} eventName - 事件名称
   * @param {unknown} payload - 事件数据
   */
  async emit(eventName: EventName, payload?: unknown): Promise<void> {
    const container = await this.container;
    container.emit(eventName, payload);
  }

  /**
   * 添加 Webview Container 事件监听器
   * @param {EventName} eventName - 事件名称
   * @param {EventListener} listener - 监听器
   */
  async addEventListener(eventName: EventName, listener: EventListener): Promise<void> {
    const container = await this.container;
    container.addEventListner(eventName, listener);
  }

  /**
   * 移除 Webview Container 事件监听器
   * @param {EventName} eventName - 事件名称
   * @param {EventListener} listener - 监听器
   */
  async removeEventListener(eventName: EventName, listener: EventListener): Promise<void> {
    const container = await this.container;
    container.removeEventListener(eventName, listener);
  }
}
