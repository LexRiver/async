import { afterEach, expect, test, vi } from 'vitest'
import { Async } from "./Async.mjs"

afterEach(() => {
    vi.useRealTimers()
})

test('waitForFunctionToReturnTrue', async ()=>{
    let a = 2
    console.log('a=', a)
    setTimeout(()=>{
        a = 1
        console.log('a=', a)
    }, 500)
    await Async.waitForFunctionToReturnTrueAsync(()=>a===1,  100, 1000)
    console.log('a=', a)
    expect(a).toEqual(1)
})


test('waitForFunctionToReturnTrue (2)', async ()=>{
    let a = 2
    console.log('a=', a)
    setTimeout(()=>{
        a = 1
        console.log('a=', a)
    }, 1500)

    await expect(Async.waitForFunctionToReturnTrueAsync(()=> a===1, 100, 1000 )).rejects.toThrowError('waitForFunctionToReturnTrue failed after timeout 1000ms')
    await Async.waitMsAsync(2000)
    
})

test('small maxMsToWait', async () => {
    let a = 2
    setTimeout(() => {
        a = 1
        console.log('a=', a)
    }, 1000)

    await expect( Async.waitForFunctionToReturnTrueAsync(() => a===1, 100, 10)).rejects.toThrow()
    await Async.waitMsAsync(2000)
})

test('uses the timeout as an absolute deadline and bounds the final sleep', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(0)
    const predicate = vi.fn(() => false)

    const waiting = Async.waitForFunctionToReturnTrueAsync(predicate, 100, 10)
    const rejection = expect(waiting).rejects.toThrowError('waitForFunctionToReturnTrue failed after timeout 10ms')

    expect(predicate).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(9)
    expect(predicate).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(1)
    await rejection
    expect(predicate).toHaveBeenCalledTimes(1)
})

test('does not accept a predicate that finishes at the deadline', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(0)

    await expect(Async.waitForFunctionToReturnTrueAsync(() => {
        vi.setSystemTime(10)
        return true
    }, 100, 10)).rejects.toThrowError('waitForFunctionToReturnTrue failed after timeout 10ms')
})

test('wait forever', async () => {
    let a = 2
    setTimeout(() => a = 1, 1000)
    await Async.waitForFunctionToReturnTrueAsync(() => a === 1)
    a = 3
    expect(a).toEqual(3)
})