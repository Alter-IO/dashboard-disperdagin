import { IKelurahan, IPostPutKelurahan } from '../models/kelurahan';
import {
  IFetchGeneralResponse,
  IFetchGeneralSuccessResponse,
} from '../models/general-response';
import { errorHandling } from '../usecases/errorHandling';

const endpoint = import.meta.env.VITE_BACKEND_URL;

export async function GetKelurahans(): Promise<
  IFetchGeneralResponse<IKelurahan[]>
> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/villages`, {
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

  const data = (await response.json()) as IFetchGeneralResponse<IKelurahan[]>;
  return { success: true, data: data.data };
}

export async function GetKelurahan(
  id: string
): Promise<IFetchGeneralResponse<IKelurahan>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/villages/${id}`, {
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

  const data = (await response.json()) as IFetchGeneralResponse<IKelurahan>;
  return { success: true, data: data.data };
}

export async function CreateKelurahan(
  payload: IPostPutKelurahan
): Promise<IFetchGeneralResponse<IFetchGeneralSuccessResponse<string>>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + '/v1/villages', {
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

export async function UpdateKelurahan(
  payload: IPostPutKelurahan,
  id: string
): Promise<IFetchGeneralResponse<IFetchGeneralSuccessResponse<string>>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/villages/${id}`, {
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

export async function DeleteKelurahan(
  id: string
): Promise<IFetchGeneralResponse<IFetchGeneralSuccessResponse<string>>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/villages/${id}`, {
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