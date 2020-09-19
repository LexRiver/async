export module Async {
    /**
     * wait for some milliseconds by setTimeout wrapped in Promise
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
     * wait for function to return true or throw error
     * @param func - this function must return true
     * @param msStep - execute function every msStep milliseconds and check for result
     * @param maxMsToWait - maximum milliseconds to wait
     */
    export async function waitForFunctionToReturnTrueAsync(func: () => boolean, msStep: number, maxMsToWait?: number) {
        if (msStep <= 0) throw new Error(`msStep=${msStep}<=0`)
        if (maxMsToWait && maxMsToWait <= 0) throw new Error(`maxMsToWait=${maxMsToWait}`)
        let maxSteps: number = 0
        if (maxMsToWait && maxMsToWait > msStep) maxSteps = maxMsToWait / msStep
        let currentStep = 0
        while (true) {
            if (func()) {
                return
            }
            if (maxSteps > 0 && currentStep > maxSteps) {
                throw new Error(`waitForFunctionToReturnTrue failed after timeout ${maxMsToWait}ms`)
            }
            await waitMsAsync(msStep)
            currentStep++

        }
    }
}