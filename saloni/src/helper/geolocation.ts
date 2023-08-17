import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setError('Error getting location: ' + error.message);
        },
        {
          maximumAge: 0 * 1000, // Maximum age of cached position in milliseconds (1 minute)
        },
      );
    } else {
      setError('Geolocation is not available in this browser.');
    }
  }, []);

  return { latitude, longitude, error };
};

export default useGeolocation;
