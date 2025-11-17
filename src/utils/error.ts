export const createError = (message: string, status: number, code: string ,  errors?: any[]) => {
    const error: any = new Error(message);
    error.status = false;
    error.statusCode= status;
    error.code = code;
    
    if (errors && errors.length > 0) {
      error.errors = errors;
    }
    return error;
  };