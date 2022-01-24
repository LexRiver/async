import { Async } from "./Async"

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

test('wait forever', async () => {
    let a = 2
    setTimeout(() => a = 1, 1000)
    await Async.waitForFunctionToReturnTrueAsync(() => a === 1)
    a = 3
    expect(a).toEqual(3)
})