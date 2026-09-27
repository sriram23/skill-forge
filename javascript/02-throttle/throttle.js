export const throttle = function (callback, limit) {
    let wait = false
    let timeout
    const throttled = function(...args) {
        if(!wait) {
            callback.call(this, ...args)
            wait = true
            timeout = setTimeout(() => {
                wait = false
            }, limit)
        }
    }

    throttled.cancel = () => {
        clearTimeout(timeout)
        wait = false
        timeout = null
    }
    return throttled
}
