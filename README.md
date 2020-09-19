# Async

Perform few async operations

## Install

`npm install @lexriver/async`

## Import

```typescript
import {Async} from '@lexriver/async'
```

## Methods


### Async.waitMsAsync(millisecondsToWait: number)

Wait for some milliseconds by setTimeout wrapped in Promise

```typescript
await Async.waitMsAsync(500) // wait 500 milliseconds
```

<br/>
<br/>

### Async.waitForFunctionToReturnTrueAsync(functionToReturnTrue: () => boolean, options:{msStep: number, maxMsToWait?: number})

Wait for function to return true or throw error

__Parameters__
* `functionToReturnTrue: () => boolean` - function that will be executed on each step
* `options`: Object with following properties
    * `msStep?: number` - pause between each steps in milliseconds, default value is 100
    * `maxMsToWait?: number` - maximum milliseconds to wait for all steps, default values is 30*1000 

```typescript
// 
await Async.waitForFunctionToReturnTrueAsync(() => checkResult() === 42, {msStep: 100, maxMsToWait: 1000})
```




