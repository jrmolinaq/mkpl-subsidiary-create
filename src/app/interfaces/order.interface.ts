import { DataPaginator } from './paginator.interface';

export interface OrderContent {
  id: number;
  number: number;
  plate: string;
  date: string;
  brand: string;
  line: string;
  workshop: string;
  city: string;
  status: string;
  products: Array<any>;
  externalEvent?: number;
  orders: {
    id: number,
    date: string,
    status: string,
    workshop: string,
    time: string,
    externalNoticeId?: string
  }[];
}

export interface Order {
  content: {
    id: number,
    orders: OrderContent[]
  }[];
  last: boolean;
  total_pages: number;
  total_elements: number;
  size: number;
  number: number;
  first: boolean;
  number_of_elements: number;
}

export interface OrderData {
  content: Order[];
  dataPaginator: DataPaginator;
}

export interface OrderRequestParams {
  subsidiaryId: number | string;
  status: string;
  page: number;
  limit?: number;
}

export interface OrderPaginator extends DataPaginator {
  data: OrderContent[];
}
