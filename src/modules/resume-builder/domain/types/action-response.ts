export type SuccessCode = 200 | 201 | 204;
export type ErrorCode = 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500;

export type ActionResponse<T = unknown> =
  | {
      success: true;
      data: T;
      statusCode: SuccessCode;
      error?: never;
    }
  | {
      success: false;
      data?: never;
      statusCode: ErrorCode;
      error: string;
    };
