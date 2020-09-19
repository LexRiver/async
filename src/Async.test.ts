import { Async } from "./Async"

test('waitForFunctionToReturnTrue', async ()=>{
    let a = 2
    console.log('a=', a)
    setTimeout(()=>{
        a = 1
        console.log('a=', a)
    }, 500)
    await Async.waitForFunctionToReturnTrueAsync(()=>a===1, {msStep: 100, maxMsToWait: 1000})
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
    let error = undefined
    let errorMessage = undefined
    try {
        await Async.waitForFunctionToReturnTrueAsync(()=> a===1, {msStep: 100, maxMsToWait: 1000 })
    } catch(x){
        error = x
        errorMessage = x.message
    }
    expect(error).not.toBeUndefined()
    expect(errorMessage).toBe('waitForFunctionToReturnTrue failed after timeout 1000ms')
})

test('small maxMsToWait', async () => {
    let a = 2
    setTimeout(() => {
        a = 1
        console.log('a=', a)
    }, 1000)
    let error = undefined
    try {
        await Async.waitForFunctionToReturnTrueAsync(() => a===1, {msStep:100, maxMsToWait: 10})
    } catch(x){
        error = x
    }
    expect(error).not.toBeUndefined()

    //await expect(async () => await Async.waitForFunctionToReturnTrueAsync(() => a===1, {msStep:100, maxMsToWait: 10})).rejects.toThrowError()
    
})