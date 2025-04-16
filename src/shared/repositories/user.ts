import {
  IFetchGeneralResponse,
  IFetchGeneralSuccessResponse,
} from '../models/general-response';
import { IPostUser, IResetPassword, IUser } from '../models/user';
import { errorHandling } from '../usecases/errorHandling';

const endpoint = import.meta.env.VITE_BACKEND_URL;

export async function GetUsers(): Promise<IFetchGeneralResponse<IUser[]>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/users`, {
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

  const data = (await response.json()) as IFetchGeneralResponse<IUser[]>;

  return { success: true, data: data.data };
}

export async function CreateUser(
  payload: IPostUser
): Promise<IFetchGeneralResponse<IFetchGeneralSuccessResponse<string>>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + '/v1/users', {
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

export async function ResetPassword(
  payload: IResetPassword,
  id: string
): Promise<IFetchGeneralResponse<IFetchGeneralSuccessResponse<string>>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/users/${id}/reset-password`, {
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
