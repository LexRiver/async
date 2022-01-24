export declare module Async {
    /**
     * Wait for some milliseconds by setTimeout wrapped in Promise
     * @param millisecondsToWait
     */
    function waitMsAsync(millisecondsToWait: number): Promise<void>;
    /**
     * Wait for function to return true or throw error
     * @param func - this function must return true
     * @param msStep - execute function every msStep milliseconds and check for result
     * @param maxMsToWait - maximum milliseconds to wait, 0 for wait forever
     */
    function waitForFunctionToReturnTrueAsync(functionToReturnTrue: () => boolean, msStep?: number, maxMsToWait?: number): Promise<void>;
}
