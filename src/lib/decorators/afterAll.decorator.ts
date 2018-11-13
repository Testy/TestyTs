/** 
 * Method which is executed after all the tests were ran. 
 */
export function afterAll() {
    return (target, key, descriptor) => {
        target._afterAll = descriptor.value;
    };
}