import {throttle} from "./throttle"
import {expect, describe, it, vi, beforeEach, afterEach} from "vitest"

beforeEach(() => {
    vi.useFakeTimers()
})

afterEach(() => {
    vi.useRealTimers()
})

describe("throttle", () => {
    it("executes immediately on the first call", () => {
        const callback = vi.fn()
        const fn = throttle(callback, 500)
        fn("Sriram")
        expect(callback).toHaveBeenCalledTimes(1)
        expect(callback).toHaveBeenNthCalledWith(1, "Sriram")
    })

    it("does not executes again in the throttle window", () => {
        const callback = vi.fn()
        const fn = throttle(callback, 500)
        fn("Sriram")
        vi.advanceTimersByTime(200)

        fn("Sriram Bala")
        vi.advanceTimersByTime(299)

        expect(callback).toHaveBeenCalledTimes(1)

        vi.advanceTimersByTime(1)
        fn("Sriram Balasubramanian")

        expect(callback).toHaveBeenCalledTimes(2)

        expect(callback).toHaveBeenNthCalledWith(1, "Sriram")
        expect(callback).toHaveBeenNthCalledWith(2, "Sriram Balasubramanian")
    })
    it("preserves 'this' context", () => {
        const callback = vi.fn(function() {
            return this.name
        })
        const obj = {
            name: "Sriram",
            greet: throttle(callback, 500)
        }
        obj.greet()
        expect(callback).toHaveBeenCalledTimes(1)
        expect(callback).toHaveReturnedWith("Sriram")
    })
    it("does not execute after cancellation", () => {
        const callback = vi.fn()
        const fn = throttle(callback, 500)
        fn("Sriram")

        fn("Balasubramanian")
        fn.cancel()

        vi.advanceTimersByTime(501)

        expect(callback).toHaveBeenCalledOnce()
        expect(callback).toHaveBeenNthCalledWith(1, "Sriram")
    })

    it("can be reused after cancel", () => {
        const callback = vi.fn()
        const fn = throttle(callback, 500)

        fn("Sriram")
        fn("Bala")
        fn.cancel()
        fn("Balasubramanian")
        expect(callback).toHaveBeenCalledTimes(2)
        expect(callback).toHaveBeenNthCalledWith(1, "Sriram")
        expect(callback).toHaveBeenNthCalledWith(2, "Balasubramanian")
    })

    it("is safe to cancel when no throttle window is active", () => {
        const callback = vi.fn()
        const fn = throttle(callback, 500)
        fn.cancel()
        expect(callback).not.toHaveBeenCalled()

        fn("Sriram")

        expect(callback).toHaveBeenCalledTimes(1)
        expect(callback).toHaveBeenNthCalledWith(1, "Sriram")
    })

})
