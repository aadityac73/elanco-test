export default class Result<T> {
  private readonly error: any;
  private readonly value: T;
  isError: boolean;

  private constructor(isError: boolean, error: any, value: T | undefined) {
    this.isError = isError;
    this.error = error ?? {};
    this.value = value ?? ({} as T);
  }

  public getValue(): T {
    return this.value;
  }

  public getError() {
    return this.error;
  }

  public static success<T>(value: T): Result<T> {
    return new Result<T>(false, undefined, value);
  }

  public static failed<T>(error: any): Result<T> {
    return new Result<T>(true, error, undefined);
  }
}
