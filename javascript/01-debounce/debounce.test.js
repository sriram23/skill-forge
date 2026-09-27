import {expect, describe, it, vi, beforeEach, afterEach} from 'vitest'
import {debounce} from './debounce.js'

beforeEach(() => {
    vi.useFakeTimers()
})

afterEach(() => {
    vi.useRealTimers()
})

describe('debounce', () => {
    it('is called after the expected delay', () => {
        const callback = vi.fn()
        const fn = debounce(callback, 500)
        fn("Sriram")
        vi.advanceTimersByTime(500)
        expect(callback).toHaveBeenCalledTimes(1)
        expect(callback).toHaveBeenCalledWith("Sriram")
    })

    it('is not called before the expected delay', () => {
        const callback = vi.fn()
        const fn = debounce(callback, 500)
        fn("Sriram")
        vi.advanceTimersByTime(499)
        expect(callback).not.toHaveBeenCalled()
    })

    it('is called once after the final invocation',  () => {
        const callback = vi.fn()
        const fn = debounce(callback, 500)
        fn("S")
        vi.advanceTimersByTime(100)
        fn("Sri")
        vi.advanceTimersByTime(100)
        fn("Sriram")
        vi.advanceTimersByTime(499)
        expect(callback).not.toHaveBeenCalled()
        vi.advanceTimersByTime(1)
        expect(callback).toHaveBeenCalledTimes(1)
        expect(callback).toHaveBeenCalledWith("Sriram")
    })
    it('is executed and subsequent call should schedule a new invocation', () => {
        const callback = vi.fn()
        const fn = debounce(callback, 500)
        fn("Sriram")
        vi.advanceTimersByTime(500)
        expect(callback).toHaveBeenCalledTimes(1)
        fn("Balasubramanian")
        vi.advanceTimersByTime(500)
        expect(callback).toHaveBeenCalledTimes(2)

        expect(callback).toHaveBeenNthCalledWith(1, "Sriram")
        expect(callback).toHaveBeenNthCalledWith(2, "Balasubramanian")
    })
    it('independent instances does not interfere', () => {
        const callback1 = vi.fn()
        const callback2 = vi.fn()

        const fn1 = debounce(callback1, 500)
        const fn2 = debounce(callback2, 500)

        fn1("Sriram")
        vi.advanceTimersByTime(200)

        fn2("Balasubramanian")
        vi.advanceTimersByTime(300)

        expect(callback1).toHaveBeenCalledTimes(1)
        expect(callback2).not.toHaveBeenCalled()

        vi.advanceTimersByTime(200)

        expect(callback2).toHaveBeenCalledTimes(1)

        expect(callback1).toHaveBeenNthCalledWith(1, "Sriram")
        expect(callback2).toHaveBeenNthCalledWith(1, "Balasubramanian")

    })

    it("should perserve 'this'", () => {
        const callback = vi.fn(function() {
            return this.name
        })
        const obj = {
            name: "Sriram",
            greet: debounce(callback, 500)
        }
        obj.greet()

        vi.advanceTimersByTime(500)

        expect(callback).toHaveBeenCalledTimes(1)
        expect(callback).toHaveReturnedWith("Sriram")
    })

    it("should not execute callback after cancellation", () => {
        const callback = vi.fn()
        const fn = debounce(callback, 500)
        fn("Sriram")
        fn.cancel()
        vi.advanceTimersByTime(500)
        expect(callback).not.toHaveBeenCalled()
    })

    it("can be reused after cancel", () => {
        const callback = vi.fn()
        const fn = debounce(callback, 500)

        fn("Sriram")
        fn.cancel()

        vi.advanceTimersByTime(300)
        expect(callback).not.toHaveBeenCalled()

        fn("Balasubramanian")
        vi.advanceTimersByTime(500)

        expect(callback).toHaveBeenCalledTimes(1)
        expect(callback).toHaveBeenNthCalledWith(1, "Balasubramanian")
    })

    it("can be cancelled when nothing is pending",  () => {
        const callback = vi.fn()
        const fn = debounce(callback, 500)
        fn.cancel()
        vi.advanceTimersByTime(500)
        expect(callback).not.toHaveBeenCalled()
    })
})
