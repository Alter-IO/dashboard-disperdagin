import { IPhoto } from '../models/photo';
import {
  IFetchGeneralResponse,
  IFetchGeneralSuccessResponse,
} from '../models/general-response';
import { errorHandling } from '../usecases/errorHandling';

const endpoint = import.meta.env.VITE_BACKEND_URL;

export async function GetPhotos(): Promise<IFetchGeneralResponse<IPhoto[]>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/photos`, {
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

  const data = (await response.json()) as IFetchGeneralResponse<IPhoto[]>;
  return { success: true, data: data.data };
}

export async function GetPhoto(
  id: string
): Promise<IFetchGeneralResponse<IPhoto>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/photos/${id}`, {
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

  const data = (await response.json()) as IFetchGeneralResponse<IPhoto>;
  return { success: true, data: data.data };
}

// Updated CreatePhoto function to handle FormData
export async function CreatePhoto(
  payload: FormData
): Promise<IFetchGeneralResponse<IFetchGeneralSuccessResponse<string>>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + '/v1/photos', {
    method: 'POST',
    body: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status != 201) {
    const error = await errorHandling(response);
    throw new Error(error.data);
  }

  const data = await response.json();
  return { success: true, data: data };
}

// Updated UpdatePhoto function to handle FormData only
export async function UpdatePhoto(
  payload: FormData,
  id: string
): Promise<IFetchGeneralResponse<IFetchGeneralSuccessResponse<string>>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  for(const [key, value] of payload.entries()) {
    console.log(`${key}: ${value}`);
  }
  const response = await fetch(endpoint + `/v1/photos/${id}`, {
    method: 'PUT',
    body: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status != 200) {
    const error = await errorHandling(response);
    throw new Error(error.data);
  }

  const data = await response.json();
  return { success: true, data: data };
}

export async function DeletePhoto(
  id: string
): Promise<IFetchGeneralResponse<IFetchGeneralSuccessResponse<string>>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/photos/${id}`, {
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