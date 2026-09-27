const debounce = (callback, time) => {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            callback(...args)
        }, time)
    }
}

const log = debounce(console.log, 500)
log("S")
log("Sr")
log("Sri")