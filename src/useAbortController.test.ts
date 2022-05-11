import useAbortController from '.';
import { renderHook } from '@testing-library/react-hooks';
jest.mock('./useAbortController');

const controller = { current: null };
const { signal } = new AbortController();
const isCancelReturnValue = false;
const useAbortControllerMock = {
  controller,
  newAbortSignal: jest.fn().mockReturnValue(signal),
  cancelPreviousRequest: jest.fn(),
  isCancel: jest.fn().mockReturnValue(isCancelReturnValue),
};

describe('useAbortController', () => {
  beforeEach(() => {
    (useAbortController as jest.Mock).mockReturnValue(useAbortControllerMock);
  });

  it('renders correctly', () => {
    const { result } = renderHook(() => useAbortController());

    expect(result.current).toEqual(
      expect.objectContaining({
        controller: expect.objectContaining(controller),
        newAbortSignal: expect.any(Function),
        cancelPreviousRequest: expect.any(Function),
        isCancel: expect.any(Function),
      })
    );
  });

  it('should return a new signal', () => {
    const { result } = renderHook(() => useAbortController());
    result.current.newAbortSignal();

    expect(useAbortControllerMock.newAbortSignal).toHaveBeenCalledTimes(1);
    expect(useAbortControllerMock.newAbortSignal).toHaveReturnedWith(signal);
  });

  it('should cancel the previous request on demand', () => {
    const { result } = renderHook(() => useAbortController());
    result.current.cancelPreviousRequest();

    expect(useAbortControllerMock.cancelPreviousRequest).toHaveBeenCalledTimes(
      1
    );
  });

  it('should cancel any on going request on unmount', () => {
    const { unmount } = renderHook(() => useAbortController());
    unmount();

    expect(useAbortControllerMock.cancelPreviousRequest).toHaveBeenCalledTimes(
      1
    );
  });

  it('should verify if the request has been canceled', () => {
    const { result } = renderHook(() => useAbortController());
    const error = new Error('request canceled.');
    result.current.isCancel(error);

    expect(useAbortControllerMock.isCancel).toHaveBeenCalledTimes(1);
    expect(useAbortControllerMock.isCancel).toHaveReturnedWith(
      isCancelReturnValue
    );
  });
});
