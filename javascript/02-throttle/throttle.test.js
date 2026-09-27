import {throttle} from "./throttle"
import {expect, describe, it, vi, beforeEach, afterEach} from "vitest"

beforeEach(() => {
    vi.useFakeTimers()
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
})
