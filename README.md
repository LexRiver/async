# Async

This package provides `Async.waitMsAsync`, `Async.waitForFunctionToReturnTrueAsync` functions and `Lock` class to synchronize flow.

## Install

`npm install @lexriver/async`

## Import

```typescript
import {Async, Lock} from '@lexriver/async'
```

## Methods


### Async.waitMsAsync(millisecondsToWait: number)

Wait for some milliseconds by setTimeout wrapped in Promise

```typescript
await Async.waitMsAsync(500) // wait 500 milliseconds
```

<br/>
<br/>

### Async.waitForFunctionToReturnTrueAsync(functionToReturnTrue: () => boolean, msStep: number = 50, maxMsToWait: number = 0)

Wait for function to return true or throw error

__Parameters__
* `functionToReturnTrue: () => boolean` - function that will be executed on each step
* `msStep?: number` - pause between each steps in milliseconds, default value is 50
* `maxMsToWait?: number` - maximum milliseconds to wait for all steps. Use 0 to wait forever. default values is 0.

```typescript
// waiting for function getTheAnswer() to return 42 checking every 100ms for 1 second total
await Async.waitForFunctionToReturnTrueAsync(() => getTheAnswer() === 42, 100, 1000)
```

<br/>
<br/>

### Lock

Use `Lock` to synchronize async functions flow. So one function will wait for other function to release the lock.

```typescript

async function functionWithLock1Async(lock:Lock){
    console.log('(1) start')
    await lock.lockAndExecuteAsync(async () => {
        console.log('(1) function with lock begin...')
        await Async.waitMsAsync(1000) // just wait
        console.log('(1) function with lock end')
    })
    console.log('(1) finish')
}

async function functionWithLock2Async(lock:Lock){
    console.log('(2) start')
    await lock.lockAndExecuteAsync(async () => {
        console.log('(2) function with lock begin...')
        await Async.waitMsAsync(1500) // just wait
        console.log('(2) function with lock end')
    })
    console.log('(2) finish')
}

async function startAsync(){
    const lock = new Lock()

    void functionWithLock1Async(lock) // no await
    void functionWithLock2Async(lock) // no await

    await Async.waitMsAsync(3000)

})
```




