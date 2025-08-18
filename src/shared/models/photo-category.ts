export interface IPhotoCategory {
  id: string;
  category: string;
  created_at: string;
  updated_at: string;
  author: string;
  deleted_at?: string;
}

export interface IPostPutPhotoCategory {
  category: string;
  author: string;
}