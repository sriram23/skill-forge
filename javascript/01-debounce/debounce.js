export const debounce = function (callback, time) {
    let timeout
    const debounced = function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            callback.call(this, ...args)
        }, time)
    }
    debounced.cancel = () => {
        clearTimeout(timeout)
    }
    return debounced

}
