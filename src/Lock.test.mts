import { expect, test } from 'vitest'
import { Async } from "./Async.mjs"
import { Lock } from "./Lock.mjs"

let a = 1

async function functionWithLock1Async(lock:Lock){
    console.log('(1) start')
    await lock.lockAndExecuteAsync(async () => {
        console.log('(1) function with lock begin...')
        await Async.waitMsAsync(1000)
        a++
        console.log('(1) function with lock end')
    })
    console.log('(1) finish')
}

async function functionWithLock2Async(lock:Lock){
    console.log('(2) start')
    await lock.lockAndExecuteAsync(async () => {
        console.log('(2) function with lock begin...')
        await Async.waitMsAsync(1500)
        a++
        console.log('(2) function with lock end')
    })
    console.log('(2) finish')
}

test('releases the lock when an action rejects', async () => {
    const lock = new Lock()

    await expect(lock.lockAndExecuteAsync(async () => {
        throw new Error('temporary failure')
    })).rejects.toThrow('temporary failure')

    let executed = false
    await lock.lockAndExecuteAsync(() => {
        executed = true
    })
    expect(executed).toBe(true)
})

test('fails fast when the action immediately acquires the same lock', async () => {
    const lock = new Lock()

    await expect(lock.lockAndExecuteAsync(async () => {
        await lock.lockAndExecuteAsync(() => undefined)
    })).rejects.toThrow('Cannot acquire the same Lock from within its action')

    await expect(lock.lockAndExecuteAsync(() => undefined)).resolves.toBeUndefined()
})

test('preserves queueing for independent callers', async () => {
    const lock = new Lock()
    const order:string[] = []
    let releaseFirst!:()=>void
    let markFirstStarted!:()=>void
    const firstCanFinish = new Promise<void>((resolve) => releaseFirst = resolve)
    const firstStarted = new Promise<void>((resolve) => markFirstStarted = resolve)

    const first = lock.lockAndExecuteAsync(async () => {
        order.push('first started')
        markFirstStarted()
        await firstCanFinish
        order.push('first finished')
    })
    await firstStarted

    const second = lock.lockAndExecuteAsync(() => {
        order.push('second started')
    }, 1)
    expect(order).toEqual(['first started'])

    releaseFirst()
    await Promise.all([first, second])
    expect(order).toEqual(['first started', 'first finished', 'second started'])
})

test('lock', async () => {
    const lock = new Lock()

    void functionWithLock1Async(lock)
    void functionWithLock2Async(lock)
    expect(a).toEqual(1)

    await Async.waitMsAsync(3000)
    expect(a).toEqual(3)

})