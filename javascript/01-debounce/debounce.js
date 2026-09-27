export const debounce = function (callback, time) {
    let timeout
    let lastArgs
    let lastThis

    const debounced = function (...args) {
        lastArgs = args
        lastThis = this
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            callback.call(this, ...args)
        }, time)
    }
    debounced.cancel = () => {
        clearTimeout(timeout)
    }

    debounced.flush = () => {
        if(timeout) {
            clearTimeout(timeout)
            callback.call(lastThis, ...lastArgs)
            timeout = null
            lastArgs = null
            lastThis = null
        }
    }
    return debounced
}
