import { DeferredPromise } from '@open-draft/deferred-promise';
import {
  InternalEvent,
  InternalEventPayload,
  OperationDone,
  OperationFailed,
} from './event';

export class Messenger {
  static counter: number = 0;
  static getReceiverId(): string {
    Messenger.counter += 1;
    return `receiver-${Messenger.counter}`;
  }

  receiverId: string;

  private target: Window;
  private emitter: EventTarget;
  private channel: MessageChannel;
  private receiverPort: MessagePort;
  private receiverReadyPromise: DeferredPromise<void>;

  constructor(target: Window, receiverId: string) {
    this.receiverId = receiverId;
    this.target = target;

    // Initialize the receiver port.
    this.emitter = new EventTarget();
    this.channel = new MessageChannel();
    this.receiverPort = this.channel.port1;
    this.receiverPort.onmessage = (event): void => {
      const { data } = event;
      if (typeof data.type === 'string') {
        this.emitter.dispatchEvent(
          new MessageEvent(data.type, { data: data.payload }),
        );
      }
    };

    // Initialize the receiver ready promise.
    this.receiverReadyPromise = new DeferredPromise();
    const listener = (
      message: MessageEvent<{ type: string; receiverId: string }>,
    ): void => {
      const { type, receiverId } = message.data;
      if (type === InternalEvent.Ready && receiverId === this.receiverId) {
        this.receiverReadyPromise.resolve();
      }
    };
    window.addEventListener('message', listener);
    this.receiverReadyPromise.then(() => {
      window.removeEventListener('message', listener);
    });
  }

  on<EventKey extends keyof InternalEventPayload>(
    eventKey: EventKey,
    listener: (event: MessageEvent<InternalEventPayload[EventKey]>) => void,
    options?: boolean | AddEventListenerOptions,
  ): void {
    this.emitter.addEventListener(
      eventKey,
      message => {
        if (message instanceof MessageEvent) {
          listener(message);
        }
      },
      options,
    );
  }

  off<EventKey extends keyof InternalEventPayload>(
    eventKey: EventKey,
    listener: (event: MessageEvent<InternalEventPayload[EventKey]>) => void,
    options?: boolean | EventListenerOptions,
  ): void {
    this.emitter.removeEventListener(
      eventKey,
      listener as EventListener,
      options,
    );
  }

  send<EventKey extends keyof InternalEventPayload>(
    eventKey: EventKey,
    data: InternalEventPayload[EventKey],
  ): Promise<unknown> {
    const operationPromise = new DeferredPromise<unknown>();
    const operationId = Date.now();
    this.receiverPort.postMessage({
      type: eventKey,
      payload: { operationId, data },
    });

    const handleOperationDone = (
      doneEvent: MessageEvent<OperationDone>,
    ): void => {
      if (doneEvent.data.operationId === operationId) {
        operationPromise.resolve(doneEvent.data.returnValue);
        this.off(InternalEvent.OperationDone, handleOperationDone);
        this.off(InternalEvent.OperationFailed, handleOperationFailed);
      }
    };

    const handleOperationFailed = (
      failedEvent: MessageEvent<OperationFailed>,
    ): void => {
      if (failedEvent.data.operationId === operationId) {
        operationPromise.reject(failedEvent.data.error);
        this.off(InternalEvent.OperationDone, handleOperationDone);
        this.off(InternalEvent.OperationFailed, handleOperationFailed);
      }
    };

    this.on(InternalEvent.OperationDone, handleOperationDone);
    this.on(InternalEvent.OperationFailed, handleOperationFailed);

    return operationPromise;
  }

  async handshake(): Promise<void> {
    await this.receiverReadyPromise;
    const handshakePromise = new DeferredPromise<void>();
    this.target.postMessage(
      {
        type: InternalEvent.Handshake,
      },
      '*',
      [this.channel.port2],
    );

    this.on(InternalEvent.HandshakeDone, () => {
      handshakePromise.resolve();
      clearTimeout(timeout);
    });

    const timeout = setTimeout(() => {
      handshakePromise.reject(new Error('Handshake timed out'));
    }, 5000);

    return handshakePromise;
  }
}
