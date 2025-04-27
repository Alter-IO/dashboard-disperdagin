export interface ICommodity {
  id: string;
  commodity_type_id: string;
  commodity_type_name: string;
  name: string;
  price: number;
  unit: string;
  publish_date: string;
  description: string;
  author: string;
}

export interface IPostPutCommodity {
  commodity_type_id: string;
  name: string;
  price: number;
  unit: string;
  publish_date: string;
  description: string;
  author: string;
}
