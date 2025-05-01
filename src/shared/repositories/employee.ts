import {
  IEmployee,
  IEmployeePosition,
  IPostPutEmployee,
} from '../models/employee';
import {
  IFetchGeneralResponse,
  IFetchGeneralSuccessResponse,
} from '../models/general-response';
import { errorHandling } from '../usecases/errorHandling';

const endpoint = import.meta.env.VITE_BACKEND_URL;

export async function GetEmployees(): Promise<
  IFetchGeneralResponse<IEmployee[]>
> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/employees`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status != 200) {
    const error = await errorHandling(response);
    throw new Error(error.data);
  }

  const data = (await response.json()) as IFetchGeneralResponse<IEmployee[]>;

  return { success: true, data: data.data };
}

export async function GetActiveEmployee(): Promise<
  IFetchGeneralResponse<IEmployee[]>
> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/employees/active`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status != 200) {
    const error = await errorHandling(response);
    throw new Error(error.data);
  }

  const data = (await response.json()) as IFetchGeneralResponse<IEmployee[]>;

  return { success: true, data: data.data };
}

export async function GetEmployeeByPosition(
  position: string
): Promise<IFetchGeneralResponse<IEmployee[]>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(
    endpoint + `/v1/employees/position/${position}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.status != 200) {
    const error = await errorHandling(response);
    throw new Error(error.data);
  }

  const data = (await response.json()) as IFetchGeneralResponse<IEmployee[]>;

  return { success: true, data: data.data };
}

export async function GetEmployeePositions(): Promise<
  IFetchGeneralResponse<IEmployeePosition[]>
> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/employees/positions`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status != 200) {
    const error = await errorHandling(response);
    throw new Error(error.data);
  }

  const data = (await response.json()) as IFetchGeneralResponse<
    IEmployeePosition[]
  >;

  return { success: true, data: data.data };
}

export async function GetEmployee(
  id: string
): Promise<IFetchGeneralResponse<IEmployee>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/employees/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status != 200) {
    const error = await errorHandling(response);
    throw new Error(error.data);
  }

  const data = (await response.json()) as IFetchGeneralResponse<IEmployee>;

  return { success: true, data: data.data };
}

export async function CreateEmployee(
  payload: IPostPutEmployee
): Promise<IFetchGeneralResponse<IFetchGeneralSuccessResponse<string>>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + '/v1/employees', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status != 201) {
    const error = await errorHandling(response);
    throw new Error(error.data);
  }

  const data = await response.json();

  return { success: true, data: data };
}

export async function UpdateEmployee(
  payload: IPostPutEmployee,
  id: string
): Promise<IFetchGeneralResponse<IFetchGeneralSuccessResponse<string>>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status != 200) {
    const error = await errorHandling(response);
    throw new Error(error.data);
  }

  const data = await response.json();

  return { success: true, data: data };
}

export async function DeleteEmployee(
  id: string
): Promise<IFetchGeneralResponse<IFetchGeneralSuccessResponse<string>>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/employees/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status != 200) {
    const error = await errorHandling(response);
    throw new Error(error.data);
  }

  const data = await response.json();

  return { success: true, data: data };
}
