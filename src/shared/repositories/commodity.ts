import { ICommodity, IPostPutCommodity } from '../models/commodity';
import {
  IFetchGeneralResponse,
  IFetchGeneralSuccessResponse,
} from '../models/general-response';
import { errorHandling } from '../usecases/errorHandling';

const endpoint = import.meta.env.VITE_BACKEND_URL;

export async function GetCommodities(): Promise<
  IFetchGeneralResponse<ICommodity[]>
> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/commodities`, {
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

  const data = (await response.json()) as IFetchGeneralResponse<ICommodity[]>;

  return { success: true, data: data.data };
}

export async function GetCommodity(
  id: string
): Promise<IFetchGeneralResponse<ICommodity>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/commodities/${id}`, {
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

  const data = (await response.json()) as IFetchGeneralResponse<ICommodity>;

  return { success: true, data: data.data };
}

export async function CreateCommodity(
  payload: IPostPutCommodity
): Promise<IFetchGeneralResponse<IFetchGeneralSuccessResponse<string>>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + '/v1/commodities', {
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

export async function UpdateCommodity(
  payload: IPostPutCommodity,
  id: string
): Promise<IFetchGeneralResponse<IFetchGeneralSuccessResponse<string>>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/commodities/${id}`, {
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

export async function DeleteCommodity(
  id: string
): Promise<IFetchGeneralResponse<IFetchGeneralSuccessResponse<string>>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/commodities/${id}`, {
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
