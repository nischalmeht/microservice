/**
 * Error carrying an HTTP status. `isPublic` controls whether the message
 * may be returned to the client.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly isPublic: boolean;

  constructor(message: string, status = 500, isPublic = false) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.isPublic = isPublic;
  }
}
