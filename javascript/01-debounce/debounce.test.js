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

})