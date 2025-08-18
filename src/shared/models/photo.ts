export interface IPhoto {
  id: string;
  category_id: string;
  category_name?: string; 
  title: string;
  file_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  author: string;
  deleted_at?: string;
}

export interface IPostPutPhoto {
  category_id: string;
  title: string;
  file_url: string;
  description: string;
  author: string;
}