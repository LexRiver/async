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

        const deadline = maxMsToWait > 0 ? Date.now() + maxMsToWait : undefined
        const throwTimeout = () => {
            throw new Error(`waitForFunctionToReturnTrue failed after timeout ${maxMsToWait}ms`)
        }

        while (true) {
            if (deadline !== undefined && Date.now() >= deadline) {
                throwTimeout()
            }

            if (functionToReturnTrue()) {
                if (deadline !== undefined && Date.now() >= deadline) {
                    throwTimeout()
                }
                return
            }

            const millisecondsToWait = deadline === undefined
                ? msStep
                : Math.min(msStep, deadline - Date.now())

            if (millisecondsToWait <= 0) {
                throwTimeout()
            }
            await waitMsAsync(millisecondsToWait)
        }
    }
}