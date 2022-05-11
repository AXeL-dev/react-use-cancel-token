import { useCancelToken } from '.';
import { renderHook } from '@testing-library/react-hooks';
jest.mock('./useCancelToken');

const source = { current: null };
const cancelToken = '123456';
const isCancelReturnValue = false;
const useCancelTokenMock = {
  source,
  newCancelToken: jest.fn().mockReturnValue(cancelToken),
  cancelPreviousRequest: jest.fn(),
  isCancel: jest.fn().mockReturnValue(isCancelReturnValue),
};

describe('useCancelToken', () => {
  beforeEach(() => {
    (useCancelToken as jest.Mock).mockReturnValue(useCancelTokenMock);
  });

  it('renders correctly', () => {
    const { result } = renderHook(() => useCancelToken());

    expect(result.current).toEqual(
      expect.objectContaining({
        source: expect.objectContaining(source),
        newCancelToken: expect.any(Function),
        cancelPreviousRequest: expect.any(Function),
        isCancel: expect.any(Function),
      })
    );
  });

  it('should return a new token', () => {
    const { result } = renderHook(() => useCancelToken());
    result.current.newCancelToken();

    expect(useCancelTokenMock.newCancelToken).toHaveBeenCalledTimes(1);
    expect(useCancelTokenMock.newCancelToken).toHaveReturnedWith(cancelToken);
  });

  it('should cancel the previous request on demand', () => {
    const { result } = renderHook(() => useCancelToken());
    result.current.cancelPreviousRequest();

    expect(useCancelTokenMock.cancelPreviousRequest).toHaveBeenCalledTimes(1);
  });

  it('should cancel any on going request on unmount', () => {
    const { unmount } = renderHook(() => useCancelToken());
    unmount();

    expect(useCancelTokenMock.cancelPreviousRequest).toHaveBeenCalledTimes(1);
  });

  it('should verify if the request has been canceled', () => {
    const { result } = renderHook(() => useCancelToken());
    const error = new Error('request canceled.');
    result.current.isCancel(error);

    expect(useCancelTokenMock.isCancel).toHaveBeenCalledTimes(1);
    expect(useCancelTokenMock.isCancel).toHaveReturnedWith(isCancelReturnValue);
  });
});
