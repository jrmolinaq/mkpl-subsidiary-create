import { Product } from './product.interface';
import { Provider } from './provider.interface';
import { Order } from './order.interface';

export interface DataPaginator {
  number: number;
  size: number;
  totalElements: number;
  sort: string;
  lastPage: boolean;
  numberOfElements: number;
  totalPages: number;
  firstPage: boolean;
}

export interface ListResponse extends DataPaginator {
  content: Product[] | Provider[] | Order[];
}

export interface Paginator {
  data: Product[] | Provider[];
  dataPaginator: DataPaginator;
  date?: string;
}
