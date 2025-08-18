export interface IVideo {
  id: string;
  title: string;
  link: string;
  description: string;
  created_at: string;
  updated_at: string;
  author: string;
  deleted_at?: string;
}

export interface IPostPutVideo {
  title: string;
  link: string;
  description: string;
  author: string;
}