import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { convertDataToFormat } from '../utils';
import type { FormattedContinent } from '../utils';

const useCoordinates = () => {
  const [coordinates, setCoordinates] = useState<FormattedContinent[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const getCordinates = useCallback(async () => {
    try {
      const response = await axios.post(
        'https://staging-mortar-tech-test-2im2.encr.app/coordinates'
      );

      setCoordinates(convertDataToFormat(response.data?.Coords));
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCordinates();
  }, [getCordinates]);

  const jumpToNextBuilding = (): void => {
    setCurrentIndex(
      (prevIndex: number) => (prevIndex + 1) % coordinates.length
    );
  };

  const refreshCoordinates = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post(
        'https://staging-mortar-tech-test-2im2.encr.app/coordinates'
      );

      setCoordinates(convertDataToFormat(response.data?.Coords));
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return {
    coordinates,
    currentIndex,
    loading,
    error,
    jumpToNextBuilding,
    refreshCoordinates,
  };
};

export default useCoordinates;
