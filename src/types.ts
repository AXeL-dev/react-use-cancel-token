import { MutableRefObject } from 'react';
import { CancelTokenSource, CancelToken } from 'axios';

//-------------------------------------------------
// CancelToken
//-------------------------------------------------

export type UseCancelToken = {
  source: SourceRef;
  newCancelToken: () => CancelToken;
  cancelPreviousRequest: () => void;
  isCancel: (error: any) => boolean;
};

export type SourceRef = MutableRefObject<CancelTokenSource | null>;

export type { CancelToken } from 'axios';

//-------------------------------------------------
// AbortController
//-------------------------------------------------

export type ControllerRef = MutableRefObject<AbortController | null>;

export type UseAbortController = {
  controller: ControllerRef;
  newAbortSignal: () => AbortSignal;
  cancelPreviousRequest: () => void;
  isCancel: (error: any) => boolean;
};
