export declare module Async {
    /**
     * wait for some milliseconds by setTimeout wrapped in Promise
     * @param millisecondsToWait
     */
    function waitMsAsync(millisecondsToWait: number): Promise<unknown>;
    /**
     * wait for function to return true or throw error
     * @param func - this function must return true
     * @param msStep - execute function every msStep milliseconds and check for result
     * @param maxMsToWait - maximum milliseconds to wait
     */
    function waitForFunctionToReturnTrueAsync(func: () => boolean, msStep: number, maxMsToWait?: number): Promise<void>;
}
