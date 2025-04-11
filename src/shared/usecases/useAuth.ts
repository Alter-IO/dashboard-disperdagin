export const useGetToken = () => {
  return JSON.parse(localStorage.getItem('access_token') || 'null');
};

export const useGetUser = () => {
  return JSON.parse(localStorage.getItem('admin') || 'null');
};

export const useRemoveData = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('admin');
};
