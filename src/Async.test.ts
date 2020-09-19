import { Async } from "./Async"

test('waitForFunctionToReturnTrue', async ()=>{
    let a = 2
    console.log('a=', a)
    setTimeout(()=>{
        a = 1
        console.log('a=', a)
    }, 500)
    await Async.waitForFunctionToReturnTrueAsync(()=>a==1, 100, 1000)
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
    try {
        await Async.waitForFunctionToReturnTrueAsync(()=>a==1, 100, 1000)
    } catch(x){
        expect(x.message).toBe('waitForFunctionToReturnTrue failed after timeout 1000ms')
    }
})