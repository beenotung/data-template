export class HttpError extends Error {
  status?: number
  constructor(public statusCode: number, message: string) {
    super(message)
  }
}
