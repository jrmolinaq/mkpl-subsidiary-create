export type Quality = 'OEM' | 'AFTERMARKET' | 'GENUINE';

export interface Product {
  reference: string;
  name: string;
  price: number;
  quality: Quality;
  applicability: string;
  irs: string;
  stock: number;
  validation: string;
  provider: string;
  notification: boolean;
  registerId: string;
  registerDate: string;
  externalSubsidiaryId: string;
  externalDataSendId: string;
}
