export module Async {
    /**
     * Wait for some milliseconds by setTimeout wrapped in Promise
     * @param millisecondsToWait 
     */
    export async function waitMsAsync(millisecondsToWait: number) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, millisecondsToWait)
        })
    }

    /**
     * Wait for function to return true or throw error
     * @param func - this function must return true
     * @param msStep - execute function every msStep milliseconds and check for result
     * @param maxMsToWait - maximum milliseconds to wait
     */
    export async function waitForFunctionToReturnTrueAsync(functionToReturnTrue: () => boolean, p?:{msStep?: number, maxMsToWait?: number}) {
        p = p ?? {}
        p.msStep = p.msStep ?? 100
        p.maxMsToWait = p.maxMsToWait ?? 30*1000
        if (p.msStep <= 0) throw new Error(`msStep=${p.msStep}<=0`)
        if (p.maxMsToWait && p.maxMsToWait <= 0) throw new Error(`maxMsToWait=${p.maxMsToWait}`)
        let maxSteps: number = 1
        if (p.maxMsToWait && p.maxMsToWait > p.msStep) maxSteps = p.maxMsToWait / p.msStep
        let currentStep = 0
        while (true) {
            if (functionToReturnTrue()) {
                return
            }
            if (currentStep > maxSteps) {
                throw new Error(`waitForFunctionToReturnTrue failed after timeout ${p.maxMsToWait}ms`)
            }
            await waitMsAsync(p.msStep)
            currentStep++
        }
    }
}