export const errorHandling = async (res: Response) => {
  const errorData = await res.json();

  switch (res.status) {
    case 401: {
      localStorage.removeItem("access_token");
      localStorage.removeItem("admin");
      window.location.href = "/login";
      return { success: false, data: "Unauthorized: Please log in again." };
    }
    case 400: {
      return { success: false, data: errorData.message };
    }
    case 404: {
      return { success: false, data: errorData.message };
    }
    case 403: {
      return { success: false, data: errorData.message };
    }
    case 409: {
      return { success: false, data: errorData.message };
    }
    case 500: {
      return {
        success: false,
        data: "Error 500: Something went wrong on the server",
      };
    }
    default: {
      return {
        success: false,
        data: errorData,
      };
    }
  }
};
