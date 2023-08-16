import opencage from 'opencage-api-client';

interface GeoLocation {
  latitude: number;
  longitude: number;
}

interface GeoAddress {
  formatted: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

const API_KEY = process.env.REACT_APP_OPENCAGE_API_KEY;

export const geocodeCoordinates = async (
  latitude: number,
  longitude: number,
): Promise<GeoAddress | null> => {
  try {
    const response = await opencage.geocode({
      q: `${latitude},${longitude}`,
      language: 'en',
      key: API_KEY, // Include your API key here
    });

    if (response.results.length > 0) {
      const firstResult = response.results[0];
      const formattedAddress = firstResult.formatted;
      const components = firstResult.components;

      const geoAddress: GeoAddress = {
        formatted: formattedAddress,
        city: components.city,
        state: components.state,
        country: components.country,
        postalCode: components.postcode,
      };

      return geoAddress;
    }

    return null;
  } catch (error) {
    console.error('Error geocoding:', error);
    return null;
  }
};
