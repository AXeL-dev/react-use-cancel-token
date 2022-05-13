import { useEffect, useRef } from 'react';
import axios from 'axios';

import { UseCancelToken, SourceRef, CancelToken } from './types';

/**
 * When a component unmounts, we need to cancel any potentially
 * ongoing Axios calls that result in a state update on success / fail.
 * This hook sets up the appropriate useEffect to handle the canceling.
 * This hook also allows manual requests cancellation.
 * https://dev.to/tmns/usecanceltoken-a-custom-react-hook-for-cancelling-axios-requests-1ia4
 *
 * @deprecated since version 1.0.3. Use the useAbortController hook instead.
 * @returns {source: ref, newCancelToken: function, cancelPreviousRequest: function, isCancel: function}
 * source - used to access/set Axios cancel token source.
 * newCancelToken - used to generate the cancel token sent in the Axios request.
 * cancelPreviousRequest - used to manually cancel the previous Axios request.
 * isCancel - used to check if the error returned in Axios response is a cancel token error.
 */
export const useCancelToken = (): UseCancelToken => {
  const source: SourceRef = useRef(null);
  const { CancelToken: cancelToken, isCancel } = axios;

  const newCancelToken = (): CancelToken => {
    source.current = cancelToken.source();
    return source.current.token;
  };

  const cancelPreviousRequest = (message?: string): void => {
    if (source.current) source.current.cancel(message);
  };

  // Cancel pending request on unmout
  useEffect(() => cancelPreviousRequest, []);

  return { source, newCancelToken, cancelPreviousRequest, isCancel };
};
