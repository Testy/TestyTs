/** 
 * Method which is executed before each test is ran.
 */
export function beforeEach() {
    return (target, key, descriptor) => {
        target._beforeEach = descriptor.value;
    };
}