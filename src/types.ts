import { MutableRefObject } from 'react';
import { CancelTokenSource, CancelToken } from 'axios';

export type UseCancelToken = {
  source: SourceRef;
  newCancelToken: () => CancelToken;
  cancelPreviousRequest: () => void;
  isCancel: (value: any) => boolean;
};

export type SourceRef = MutableRefObject<CancelTokenSource | null>;

export type { CancelToken } from 'axios';
