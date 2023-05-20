import type { IWorkbenchConfiguration } from './workbench';

export enum InternalEvent {
  Ready = 'internal/ready',
  Handshake = 'internal/handshake',
  HandshakeDone = 'internal/handshake/done',
  OperationDone = 'internal/operation/done',
  OperationFailed = 'internal/operation/failed',
  WorkbenchInit = 'internal/workbench/init',
}

export interface InternalEventPayload {
  [InternalEvent.Ready]: undefined;
  [InternalEvent.Handshake]: undefined;
  [InternalEvent.HandshakeDone]: undefined;
  [InternalEvent.OperationDone]: {
    operationId: number;
    returnValue?: unknown;
  };
  [InternalEvent.OperationFailed]: {
    operationId: number;
    error?: unknown;
  };
  [InternalEvent.WorkbenchInit]: IWorkbenchConfiguration;
}

export type OperationDone = InternalEventPayload[InternalEvent.OperationDone];
export type OperationFailed =
  InternalEventPayload[InternalEvent.OperationFailed];
