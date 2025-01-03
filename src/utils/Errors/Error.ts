
export const ErrorCode= {
    INVALID_EMAIL : "INVALID_EMAIL",
    INVALID_CODE : "INVALID_CODE",
    INVALID_PASSWORD : "INVALID_PASSWORD",
    USER_NOT_FOUND : "USER_NOT_FOUND",
    USER_ALREADY_EXISTS : "USER_ALREADY_EXISTS",
    EMAIL_ALREADY_EXISTS : "EMAIL_ALREADY_EXISTS",
    TOKEN_EXPIRED : "TOKEN_EXPIRED",
    TOKEN_INVALID : "TOKEN_INVALID",
    UNAUTHORIZED : "UNAUTHORIZED",
    INVALID_REQUEST_BODY : "INVALID_REQUEST_BODY",
  }
  
  export const ErrorMessage = {
    INVALID_EMAIL : "Invalid email",
    INVALID_CODE : "Invalid code or expired code",
    INVALID_PASSWORD : "Invalid password",
    USER_NOT_FOUND : "User not found",
    USER_ALREADY_EXISTS : "User already exists",
    EMAIL_ALREADY_EXISTS : "Email already exists",
    PHONE_ALREADY_EXISTS : "Phone already exists",
    TOKEN_EXPIRED : "Token expired",
    TOKEN_INVALID : "Token invalid",
    UNAUTHORIZED : "Unauthorized",
    INVALID_REQUEST_BODY : "Invalid request body",
  }
  export const getErrorCode = (errorMessage) => {
    return ErrorCode[errorMessage.split(" ")[0]] ?? null;
  };
  
  