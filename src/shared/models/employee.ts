export interface IEmployee {
  id: string;
  employee_id: string;
  name: string;
  address: string;
  birthplace: string;
  birthdate: string;
  photo: string;
  position: string;
  status: number;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface IEmployeePosition {
  position: string;
}

export interface IPostPutEmployee {
  employee_id: string;
  name: string;
  address: string;
  birthplace: string;
  birthdate: string;
  photo: string;
  position: string;
  status: string;
  author: string;
}
