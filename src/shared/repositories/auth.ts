import { ILoginPayload, ILoginResp } from '../models/auth.ts';
import {
  IFetchGeneralResponse,
  IFetchGeneralSuccessResponse,
} from '../models/general-response.ts';
import { errorHandling } from '../usecases/errorHandling.ts';

const endpoint = import.meta.env.VITE_BACKEND_URL;

export async function Login(
  payload: ILoginPayload
): Promise<IFetchGeneralResponse<IFetchGeneralSuccessResponse<ILoginResp>>> {
  const response = await fetch(endpoint + '/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (response.status != 200) {
    const error = await errorHandling(response);
    throw new Error(error.data);
  }

  const data = await response.json();

  return { success: true, data: data };
}
