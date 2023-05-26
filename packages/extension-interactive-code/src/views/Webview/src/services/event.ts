import { vscode } from './vscode';

export type EventName = string;
export type EventListener = (event: MessageEvent) => void | Promise<void>;

export function addEventListener(event: EventName, eventListener: EventListener) {
  let listener: EventListener | null = (message: MessageEvent) => {
    if (message.data.type === event) {
      eventListener(message);
    }
  };

  window.addEventListener('message', listener);

  return {
    dispose(): void {
      if (listener) {
        window.removeEventListener('message', listener);
        listener = null;
      }
    },
  };
}

export function emit(event: EventName, payload?: unknown): void {
  vscode.postMessage({ type: event, payload });
}
