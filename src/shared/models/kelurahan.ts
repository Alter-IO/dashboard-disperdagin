export interface IKelurahan {
  id: string;
  subdistrict_id: string;
  kecamatan_name?: string;
  name: string;
  created_at: string;
  updated_at: string;
  author: string;
}

export interface IPostPutKelurahan {
  subdistrict_id: string;
  name: string;
  author: string;
}