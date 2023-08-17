export interface longlat {
  lon: number;
  lat: number;
  radius?: number; // In Kms
}

export interface Location {
  type: string;
  coordinates: [number, number];
}

export interface Salon {
  id: string;
  name: string;
  address: string;
  banner: string;
  gender: 'male' | 'female' | 'unisex';
  temp_inactive: number;
  rating: number;
  rating_count: number;
  location: string;
  distance?: number;
  openingSoon?: boolean;
  closingSoon?: boolean;
}

export interface City {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export interface GeoAddress {
  formatted: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface ExploreTreatment {
  id: string;
  name: string;
  description: string;
  treatment_pic_url: string;
}

export interface BookedService {
  name: string;
  duration: number;
}

export interface BookingInfo {
  banner: string;
  orderID: string;
  salonName: string;
  startTime: string;
  salonAddress: string;
  bookedServices?: BookedService[];
}
