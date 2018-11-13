/**
 * Method which is executed before all the tests are ran.
 */
export function beforeAll() {
    return (target, key, descriptor) => {
        target._beforeAll = descriptor.value;
    };
}