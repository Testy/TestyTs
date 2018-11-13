/** 
 * Method which is executed after each test is ran. 
 */
export function afterEach() {
    return (target, key, descriptor) => {
        target._afterEach = descriptor.value;
    };
}