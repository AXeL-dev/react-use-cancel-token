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
 * @returns {newCancelToken: function, cancelPreviousRequest: function, isCancel: function}
 * newCancelToken - used to generate the cancel token sent in the Axios request.
 * cancelPreviousRequest - used to manually cancel previous Axios requests.
 * isCancel - used to check if error returned in response is a cancel token error.
 */
export const useCancelToken = (): UseCancelToken => {
  const axiosSource: SourceRef = useRef(null);
  const { CancelToken: cancelToken, isCancel } = axios;

  const newCancelToken = (): CancelToken => {
    axiosSource.current = cancelToken.source();
    return axiosSource.current.token;
  };

  const cancelPreviousRequest = (message?: string): void => {
    if (axiosSource.current) axiosSource.current.cancel(message);
  };

  useEffect(() => cancelPreviousRequest, []);

  return { newCancelToken, cancelPreviousRequest, isCancel };
};
