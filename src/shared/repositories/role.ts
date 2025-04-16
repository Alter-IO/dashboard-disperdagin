import { IFetchGeneralResponse } from '../models/general-response';
import { IRole } from '../models/role';
import { errorHandling } from '../usecases/errorHandling';

const endpoint = import.meta.env.VITE_BACKEND_URL;

export async function GetRoles(): Promise<IFetchGeneralResponse<IRole[]>> {
  const token = JSON.parse(localStorage.getItem('access_token')!);
  const response = await fetch(endpoint + `/v1/roles`, {
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

  const data = (await response.json()) as IFetchGeneralResponse<IRole[]>;

  return { success: true, data: data.data };
}
