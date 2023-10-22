export const throttle = (func: Function, delay: number) => {
    let previousTime = 0;
    return function(): void {
        const currentTime = Date.now();
        if (currentTime - previousTime >= delay) {
            func();
            previousTime = currentTime;
        }
    };
};