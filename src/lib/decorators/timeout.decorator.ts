/**
 * Specifies the timeout to cause a test to fail.
 * @param timeout The timeout in miliseconds.
 */
export function Timeout(timeout: number = 2000) {
  return (target, key, descriptor) => {
    if (!target.__timeouts) {
      target.__timeouts = {};
    }

    target.__timeouts[key] = timeout;
  };
}
