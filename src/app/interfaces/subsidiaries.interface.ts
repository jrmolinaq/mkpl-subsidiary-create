import { CityInterface, RegionInterface, Location } from './locations.interface';
import { DataPaginator } from './paginator.interface';

export interface Subsidiary {
  id: number;
  name: string;
  city: string;
  address: string;
  status: boolean;
}

export interface Subsidiaries {
  subsidiaries: Array<Subsidiary>;
}

export interface SubsidiaryRequestParams {
  providerId: number | string;
  order?: string;
  orderBy?: string;
}

export interface SubsidiaryDetail {
  id: number;
  alias: string;
  status: boolean;
  email: string;
  name: string;
  phone: string;
  location: Location;
  timeRegionsDelivery: TimeDelivery[];
  timeCitiesDelivery: TimeDelivery[];
  adminUser: SubsidiaryAdminUser;
}

export interface SubsidiaryAdminUser {
  id: number;
  email: string;
  subsidiaryExternalId: number;
  providerExternalId: number;
}

export interface TimeDelivery {
  id: number;
  days: number;
  city?: CityInterface;
  pendingDays: number;
  subsidiaryFromExternalId: null;
  region?: RegionInterface;
}

export interface SubsidiaryListResponse extends DataPaginator {
  content: Subsidiary[];
}

export interface SubsidiaryRequestParams {
  providerId: number | string;
  order?: string;
  orderBy?: string;
}
