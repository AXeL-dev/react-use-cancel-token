import { useEffect, useRef } from 'react';
import { UseAbortController, ControllerRef } from './types';
import axios from 'axios';

export const useAbortController = (): UseAbortController => {
  const controller: ControllerRef = useRef(null);
  const { isCancel } = axios;

  const newAbortSignal = (): AbortSignal => {
    controller.current = new AbortController();
    return controller.current.signal;
  };

  const cancelPreviousRequest = (): void => {
    if (controller.current) controller.current.abort();
  };

  // Cancel pending request on unmout
  useEffect(() => cancelPreviousRequest, []);

  return { controller, newAbortSignal, cancelPreviousRequest, isCancel };
};
