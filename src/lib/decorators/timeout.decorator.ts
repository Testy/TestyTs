/**
 * Specifies the timeout to cause a test to fail.
 * @param timeout The timeout in miliseconds.
 */
export function Timeout(timeout: number = 2000) {
    return (target, key, descriptor) => {
        target.timeout = timeout;
    };
}