export function safeResizeObserverCallback(callback) {
    return (...args) => {
        requestAnimationFrame(() => {
            callback(...args);
        });
    };
}
