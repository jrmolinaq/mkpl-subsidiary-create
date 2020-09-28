export interface CountryInterface {
  id: number;
  name: string;
}

export interface RegionInterface {
  id: number;
  name: string;
  days?: number;
  country: CountryInterface;
}

export interface CityInterface {
  id: number;
  name: string;
  state: string;
  days?: number;
  region: RegionInterface;
  isoCode: string;
}

export interface Location {
  id: number;
  address: string;
  city: CityInterface;
}
