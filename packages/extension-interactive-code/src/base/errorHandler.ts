/**
 * 从 Exception: unknown 获取 Error Object
 * @param {unknown} exception 异常
 * @param {String} defaultMessage 默认错误信息
 * @return {Error} 标准 Error Object
 */
export function getErrorFormException(exception: unknown, defaultMessage: string): Error {
  if (exception instanceof Error) {
    return exception;
  }
  let message = defaultMessage;
  if (typeof exception === 'string') {
    message = exception;
  } else if (typeof exception === 'object' && exception !== null) {
    const exceptionMessage = Reflect.get(exception, 'message');
    message = typeof exceptionMessage === 'string' ? exceptionMessage : message;
  }
  return new Error(message);
}
