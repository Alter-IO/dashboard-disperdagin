export interface IKecamatan {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  author: string;
}

export interface IPostPutKecamatan {
  name: string;
  author: string;
}