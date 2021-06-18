import useCancelToken from './';
import { renderHook } from '@testing-library/react-hooks';

describe('useCancelToken', () => {
  it('renders correctly', () => {
    const { result } = renderHook(() => useCancelToken());

    expect(result.current).toMatchObject({});
  });
});
