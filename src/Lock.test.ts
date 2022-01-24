import { Async } from "./Async"
import { Lock } from "./Lock"

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

test('lock', async () => {
    const lock = new Lock()

    void functionWithLock1Async(lock)
    void functionWithLock2Async(lock)
    expect(a).toEqual(1)

    await Async.waitMsAsync(3000)
    expect(a).toEqual(3)

})