import * as React from 'react';
import axios, { CancelTokenSource, CancelToken } from 'axios';

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
export const useCancelToken = (): {
  newCancelToken: () => void;
  cancelPreviousRequest: () => void;
  isCancel: (value: any) => boolean;
} => {
  const axiosSource: React.MutableRefObject<CancelTokenSource | null> = React.useRef(null);
  const newCancelToken = (): CancelToken => {
    axiosSource.current = axios.CancelToken.source();
    return axiosSource.current.token;
  };

  const cancelPreviousRequest = (message?: string) => {
    if (axiosSource.current) axiosSource.current.cancel(message);
  };

  React.useEffect(() => cancelPreviousRequest, []);

  return { newCancelToken, cancelPreviousRequest, isCancel: axios.isCancel };
};
