import { useState, useEffect } from 'react';
import instance from '../API'; // Import your axios instance here
import { City, ExploreTreatment, GeoAddress, Salon, longlat } from '../global';
import { geocodeCoordinates } from '../helper/geoCoding';

interface UseFetchDataProps {
  locationData: {
    latitude: number;
    longitude: number;
  };
  userLocation: {
    lat: number;
    lon: number;
  };
}

const useFetchData = ({ locationData }: UseFetchDataProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [geoCoding, setGeoCoding] = useState<GeoAddress>({
    formatted: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });
  const [userLocation, setUserLocation] = useState<longlat>({
    lat: 12.9299,
    lon: 77.5822,
  });
  const [exploreTreatments, setExploreTreatments] = useState<
    ExploreTreatment[]
  >([]);

  const [cities, setCities] = useState<City[]>([]);
  const [exploreSalons, setExploreSalons] = useState<Salon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const geoAddress = await geocodeCoordinates(
          locationData?.latitude || 0,
          locationData?.longitude || 0,
        );
        if (geoAddress) {
          setGeoCoding(geoAddress);
        }

        setUserLocation({ lat: userLocation?.lat, lon: userLocation?.lon });
        const reqBody = {
          sortByType: 'relevance',
          count: 10,
          lon: userLocation.lon,
          lat: userLocation.lat,
        };

        const [
          exploreTreatmentsResponse,
          citiesResponse,
          exploreSalonsResponse,
        ] = await Promise.all([
          instance.get<ExploreTreatment[]>(
            'https://res.cloudinary.com/coorgly/raw/upload/v1691938795/ExploreTeatments_drkf3i.json',
          ),
          instance.get<City[]>(
            'https://res.cloudinary.com/coorgly/raw/upload/v1692012905/cities_ce3y9s.json',
          ),
          instance.post(
            `${process.env.REACT_APP_BASEURL}salon/nearBySalons`,
            reqBody,
          ),
        ]);

        if (exploreTreatmentsResponse.status === 200) {
          setExploreTreatments(exploreTreatmentsResponse?.data || []);
        }

        if (citiesResponse.status === 200) {
          setCities(citiesResponse.data);
        }

        if (exploreSalonsResponse.status === 200) {
          setExploreSalons(exploreSalonsResponse?.data?.data || []);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [locationData]);

  return {
    isLoading,
    geoCoding,
    userLocation,
    exploreTreatments,
    cities,
    exploreSalons,
  };
};

export default useFetchData;
