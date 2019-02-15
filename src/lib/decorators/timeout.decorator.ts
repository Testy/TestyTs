export function Timeout(timeout: number = 2000) {
    return (target, key, descriptor) => {
        target.timeout = timeout;
    };
}