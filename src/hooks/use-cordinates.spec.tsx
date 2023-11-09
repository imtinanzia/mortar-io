/* eslint-disable testing-library/no-wait-for-multiple-assertions */

import axios from 'axios';
import useCoordinates from './use-cordinates';
import { act, renderHook, waitFor } from '@testing-library/react';

jest.mock('axios');

const data = {
  Coords: [
    {
      latitude: 1,
      longitude: 2,
    },
    {
      latitude: 3,
      longitude: 4,
    },
  ],
};

describe('useCoordinates', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches coordinates and updates state on success', async () => {
    (axios.post as jest.Mock).mockResolvedValue({ data });

    let result: any;

    await act(async () => {
      result = renderHook(() => useCoordinates()).result;
    });

    expect(result.current.loading).toBe(false);

    expect(result.current.coordinates).toEqual([
      {
        coordinates: [],
        name: '0',
      },
      {
        coordinates: [],
        name: '1',
      },
    ]);
  });

  it('increments the currentIndex when jumping to the next building', async () => {
    let result: any;

    await act(async () => {
      result = renderHook(() => useCoordinates()).result;
    });

    await waitFor(() => {
      expect(result.current.currentIndex).toBe(0);
    });

    act(() => {
      result.current.jumpToNextBuilding();
    });

    expect(result.current.currentIndex).toBe(1);
  });

  it('resets the state when refreshing coordinates', async () => {
    (axios.post as jest.Mock).mockResolvedValue({ data });

    let result: any;

    await act(async () => {
      result = renderHook(() => useCoordinates()).result;
    });

    act(() => {
      result.current.refreshCoordinates();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('');

      expect(result.current.coordinates).toEqual([
        {
          coordinates: [],
          name: '0',
        },
        {
          coordinates: [],
          name: '1',
        },
      ]);
    });
  });
});
