export const throttle = function (callback, limit) {
    let wait = false
    const throttled = function(...args) {
        if(!wait) {
            callback.call(this, ...args)
            wait = true
            setTimeout(() => {
                wait = false
            }, limit)
        }
    }

    throttled.cancel = () => {
        wait = false
    }

    throttled.flush = () => {
        if(wait) {
            callback.call(this)
            wait = false
        }
    }
    return throttled
}
