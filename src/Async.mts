export module Async {
    /**
     * Wait for some milliseconds by setTimeout wrapped in Promise
     * @param millisecondsToWait 
     */
    export async function waitMsAsync(millisecondsToWait: number) {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, millisecondsToWait)
        })
    }

    /**
     * Wait for function to return true or throw error
     * @param func - this function must return true
     * @param msStep - execute function every msStep milliseconds and check for result
     * @param maxMsToWait - maximum milliseconds to wait, 0 for wait forever
     */
    export async function waitForFunctionToReturnTrueAsync(functionToReturnTrue: () => boolean, msStep: number = 50, maxMsToWait: number = 0) {
        if (msStep <= 0) throw new Error(`msStep=${msStep}<=0`)
        if (maxMsToWait < 0) throw new Error(`maxMsToWait=${maxMsToWait}`)
        let maxSteps: number = 0
        if (maxMsToWait) {
            maxSteps = maxMsToWait / msStep
            if(maxSteps<1){
                maxSteps = 1
            }
        }
        let currentStep = 0
        while (true) {
            if (functionToReturnTrue()) {
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