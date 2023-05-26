import { Webview } from 'vscode';
import { getErrorFormException } from '@/base/errorHandler';
import htmlContent from '@resources/webview/html/main/index.html';

export type EventName = string;
export type EventMessage = { type: EventName; payload: any };
export type EventListener<T extends EventMessage = EventMessage> = (message: T) => Promise<void> | void;

interface IWebviewContainerOption {
  pathname: string;
  webview: Webview;
}

export class WebviewContainer {
  private webview: Webview;
  private listenerManager: Map<EventName, { listeners: EventListener[]; }>;
  private pathname = '';

  constructor({ pathname, webview }: IWebviewContainerOption) {
    this.webview = webview;
    this.pathname = pathname;
    this.listenerManager = new Map();
    this.initWebview();
    this.addInnerListeners();
  }

  emit(eventName: EventName, payload?: unknown): void {
    this.webview.postMessage({ type: eventName, payload });
  }

  addEventListner(eventName: EventName, listener: EventListener): void {
    const manager = this.listenerManager.get(eventName) || { listeners: [] };
    manager.listeners.push(listener);
    this.listenerManager.set(eventName, manager);
  }

  removeEventListener(eventName: EventName, listener: EventListener): void {
    const manager = this.listenerManager.get(eventName);
    const index = manager?.listeners.findIndex(item => item === listener);
    if (typeof index === 'number' && index >= 0) {
      manager?.listeners.splice(index, 1);
    }
  }

  private initWebview(): void {
    this.webview.html = htmlContent;
    this.webview.options = { enableScripts: true };
    this.webview.onDidReceiveMessage((message: EventMessage) => {
      const { type } = message;
      const manager = this.listenerManager.get(type);
      if (manager) {
        manager.listeners.forEach(listener => {
          try {
            listener(message);
          } catch (exception) {
            console.error(
              `[Event Listener Error]: Event Type: ${type}`,
              getErrorFormException(exception, 'listener error'),
            );
          }
        });
      }
    });
  }

  private addInnerListeners(): void {
    this.addEventListner('get-pathname', () => {
      this.emit('set-pathname', this.pathname);
    });
    this.addEventListner('page-reload', () => {
      const originHTML = this.webview.html;
      this.webview.html = '';
      this.webview.html = originHTML;
    });
  }
}
